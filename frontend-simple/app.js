// Configuration
const BACKEND = "http://localhost:8000";
let timeSeriesData = [];
let chart = null;

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Generate QR code
    generateQRCode();
    
    // Initialize chart
    initializeChart();
    
    // Start polling for data
    fetchSnapshot();
    setInterval(fetchSnapshot, 6000); // Poll every 6 seconds
    
    // Set up WebSocket connection
    setupWebSocket();
});

// Fetch snapshot data from backend
async function fetchSnapshot() {
    try {
        const response = await fetch(`${BACKEND}/snapshot`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        updateDashboard(data);
    } catch (err) {
        console.error('Failed to fetch snapshot:', err);
        // Show fallback data for demo
        updateDashboard({
            endpoint: "/checkout",
            arr_risk: 0,
            error_count: 0,
            conversion_rate: 0.85,
            status: "healthy",
            summary: "All systems operational. Conversion rate at 85%.",
            timestamp: new Date().toISOString()
        });
    }
}

// Update dashboard with new data
function updateDashboard(data) {
    // Update metrics
    document.getElementById('arr-risk-value').textContent = `$${data.arr_risk.toLocaleString()}`;
    document.getElementById('error-count-value').textContent = data.error_count;
    document.getElementById('conversion-value').textContent = `${(data.conversion_rate * 100).toFixed(1)}%`;
    document.getElementById('summary-text').textContent = data.summary;
    document.getElementById('last-updated').textContent = new Date(data.timestamp).toLocaleString();
    
    // Update status colors
    updateStatusColors(data.status);
    
    // Show/hide rollback button
    const rollbackSection = document.getElementById('rollback-section');
    if (data.status !== 'healthy') {
        rollbackSection.classList.remove('hidden');
    } else {
        rollbackSection.classList.add('hidden');
    }
    
    // Add to time series data
    addToTimeSeries(data);
}

// Update status colors based on current status
function updateStatusColors(status) {
    const cards = ['arr-risk-card', 'error-card', 'conversion-card', 'summary-card'];
    const colorClasses = {
        'healthy': 'text-green-600',
        'warning': 'text-yellow-600', 
        'critical': 'text-red-600'
    };
    
    cards.forEach(cardId => {
        const card = document.getElementById(cardId);
        const valueElement = card.querySelector('.metric-value');
        const iconElement = card.querySelector('svg');
        
        // Remove all status classes
        card.className = card.className.replace(/status-\w+/g, '');
        card.classList.add('status-card', `status-${status}`);
        
        // Update text color
        valueElement.className = `metric-value ${colorClasses[status]}`;
        iconElement.className = `w-8 h-8 ${colorClasses[status]}`;
    });
}

// Add data point to time series
function addToTimeSeries(data) {
    timeSeriesData.push({
        time: new Date(data.timestamp).toLocaleTimeString(),
        conversion: data.conversion_rate * 100,
        errors: data.error_count,
        risk: data.arr_risk
    });
    
    // Keep only last 20 data points
    if (timeSeriesData.length > 20) {
        timeSeriesData = timeSeriesData.slice(-20);
    }
    
    updateChart();
}

// Initialize Chart.js
function initializeChart() {
    const ctx = document.getElementById('metricsChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Conversion %',
                    data: [],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Errors',
                    data: [],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// Update chart with new data
function updateChart() {
    if (!chart) return;
    
    chart.data.labels = timeSeriesData.map(d => d.time);
    chart.data.datasets[0].data = timeSeriesData.map(d => d.conversion);
    chart.data.datasets[1].data = timeSeriesData.map(d => d.errors);
    chart.update();
}

// Inject error for demo purposes
async function injectError(errorType) {
    try {
        await fetch(`${BACKEND}/inject-error`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error_type: errorType })
        });
        fetchSnapshot();
    } catch (err) {
        console.error('Failed to inject error:', err);
        // For demo purposes, simulate the error locally
        simulateError(errorType);
    }
}

// Simulate error locally for demo
function simulateError(errorType) {
    const mockData = {
        'healthy': {
            arr_risk: 0,
            error_count: 0,
            conversion_rate: 0.85,
            status: 'healthy',
            summary: 'All systems operational. Conversion rate at 85%.'
        },
        'warning': {
            arr_risk: 2100,
            error_count: 15,
            conversion_rate: 0.72,
            status: 'warning',
            summary: 'Increased error rate detected. Conversion dropped to 72%. $2,100 at risk.'
        },
        'critical': {
            arr_risk: 8400,
            error_count: 47,
            conversion_rate: 0.31,
            status: 'critical',
            summary: 'Critical error spike! Conversion rate plummeted to 31%. $8,400 at immediate risk.'
        }
    };
    
    const data = mockData[errorType];
    updateDashboard({
        ...data,
        endpoint: "/checkout",
        timestamp: new Date().toISOString()
    });
}

// Trigger rollback
async function triggerRollback() {
    try {
        await fetch(`${BACKEND}/rollback`, { method: 'POST' });
        fetchSnapshot();
    } catch (err) {
        console.error('Failed to trigger rollback:', err);
        // For demo purposes, simulate rollback locally
        simulateRollback();
    }
}

// Simulate rollback locally for demo
function simulateRollback() {
    updateDashboard({
        endpoint: "/checkout",
        arr_risk: 0,
        error_count: 0,
        conversion_rate: 0.85,
        status: "healthy",
        summary: "Rollback successful! All systems operational. Conversion rate at 85%.",
        timestamp: new Date().toISOString()
    });
}

// Set up WebSocket connection
function setupWebSocket() {
    try {
        const ws = new WebSocket(`${BACKEND.replace('http', 'ws')}/ws`);
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            updateDashboard(data);
        };
        ws.onerror = (e) => {
            console.log('WebSocket not available, using polling instead');
        };
    } catch (err) {
        console.log('WebSocket not available, using polling instead');
    }
}

// Generate QR code for mobile access
function generateQRCode() {
    const currentUrl = window.location.href;
    document.getElementById('current-url').textContent = currentUrl;
    
    QRCode.toCanvas(document.getElementById('qrcode'), currentUrl, {
        width: 120,
        margin: 2
    }, function (error) {
        if (error) console.error('QR code generation failed:', error);
    });
} 
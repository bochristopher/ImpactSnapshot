import React, { useState, useEffect, useRef } from 'react'
import SnapshotCard from '../components/SnapshotCard.jsx'
import QrPanel from '../components/QrPanel.jsx'
import ArcadeEmbed from '../components/ArcadeEmbed.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { SNAPSHOT_URL, BACKEND, DEMO_URL, ARCADE_URL } from '../config.js'
import { validateSnapshot } from '../lib/validate.js'
import { makeWsUrl } from '../lib/ws.js'
import { notifyLive, notifyRetry, notifyOffline } from '../lib/notify.js'
import toast from 'react-hot-toast'

function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [demoLoading, setDemoLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('closed') // 'open', 'error', 'closed'
  
  const reconnectToastRef = useRef(null)
  
  const intervalRef = useRef(null)
  const abortControllerRef = useRef(null)
  const wsRef = useRef(null)
  const reconnectTimeoutRef = useRef(null)
  const heartbeatIntervalRef = useRef(null)
  const backoffDelayRef = useRef(1000) // Start with 1s, max 20s

  const fetchSnapshot = async (isRetry = false) => {
    // Clear any existing abort controller
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController()
    const timeoutId = setTimeout(() => {
      abortControllerRef.current.abort()
    }, 5000) // 5 second timeout

    try {
      const response = await fetch(SNAPSHOT_URL, {
        signal: abortControllerRef.current.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const jsonData = await response.json()
      const validatedData = validateSnapshot(jsonData)
      
      setData(validatedData)
      setLoading(false)
      setError(null)
    } catch (err) {
      clearTimeout(timeoutId)
      
      if (err.name === 'AbortError') {
        console.log('Request was aborted due to timeout')
      } else {
        console.error('Failed to fetch snapshot:', err)
        setError(err.message)
        setLoading(false)
      }
    }
  }

  const startPolling = () => {
    // Initial fetch
    fetchSnapshot()

    // Set up polling interval
    intervalRef.current = setInterval(() => {
      const shouldRetry = error !== null
      const delay = shouldRetry ? 10000 : 6000 // 10s for retry, 6s for normal
      
      setTimeout(() => {
        fetchSnapshot(shouldRetry)
      }, delay - 6000) // Adjust for the setTimeout
    }, 6000)
  }

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }

  // WebSocket functions
  const connectWebSocket = () => {
    // Guard against multiple sockets
    if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
      return
    }

    const wsUrl = makeWsUrl(BACKEND) + '/ws'
    console.log('Connecting to WebSocket:', wsUrl)
    
    wsRef.current = new WebSocket(wsUrl)

    wsRef.current.onopen = () => {
      console.log('WebSocket connected')
      setConnectionStatus('open')
      setError(null)
      backoffDelayRef.current = 1000 // Reset backoff on successful connection
      
      // Show success toast and dismiss any reconnecting toast
      notifyLive()
      if (reconnectToastRef.current) {
        toast.dismiss(reconnectToastRef.current)
        reconnectToastRef.current = null
      }
    }

    wsRef.current.onmessage = (event) => {
      try {
        const jsonData = JSON.parse(event.data)
        const validatedData = validateSnapshot(jsonData)
        setData(validatedData)
        setLoading(false)
        setError(null)
      } catch (err) {
        console.error('Invalid WebSocket message:', err)
        // Ignore invalid frames
      }
    }

    wsRef.current.onerror = () => {
      console.error('WebSocket error')
      setConnectionStatus('error')
      notifyOffline()
    }

    wsRef.current.onclose = () => {
      console.log('WebSocket closed')
      setConnectionStatus('closed')
      
      // Show reconnecting toast
      if (!reconnectToastRef.current) {
        reconnectToastRef.current = notifyRetry()
      }
      
      // Schedule reconnect with exponential backoff
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      
      reconnectTimeoutRef.current = setTimeout(() => {
        connectWebSocket()
      }, backoffDelayRef.current)
      
      // Increase backoff delay (max 20s)
      backoffDelayRef.current = Math.min(backoffDelayRef.current * 2, 20000)
    }
  }

  const startHeartbeat = () => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
    }
    
    heartbeatIntervalRef.current = setInterval(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send('ping')
      }
    }, 25000) // 25 second heartbeat
  }

  const stopHeartbeat = () => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
      heartbeatIntervalRef.current = null
    }
  }

  const disconnectWebSocket = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    
    stopHeartbeat()
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close()
    }
    wsRef.current = null
  }

  useEffect(() => {
    startPolling()
    connectWebSocket()
    startHeartbeat()

    return () => {
      stopPolling()
      disconnectWebSocket()
    }
  }, []) // Only run on mount/unmount

  const dismissError = () => {
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Environment Banner */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-neutral-800 rounded-full">
            <span className="text-xs font-medium text-gray-600 dark:text-neutral-400">
              BACKEND: {BACKEND}
            </span>
            {import.meta.env.VITE_VERCEL_ENV && (
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded">
                {import.meta.env.VITE_VERCEL_ENV.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Header */}
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-neutral-100 mb-2">
            Impact Snapshot
          </h1>
          <p className="text-lg text-gray-600 dark:text-neutral-400">
            Detect spike → count dollars → roll back.
          </p>
          
          {/* Header Controls */}
          <div className="absolute top-0 right-0 flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Connection Status Pill */}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              connectionStatus === 'open' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                : connectionStatus === 'error' || connectionStatus === 'closed'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
            }`}>
              {connectionStatus === 'open' && 'Live'}
              {connectionStatus === 'error' && 'Offline'}
              {connectionStatus === 'closed' && 'Reconnecting…'}
            </span>
          </div>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800 dark:text-red-200">
                  Connection error: {error}
                </span>
              </div>
              <button
                onClick={dismissError}
                className="text-red-400 hover:text-red-600 dark:text-red-300 dark:hover:text-red-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Loading Toggle Demo */}
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={() => setDemoLoading(!demoLoading)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            {demoLoading ? 'Show Data' : 'Show Loading'}
          </button>
        </div>

        {/* Snapshot Card */}
        <SnapshotCard 
          {...data}
          loading={loading || demoLoading}
        />
        
        {/* QR Code Panel */}
        <div className="mt-8">
          <QrPanel 
            value={DEMO_URL}
            title="Scan to open live demo"
          />
        </div>
        
        {/* Arcade Walkthrough */}
        {ARCADE_URL && (
          <div className="mt-8">
            <ArcadeEmbed 
              src={`${ARCADE_URL}${ARCADE_URL.includes('?') ? '&' : '?'}embed`}
              title="Arcade Walkthrough"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home 
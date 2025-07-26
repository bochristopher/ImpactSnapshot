import React, { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

function QrPanel({ value, title = "Scan to open live demo" }) {
  const qrRef = useRef(null)

  const downloadPNG = () => {
    if (!qrRef.current) return

    // Create a canvas element
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // Set canvas size (higher resolution for crisp PNG)
    const size = 512
    canvas.width = size
    canvas.height = size
    
    // Get the SVG element
    const svg = qrRef.current.querySelector('svg')
    if (!svg) return
    
    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    
    // Create an image from the SVG
    const img = new Image()
    img.onload = () => {
      // Draw the image on canvas
      ctx.drawImage(img, 0, 0, size, size)
      
      // Convert to PNG and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'impact-snapshot-qr.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 'image/png')
    }
    img.src = url
  }

  return (
    <section className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 p-6 max-w-sm mx-auto">
      <header className="text-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
          {title}
        </h2>
      </header>
      
      <main className="flex flex-col items-center space-y-4">
        {/* QR Code */}
        <div 
          ref={qrRef}
          className="flex justify-center"
          role="img"
          aria-label={`QR code for ${value}`}
        >
          <QRCodeSVG
            value={value}
            size={window.innerWidth < 640 ? 128 : 192}
            level="M"
            bgColor="#ffffff"
            fgColor="#000000"
            includeMargin={true}
          />
        </div>
        
        {/* URL Text */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-neutral-400 break-all">
            {value}
          </p>
        </div>
        
        {/* Download Button */}
        <button
          type="button"
          onClick={downloadPNG}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Download PNG
        </button>
      </main>
    </section>
  )
}

export default QrPanel 
import React from 'react'

function ArcadeEmbed({ src, title = "Arcade Walkthrough" }) {
  return (
    <section className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 p-6 max-w-4xl mx-auto">
      <header className="text-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
          {title}
        </h2>
      </header>
      
      <main className="space-y-4">
        {/* Responsive iframe container */}
        <div className="relative w-full" style={{ paddingBottom: '62.5%' }}> {/* 16:10 aspect ratio */}
          <iframe
            src={src}
            title={title}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            allow="fullscreen"
            loading="lazy"
            frameBorder="0"
          />
        </div>
        
        {/* Fallback link for accessibility */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2">
            Can't see the walkthrough?
          </p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            Open Walkthrough
          </a>
        </div>
      </main>
    </section>
  )
}

export default ArcadeEmbed 
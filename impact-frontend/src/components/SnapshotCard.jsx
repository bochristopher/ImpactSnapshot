import React from 'react'
import { formatUSD } from '../lib/format.js'
import { notifyRollbackStart, notifyRollbackResult } from '../lib/notify.js'

function SnapshotCard({ 
  endpoint = "/checkout", 
  arr_risk = 0, 
  lost_signups = 0, 
  rollback_url = null,
  loading = false 
}) {
  if (loading) {
    return (
      <section className="w-full max-w-md mx-auto">
        <div className="rounded-2xl shadow-xl border bg-white dark:bg-neutral-900 dark:text-neutral-100 p-6">
          {/* Loading skeleton */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            <div className="h-11 bg-gray-200 dark:bg-neutral-700 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full max-w-md mx-auto" role="region" aria-label="System Status">
      <div className="rounded-2xl shadow-xl border bg-white dark:bg-neutral-900 dark:text-neutral-100 p-6">
        <header className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
            System Status
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Endpoint: {endpoint}
          </p>
        </header>

        <main className="space-y-4">
          {/* ARR Risk */}
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {formatUSD(arr_risk)}
            </p>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              ARR at Risk
            </p>
          </div>

          {/* Lost Signups */}
          <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-neutral-700">
            <span className="text-gray-600 dark:text-neutral-400">Lost Signups:</span>
            <span className="font-semibold text-gray-900 dark:text-neutral-100">
              {lost_signups}
            </span>
          </div>

          {/* Additional metrics */}
          <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-neutral-700">
            <span className="text-gray-600 dark:text-neutral-400">Error Count:</span>
            <span className="font-semibold text-gray-900 dark:text-neutral-100">0</span>
          </div>

          <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-neutral-700">
            <span className="text-gray-600 dark:text-neutral-400">Conversion Rate:</span>
            <span className="font-semibold text-gray-900 dark:text-neutral-100">85.0%</span>
          </div>
        </main>

        {/* Rollback Button */}
        {rollback_url && (
          <button 
            type="button"
            className="w-full h-11 rounded-xl font-medium bg-red-600 hover:bg-red-700 text-white transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 mt-6"
            onClick={async () => {
              // Show loading toast
              const toastId = notifyRollbackStart()
              
              try {
                // Make rollback request
                const response = await fetch(rollback_url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                
                // Show result toast
                notifyRollbackResult(response.ok, toastId)
                
                // Open in new tab if successful
                if (response.ok) {
                  window.open(rollback_url, '_blank')
                }
              } catch (error) {
                // Show error toast
                notifyRollbackResult(false, toastId)
              }
            }}
            aria-label="Roll back to previous release"
          >
            Roll Back Release
          </button>
        )}
      </div>
    </section>
  )
}

export default SnapshotCard 
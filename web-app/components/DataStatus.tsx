"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Database, Wifi } from "lucide-react";

interface DataStatusProps {
  usingFallback?: boolean;
  error?: string | null;
}

export default function DataStatus({ usingFallback = false, error = null }: DataStatusProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if there's an issue
    if (usingFallback || error) {
      setIsVisible(true);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [usingFallback, error]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm">
      <div className="bg-yellow-500/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg border border-yellow-600/30">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 mt-0.5">
            {usingFallback ? (
              <Database size={16} />
            ) : error ? (
              <AlertTriangle size={16} />
            ) : (
              <Wifi size={16} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs font-semibold leading-tight">
              {usingFallback ? "Sample Data Active" : error ? "Connection Issue" : "Connected"}
            </p>
            <p className="text-xs opacity-90 mt-1 leading-tight">
              {usingFallback 
                ? "Showing sample content while database is unavailable"
                : error 
                ? error 
                : "Live data connection active"
              }
            </p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs underline mt-1 hover:no-underline"
            >
              {showDetails ? "Hide" : "Show"} Details
            </button>
            {showDetails && (
              <div className="mt-2 text-xs opacity-80 space-y-1">
                <p>• News and characters from sample data</p>
                <p>• Full functionality available</p>
                <p>• Will auto-reconnect when possible</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 text-white/70 hover:text-white p-1 rounded"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

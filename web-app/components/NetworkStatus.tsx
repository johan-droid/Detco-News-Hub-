"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Wifi, WifiOff, RefreshCw } from "lucide-react";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowRetry(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRetry(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
      <WifiOff size={20} />
      <div className="flex-1">
        <p className="font-mono text-sm font-semibold">Network Connection Lost</p>
        <p className="text-xs opacity-90">Showing sample data - some features may be limited</p>
      </div>
      <button
        onClick={handleRetry}
        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
        title="Retry connection"
      >
        <RefreshCw size={16} />
      </button>
    </div>
  );
}

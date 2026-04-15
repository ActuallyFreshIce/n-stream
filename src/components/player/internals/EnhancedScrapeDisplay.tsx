import { ScrapeMedia } from "@p-stream/providers";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { StatusCircle } from "@/components/player/internals/StatusCircle";

export interface DetailedScrapeEvent {
  timestamp: number;
  type: "info" | "error" | "warning" | "success";
  sourceId?: string;
  embedId?: string;
  message: string;
  details?: any;
}

export interface EnhancedScrapeChild {
  id: string;
  embedId: string;
  url?: string;
  status: "waiting" | "pending" | "success" | "failure" | "notfound";
  error?: string;
  percentage: number;
  scrapeTime?: number;
  urlPreview?: string;
}

export interface EnhancedScrapeItem {
  id: string;
  name: string;
  type: "source" | "embed";
  status:
    | "waiting"
    | "pending"
    | "success"
    | "failure"
    | "notfound"
    | "skipped";
  error?: string;
  reason?: string;
  percentage: number;
  duration?: number;
  attempts: number;
  maxAttempts: number;
  discoveryTime?: number;
  scrapeTime?: number;
  children?: EnhancedScrapeChild[];
  lastEvent?: DetailedScrapeEvent;
  embedId?: string;
  url?: string;
  urlPreview?: string;
}

interface EnhancedScrapeDisplayProps {
  sourceOrder: { id: string; children: string[] }[];
  sources: Record<string, EnhancedScrapeItem>;
  currentSource?: string;
  media?: ScrapeMedia;
  backendUrl?: string;
  extensionActive?: boolean;
  showDebug?: boolean;
  onToggleDebug?: () => void;
}

export function EnhancedScrapeDisplay({
  sourceOrder,
  sources,
  currentSource: _currentSource,
  media,
  backendUrl,
  extensionActive,
  showDebug = false,
  onToggleDebug,
}: EnhancedScrapeDisplayProps) {
  const { t: _t } = useTranslation();
  const [logs, setLogs] = useState<DetailedScrapeEvent[]>([]);

  useEffect(() => {
    if (!sources) return;
    const newLogs: DetailedScrapeEvent[] = [];

    // Process current states
    Object.values(sources).forEach((source) => {
      if (source.status !== "waiting") {
        newLogs.push({
          timestamp: Date.now(),
          type:
            source.status === "success"
              ? "success"
              : source.status === "failure"
              ? "error"
              : "info",
          sourceId: source.id,
          message: `${source.name}: ${source.status}`,
          details: source.error,
        });
      }
    });

    setLogs((prev) => [...prev, ...newLogs].slice(-50));
  }, [sources]);

  const statusToCircle = (status: string) => {
    switch (status) {
      case "success":
        return "success";
      case "failure":
        return "error";
      case "notfound":
        return "noresult";
      case "pending":
        return "loading";
      default:
        return "waiting";
    }
  };

  const statusTextMap: Record<string, string> = {
    waiting: "Waiting to start...",
    pending: "Searching...",
    success: "✓ Found stream!",
    notfound: "✗ No streams found",
    failure: "✗ Error occurred",
    skipped: "⏭ Skipped",
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-500/20 text-red-400 border-red-400/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
      case "success":
        return "bg-green-500/20 text-green-400 border-green-400/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-400/30";
    }
  };

  // Calculate stats
  const totalSources = sourceOrder.length;
  const completedSources = Object.values(sources).filter(
    (s) =>
      s.status === "success" || s.status === "failure" || s.status === "notfound",
  ).length;
  const successfulSources = Object.values(sources).filter(
    (s) => s.status === "success",
  ).length;
  const failedSources = Object.values(sources).filter(
    (s) => s.status === "failure" || s.status === "notfound",
  ).length;

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-video-background">
      <div className="max-w-5xl w-full mx-auto">
        {/* Header with stats */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">
              Finding Video Sources
            </h2>
            <button
              type="button"
              onClick={onToggleDebug}
              className="px-3 py-1 text-sm bg-video-scraping-card bg-opacity-50 rounded-md text-type-secondary hover:text-white transition-colors"
            >
              {showDebug ? "Hide Log" : "Show Log"}
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-video-scraping-card bg-opacity-50 rounded-full h-2 mb-4">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.round(
                  (completedSources / Math.max(totalSources, 1)) * 100,
                )}%`,
              }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-video-scraping-card bg-opacity-30 rounded-lg">
              <div className="text-green-400 text-xl font-bold">
                {successfulSources}
              </div>
              <div className="text-type-secondary">Successful</div>
            </div>
            <div className="text-center p-3 bg-video-scraping-card bg-opacity-30 rounded-lg">
              <div className="text-red-400 text-xl font-bold">
                {failedSources}
              </div>
              <div className="text-type-secondary">Failed</div>
            </div>
            <div className="text-center p-3 bg-video-scraping-card bg-opacity-30 rounded-lg">
              <div className="text-blue-400 text-xl font-bold">
                {totalSources}
              </div>
              <div className="text-type-secondary">Total</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sources List */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-3">
              Scraping Sources
            </h3>
            {sourceOrder.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <StatusCircle type="loading" percentage={0} />
                  <p className="text-type-secondary mt-2">
                    Initializing scrapers...
                  </p>
                </div>
              </div>
            ) : (
              sourceOrder.map((order) => {
                const source = sources[order.id];
                if (!source) return null;

                return (
                  <div
                    key={source.id}
                    className="bg-video-scraping-card bg-opacity-50 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <StatusCircle
                        type={statusToCircle(source.status)}
                        percentage={source.percentage}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">
                          {source.name}
                        </h4>
                        <p className="text-type-secondary text-sm">
                          {statusTextMap[source.status] ||
                            statusTextMap.pending}
                        </p>
                        {source.duration && (
                          <p className="text-type-secondary text-xs mt-1">
                            Duration: {(source.duration / 1000).toFixed(1)}s
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Error details */}
                    {source.error && (
                      <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-md">
                        <p className="text-red-400 text-sm font-mono">
                          {source.error}
                        </p>
                      </div>
                    )}

                    {/* Reason details */}
                    {source.reason && (
                      <div className="mt-2 text-yellow-400 text-sm">
                        <strong>Reason:</strong> {source.reason}
                      </div>
                    )}

                    {/* Embed children */}
                    {order.children.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-type-secondary text-xs uppercase tracking-wide">
                          Embeds ({order.children.length})
                        </p>
                        <div className="space-y-2">
                          {order.children.map((embedId) => {
                            const embed = sources[embedId];
                            if (!embed) return null;

                            return (
                              <div
                                key={embedId}
                                className="ml-8 bg-black/30 rounded p-2"
                              >
                                <div className="flex items-center gap-2">
                                  <StatusCircle
                                    type={statusToCircle(embed.status)}
                                    percentage={embed.percentage}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm truncate">
                                      {embed.name || embed.embedId}
                                    </p>
                                    {embed.urlPreview && (
                                      <p className="text-type-secondary text-xs truncate font-mono">
                                        {embed.urlPreview}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {embed.error && (
                                  <p className="mt-1 ml-8 text-red-400 text-xs">
                                    {embed.error}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Debug Panel */}
          {showDebug && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                Debug Information
              </h3>

              {/* Environment Info */}
              <div className="bg-video-scraping-card bg-opacity-30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Environment</h4>
                <div className="space-y-1 text-sm font-mono text-type-secondary">
                  <div>Backend: {backendUrl || "Browser"}</div>
                  <div>
                    Extension: {extensionActive ? "Active" : "Inactive"}
                  </div>
                  <div>Media Type: {media?.type || "Unknown"}</div>
                  <div>TMDB ID: {media?.tmdbId || "N/A"}</div>
                </div>
              </div>

              {/* Raw Debug Data */}
              <div className="bg-black/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Scraper Data</h4>
                <pre className="text-xs text-type-secondary overflow-x-auto">
                  {JSON.stringify(
                    {
                      sourceOrder,
                      sources: Object.fromEntries(
                        Object.entries(sources || {}).map(([k, v]) => [
                          k,
                          {
                            ...v,
                            error: v.error || undefined,
                            reason: v.reason || undefined,
                          },
                        ])
                      ),
                    },
                    null,
                    2
                  )}
                </pre>
              </div>

              {/* Event Log */}
              {logs.length > 0 && (
                <div className="bg-black/50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <h4 className="font-semibold text-white mb-2">
                    Recent Events
                  </h4>
                  <div className="space-y-1 text-xs font-mono">
                    {logs.map((log) => (
                      <div
                        key={log.timestamp}
                        className="py-1 border-b border-gray-800/50"
                      >
                        <span className="text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                        <span
                          className={`ml-2 px-1 rounded ${getEventBadgeColor(
                            log.type
                          )}`}
                        >
                          {log.type}
                        </span>
                        <span className="text-type-secondary ml-2">
                          {log.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

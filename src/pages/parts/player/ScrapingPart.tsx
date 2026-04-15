import { ProviderControls, ScrapeMedia } from "@p-stream/providers";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMountedState } from "react-use";
import type { AsyncReturnType } from "type-fest";

import { isExtensionActiveCached } from "@/backend/extension/messaging";
import {
  scrapePartsToProviderMetric,
  useReportProviders,
} from "@/backend/helpers/report";
import { getLoadbalancedProviderApiUrl } from "@/backend/providers/fetchers";
import { Button } from "@/components/buttons/Button";
import { Loading } from "@/components/layout/Loading";
import {
  EnhancedScrapeDisplay,
  EnhancedScrapeItem,
} from "@/components/player/internals/EnhancedScrapeDisplay";
import {
  ScrapingItems,
  ScrapingSegment,
  useScrape,
} from "@/hooks/useProviderScrape";

import { WarningPart } from "../util/WarningPart";

export interface ScrapingProps {
  media: ScrapeMedia;
  onGetStream?: (stream: AsyncReturnType<ProviderControls["runAll"]>) => void;
  onResult?: (
    sources: Record<string, any>,
    sourceOrder: { id: string; children: string[] }[],
  ) => void;
}

function getShowDebug(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("debugShowDetails") === "true";
}

function persistShowDebug(show: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem("debugShowDetails", String(show));
}

function enhanceScrapeItem(item: any): EnhancedScrapeItem {
  return {
    id: item.id,
    name: item.name,
    type: item.embedId ? ("embed" as const) : ("source" as const),
    status: item.status,
    error: item.error?.message || item.error,
    reason: item.reason,
    percentage: item.percentage || 0,
    duration: item.duration,
    attempts: item.attempts || 1,
    maxAttempts: item.maxAttempts || 1,
    children: item.children,
    embedId: item.embedId,
    url: item.url,
  };
}

export function ScrapingPart(props: ScrapingProps) {
  const { t } = useTranslation();
  const { report } = useReportProviders();
  const { startScraping, sourceOrder, sources, currentSource } = useScrape();
  const isMounted = useMountedState();
  const [showDebug, setShowDebug] = useState(() => getShowDebug());
  const [failedStartScrape, setFailedStartScrape] = useState<boolean>(false);

  useEffect(() => {
    persistShowDebug(showDebug);
  }, [showDebug]);

  // Convert sources to enhanced format
  const enhancedSources = Object.entries(sources || {}).reduce(
    (acc, [key, value]) => {
      acc[key] = enhanceScrapeItem({ ...value, startTime: Date.now() });
      return acc;
    },
    {} as Record<string, EnhancedScrapeItem>,
  );

  useEffect(() => {
    Object.entries(sources || {}).forEach(([key, value]) => {
      enhancedSources[key] = enhanceScrapeItem({
        ...value,
      });
    });
  }, [sources]); // eslint-disable-line react-hooks/exhaustive-deps

  const resultRef = useRef<{
    sourceOrder: { id: string; children: string[] }[];
    sources: Record<string, any>;
  }>({ sourceOrder, sources });

  useEffect(() => {
    resultRef.current = { sourceOrder, sources };
  }, [sourceOrder, sources]);

  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    (async () => {
      const output = await startScraping(props.media);
      if (!isMounted()) return;
      props.onResult?.(
        resultRef.current.sources,
        resultRef.current.sourceOrder,
      );
      report(
        scrapePartsToProviderMetric(
          props.media,
          resultRef.current.sourceOrder,
          resultRef.current.sources,
        ),
      );
      props.onGetStream?.(output);
    })().catch(() => setFailedStartScrape(true));
  }, [startScraping, props, report, isMounted]);

  const handleToggleDebug = () => {
    setShowDebug(!showDebug);
  };

  if (failedStartScrape) {
    return <WarningPart>{t("player.turnstile.error")}</WarningPart>;
  }

  return (
    <div className="h-full w-full relative dir-neutral:origin-top-left flex">
      {!sourceOrder || sourceOrder.length === 0 ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col justify-center z-0">
          <Loading className="mb-8" />
          <p>Initializing scrapers...</p>
        </div>
      ) : (
        <EnhancedScrapeDisplay
          sourceOrder={sourceOrder}
          sources={enhancedSources}
          currentSource={currentSource}
          media={props.media}
          backendUrl={getLoadbalancedProviderApiUrl()}
          extensionActive={isExtensionActiveCached()}
          showDebug={showDebug}
          onToggleDebug={handleToggleDebug}
        />
      )}
    </div>
  );
}

export function ScrapingPartInterruptButton() {
  const { t } = useTranslation();

  return (
    <div className="flex gap-3 pb-3">
      <Button
        href="/"
        theme="secondary"
        padding="md:px-17 p-3"
        className="mt-6"
      >
        {t("notFound.goHome")}
      </Button>
      <Button
        onClick={() => window.location.reload()}
        theme="purple"
        padding="md:px-17 p-3"
        className="mt-6"
      >
        {t("notFound.reloadButton")}
      </Button>
    </div>
  );
}

export function Tips() {
  const { t } = useTranslation();
  const [tip] = useState(() => {
    const randomIndex = Math.floor(Math.random() * 11) + 1;
    return t(`player.scraping.tips.${randomIndex}`);
  });

  return (
    <div className="flex flex-col gap-3">
      <p className="text-type-secondary text-center text-sm text-bold">
        Tip: {tip}
      </p>
    </div>
  );
}

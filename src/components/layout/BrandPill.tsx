import classNames from "classnames";

import { useIsMobile } from "@/hooks/useIsMobile";

export function BrandPill(props: {
  clickable?: boolean;
  header?: boolean;
  backgroundClass?: string;
}) {
  const isMobile = useIsMobile();

  return (
    <div
      className={classNames(
        "flex items-center space-x-2 rounded-full px-4 py-2 backdrop-blur-lg",
        props.backgroundClass ?? "bg-pill-background bg-opacity-50",
        props.clickable
          ? "transition-[transform,background-color] hover:scale-105 hover:bg-pill-backgroundHover active:scale-95"
          : "",
      )}
    >
      <img
        src="/nautics.png"
        alt="Nautics"
        className={classNames(
          "h-8 object-contain select-none",
          isMobile && props.header ? "hidden sm:block" : "",
        )}
      />
    </div>
  );
}

import { useEditor } from "@craftjs/core";
import React, { useEffect } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Toolbox } from "./Toolbox";
import { cn } from "@/lib/utils";

export const Viewport: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { enabled, connectors, actions } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.requestAnimationFrame(() => {
      window.parent.postMessage({ LANDING_PAGE_LOADED: true }, "*");

      setTimeout(() => {
        actions.setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [actions]);

  return (
    <div className="w-full h-full fixed flex overflow-hidden">
      <Toolbox />
      <div className="page-container flex flex-1 h-full flex-col">
        <Header />
        <div
          className={cn(
            "craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto",
            {
              "bg-renderer-gray": enabled,
            },
          )}
          ref={(ref) => {
            if (ref) {
              connectors.select(connectors.hover(ref, ""), "");
            }
          }}
        >
          <div className="relative flex-col flex items-center pt-8">
            {children}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

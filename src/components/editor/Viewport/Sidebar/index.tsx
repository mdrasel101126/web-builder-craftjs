import { useEditor } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import CustomizeIcon from "../../../../../public/icons/customize.svg";
import LayerIcon from "../../../../../public/icons/layers.svg";
import { Toolbar } from "../../Toolbar";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      className={cn(
        "w-72 bg-white transition-all h-full flex flex-col",
        enabled ? "opacity-100" : "opacity-0 -mr-72",
      )}
    >
      <SidebarItem
        icon={CustomizeIcon}
        title="Customize"
        height={!layersVisible ? "full" : "55%"}
        visible={toolbarVisible}
        onChange={setToolbarVisible}
      >
        <Toolbar />
      </SidebarItem>
      <SidebarItem
        icon={LayerIcon}
        title="Layers"
        height={!toolbarVisible ? "full" : "45%"}
        visible={layersVisible}
        onChange={setLayerVisible}
      >
        <Layers expandRootOnLoad={true} />
      </SidebarItem>
      {/* <CarbonAds /> */}
    </div>
  );
};

const CarbonAds = () => {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dom = domRef.current;
    if (!dom) return;

    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("async", "true");
    script.setAttribute(
      "src",
      "//cdn.carbonads.com/carbon.js?serve=CEAI453N&placement=craftjsorg",
    );
    script.setAttribute("id", "_carbonads_js");
    dom.appendChild(script);

    return () => {
      const ad = dom.querySelector("#carbonads");
      if (ad) dom.removeChild(ad);
      dom.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className="w-full mt-auto border-t border-gray-200 p-2"
    >
      {/* Carbon Ads will be injected here */}
    </div>
  );
};

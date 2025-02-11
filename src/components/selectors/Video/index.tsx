import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import YouTube from "react-youtube";

import { VideoSettings } from "./VideoSettings";

export const Video = (props: any) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { videoId } = props;

  return (
    <div
      ref={(node) => {
        if (node) {
          connect(node);
        }
      }}
      className={`w-full h-full ${
        enabled ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <YouTube
        videoId={videoId}
        opts={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

Video.craft = {
  displayName: "Video",
  props: {
    videoId: "IwzUs1IMdyQ",
  },
  related: {
    toolbar: VideoSettings,
  },
};

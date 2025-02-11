import { Element, useEditor } from "@craftjs/core";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider, // ✅ Import TooltipProvider
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import ButtonSvg from "../../../../public/icons/button.svg";
import SquareSvg from "../../../../public/icons/toolbox/rectangle.svg";
import TypeSvg from "../../../../public/icons/toolbox/text.svg";
import YoutubeSvg from "../../../../public/icons/toolbox/video-line.svg";
import { Container } from "../../selectors/Container";
import { Text } from "../../selectors/Text";
import { Video } from "../../selectors/Video";
import { Button } from "@/components/selectors/Button";

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <TooltipProvider>
      <div
        className={cn(
          "transition-all duration-300 h-full flex flex-col bg-white w-12",
          !enabled && "opacity-0 w-0",
        )}
      >
        <div className="flex flex-1 flex-col items-center pt-3">
          {/* Container */}
          <div
            ref={(ref) => {
              if (ref) {
                create(
                  ref,
                  <Element
                    canvas
                    is={Container}
                    background={{ r: 78, g: 78, b: 78, a: 1 }}
                    color={{ r: 0, g: 0, b: 0, a: 1 }}
                    height="300px"
                    width="300px"
                  />,
                );
              }
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="m-2 pb-2 cursor-move">
                  <SquareSvg className="w-5 h-5 text-gray-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Container</TooltipContent>
            </Tooltip>
          </div>

          {/* Text */}
          <div
            ref={(ref) => {
              if (ref) {
                create(
                  ref,
                  <Text
                    fontSize="12"
                    textAlign="left"
                    text="Hi there"
                  />,
                );
              }
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="m-2 pb-2 cursor-move">
                  <TypeSvg className="w-5 h-5 text-gray-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Text</TooltipContent>
            </Tooltip>
          </div>

          {/* Button */}
          <div
            ref={(ref) => {
              if (ref) {
                create(ref, <Button />);
              }
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="m-2 pb-2 cursor-move">
                  <ButtonSvg className="w-5 h-5 text-gray-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Button</TooltipContent>
            </Tooltip>
          </div>

          {/* Video */}
          <div
            ref={(ref) => {
              if (ref) {
                create(ref, <Video />);
              }
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="m-2 pb-2 cursor-move">
                  <YoutubeSvg className="w-5 h-5 text-gray-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Video</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

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
import Grid from "@/components/selectors/Grid";
import { Grid2X2, Grid2X2Check } from "lucide-react";
import { GridTwo } from "@/components/selectors/Grid2";

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  /*   const addGrid = () => {
    const gridNode = query.createNode({
      type: Grid, 
      props: { columns: 12, gap: 4 },
    });

    actions.add(gridNode, "ROOT");
  };

  const addGridItem = () => {
    const gridNodes = query
      .getNodes()
      .filter((node: any) => node.data.type === Grid);

    if (gridNodes.length === 0) {
      alert("Please add a Grid first!");
      return;
    }

    const gridItemNode = query.createNode({
      type: GridItem,
      props: { span: 4 },
    });

    const targetGridId = gridNodes[0].id;
    actions.add(gridItemNode, targetGridId);
  }; */

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
                    height="100%"
                    width="100%"
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
          {/* Grid */}
          <div
            ref={(ref) => {
              if (ref) {
                create(
                  ref,
                  <Element
                    canvas
                    is={Grid}
                    columns={2}
                    gap="16px"
                    rows={2}
                  />,
                );
              }
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="m-2 pb-2 cursor-move">
                  <Grid2X2 className="w-5 h-5 text-gray-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Grid</TooltipContent>
            </Tooltip>
          </div>
          {/* Grid Two */}
          {/*    <button
            onClick={addGrid}
            className="mr-2"
          >
            Add Grid
          </button>
          <button
            onClick={() => {
            }}
          >
            Add Grid Item
          </button> */}

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

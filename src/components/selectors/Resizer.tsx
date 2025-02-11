import { useNode, useEditor } from "@craftjs/core";
import debounce from "debounce";
import { Resizable } from "re-resizable";
import React, { useRef, useEffect, useState, useCallback } from "react";

import {
  isPercentage,
  pxToPercent,
  percentToPx,
  getElementDimensions,
} from "../../lib/numToMeasurement";
import { cn } from "@/lib/utils";

export const Resizer = ({ propKey, children, ...props }: any) => {
  const {
    id,
    actions: { setProp },
    connectors: { connect },
    fillSpace,
    nodeWidth,
    nodeHeight,
    parent,
    active,
    inNodeContext,
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
    nodeWidth: node.data.props[propKey.width],
    nodeHeight: node.data.props[propKey.height],
    fillSpace: node.data.props.fillSpace,
  }));

  const { isRootNode, parentDirection } = useEditor((state, query) => {
    return {
      parentDirection:
        parent &&
        state.nodes[parent] &&
        state.nodes[parent].data.props.flexDirection,
      isRootNode: query.node(id).isRoot(),
    };
  });

  const resizable = useRef<Resizable | null>(null); // Updated type to handle null
  const isResizing = useRef<boolean>(false);
  const editingDimensions = useRef<any>(null);
  const nodeDimensions = useRef<{ width: number; height: number } | null>(null);
  nodeDimensions.current = { width: nodeWidth, height: nodeHeight };

  const [internalDimensions, setInternalDimensions] = useState({
    width: nodeWidth,
    height: nodeHeight,
  });

  const updateInternalDimensionsInPx = useCallback(() => {
    if (
      nodeDimensions.current &&
      resizable.current &&
      resizable.current.resizable
    ) {
      const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;

      const parentElement = resizable.current.resizable.parentElement;
      if (parentElement) {
        const parentElementWidth =
          getElementDimensions(parentElement)?.width ?? 0;
        const parentElementHeight =
          getElementDimensions(parentElement)?.height ?? 0;

        const width = percentToPx(nodeWidth, parentElementWidth);
        const height = percentToPx(nodeHeight, parentElementHeight);

        setInternalDimensions({
          width,
          height,
        });
      }
    }
  }, []);

  const updateInternalDimensionsWithOriginal = useCallback(() => {
    if (nodeDimensions.current) {
      const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;
      setInternalDimensions({
        width: nodeWidth,
        height: nodeHeight,
      });
    }
  }, []);

  const getUpdatedDimensions = (width: any, height: any) => {
    const dom = resizable.current?.resizable; // Optional chaining to handle null
    if (!dom) return;

    const currentWidth = parseInt(editingDimensions.current.width),
      currentHeight = parseInt(editingDimensions.current.height);

    return {
      width: currentWidth + parseInt(width),
      height: currentHeight + parseInt(height),
    };
  };

  useEffect(() => {
    if (!isResizing.current) updateInternalDimensionsWithOriginal();
  }, [nodeWidth, nodeHeight, updateInternalDimensionsWithOriginal]);

  useEffect(() => {
    const listener = debounce(updateInternalDimensionsWithOriginal, 1);
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [updateInternalDimensionsWithOriginal]);

  return (
    <Resizable
      enable={[
        "top",
        "left",
        "bottom",
        "right",
        "topLeft",
        "topRight",
        "bottomLeft",
        "bottomRight",
      ].reduce((acc: any, key) => {
        acc[key] = active && inNodeContext;
        return acc;
      }, {})}
      className={cn("relative overflow-visible", {
        "m-auto": isRootNode,
        flex: true,
      })}
      ref={(ref) => {
        if (ref) {
          resizable.current = ref; // Ensure ref is set to resizable.current
          if (resizable.current.resizable) {
            connect(resizable.current.resizable);
          } // Only call connect if ref is valid
        }
      }}
      size={internalDimensions}
      onResizeStart={(e) => {
        updateInternalDimensionsInPx();
        e.preventDefault();
        e.stopPropagation();
        const dom = resizable.current?.resizable;
        if (!dom) return;
        editingDimensions.current = {
          width: dom.getBoundingClientRect().width,
          height: dom.getBoundingClientRect().height,
        };
        isResizing.current = true;
      }}
      onResize={(_, __, ___, d) => {
        const dom = resizable.current?.resizable;
        if (!dom) return;

        let { width, height }: any = getUpdatedDimensions(d.width, d.height);
        const parentElement = dom.parentElement;

        // Check if parentElement is null before accessing its properties
        if (parentElement) {
          if (isPercentage(nodeWidth)) {
            width =
              pxToPercent(width, getElementDimensions(parentElement).width) +
              "%";
          } else width = `${width}px`;

          if (isPercentage(nodeHeight))
            height =
              pxToPercent(height, getElementDimensions(parentElement).height) +
              "%";
          else height = `${height}px`;

          // Handle cases where width or height might be set to "auto"
          if (isPercentage(width) && parentElement.style.width === "auto") {
            width = editingDimensions.current.width + d.width + "px";
          }

          if (isPercentage(height) && parentElement.style.height === "auto") {
            height = editingDimensions.current.height + d.height + "px";
          }
        }

        // Update the prop with the new dimensions
        setProp((prop: any) => {
          prop[propKey.width] = width;
          prop[propKey.height] = height;
        }, 500);
      }}
      onResizeStop={() => {
        isResizing.current = false;
        updateInternalDimensionsWithOriginal();
      }}
      {...props}
    >
      {children}
      {active && (
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full pointer-events-none",
          )}
        >
          <span
            className={cn(
              "absolute w-2.5 h-2.5 bg-white rounded-full box-shadow-lg z-50 pointer-events-none border-2 border-blue-500",
              {
                "top-0 left-1/2 -translate-x-1/2 transform":
                  fillSpace === "row",
                "top-1/2 left-0 -translate-y-1/2 transform":
                  fillSpace === "column",
              },
            )}
          ></span>
          <span className="absolute right-0 top-0 w-2.5 h-2.5 bg-white rounded-full box-shadow-lg z-50 pointer-events-none border-2 border-blue-500"></span>
          <span
            className={cn(
              "absolute w-2.5 h-2.5 bg-white rounded-full box-shadow-lg z-50 pointer-events-none border-2 border-blue-500",
              {
                "bottom-0 left-0 z-60": fillSpace === "row", // Increased z-index
                "bottom-1/2 left-0 -translate-y-1/2 z-60":
                  fillSpace === "column", // Increased z-index
              },
            )}
          ></span>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-white rounded-full box-shadow-lg z-50 pointer-events-none border-2 border-blue-500"></span>
        </div>
      )}
    </Resizable>
  );
};

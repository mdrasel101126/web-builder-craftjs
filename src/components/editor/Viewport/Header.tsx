import { useEditor } from "@craftjs/core";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider, // ✅ Import TooltipProvider
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils"; // Ensure you have this utility for class merging
import React from "react";

import Checkmark from "../../../../public/icons/check.svg";
import Customize from "../../../../public/icons/customize.svg";
import RedoSvg from "../../../../public/icons/toolbox/redo.svg";
import UndoSvg from "../../../../public/icons/toolbox/undo.svg";

export const Header = () => {
  const { enabled, canUndo, canRedo, actions } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
    <TooltipProvider>
      <div className="w-full h-12 z-[99999] relative bg-gray-300 flex items-center px-4">
        {enabled && (
          <div className="flex-1 flex gap-2">
            {/* ✅ Correct Tooltip Structure */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    "p-2 rounded-md transition",
                    canUndo
                      ? "hover:bg-gray-200"
                      : "opacity-50 cursor-not-allowed",
                  )}
                  onClick={() => actions.history.undo()}
                  disabled={!canUndo}
                >
                  <UndoSvg className="w-5 h-5 fill-gray-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    "p-2 rounded-md transition",
                    canRedo
                      ? "hover:bg-gray-200"
                      : "opacity-50 cursor-not-allowed",
                  )}
                  onClick={() => actions.history.redo()}
                  disabled={!canRedo}
                >
                  <RedoSvg className="w-5 h-5 fill-gray-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </div>
        )}
        <button
          className={cn(
            "flex items-center px-4 py-2 rounded-md text-white text-sm transition",
            enabled
              ? "bg-green-500 hover:bg-green-600"
              : "bg-primary hover:bg-primary/80",
          )}
          onClick={() => {
            actions.setOptions((options) => (options.enabled = !enabled));
          }}
        >
          {enabled ? (
            <Checkmark className="w-4 h-4 mr-2" />
          ) : (
            <Customize className="w-4 h-4 mr-2" />
          )}
          {enabled ? "Finish Editing" : "Edit"}
        </button>
      </div>
    </TooltipProvider>
  );
};

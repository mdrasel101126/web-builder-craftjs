/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Topbar.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEditor } from "@craftjs/core";

export const Topbar: React.FC = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div className={cn("bg-teal-100 p-3 mt-3 mb-1 rounded-lg shadow-md")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label className="text-sm font-medium mr-2">Enable</label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(enabled: any) =>
              actions.setOptions((options) => (options.enabled = enabled))
            }
            className="rounded-full w-6 h-6 bg-blue-500"
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          color="secondary"
          onClick={() => {
            console.log(query.serialize());
          }}
        >
          Serialize JSON to console
        </Button>
      </div>
    </div>
  );
};

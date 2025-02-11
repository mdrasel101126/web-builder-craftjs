/* eslint-disable @typescript-eslint/no-explicit-any */
// components/user/Container.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  padding?: number;
  background?: string;
}

export const Container: React.FC<ContainerProps> & { craft?: any } = ({
  children,
  className,
  padding = 16,
  background = "#ffffff",
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={cn("rounded-lg shadow p-2 my-1", className)}
      style={{ padding: `${padding}px`, backgroundColor: `${background}` }}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <div className="space-y-4">
      {/* Background Color Picker */}
      <div className="flex flex-col gap-2">
        <Label>Background</Label>
        <Input
          type="color"
          defaultValue={background || "#000000"}
          onChange={(e) =>
            setProp((props: any) => (props.background = e.target.value))
          }
          className="w-16 h-10 p-1 border rounded"
        />
      </div>

      {/* Padding Slider */}
      <div className="flex flex-col gap-2">
        <Label>Padding</Label>
        <Slider
          defaultValue={[padding || 20]}
          min={0}
          max={100}
          step={5}
          onValueChange={(value) =>
            setProp((props: any) => (props.padding = value[0]))
          }
        />
      </div>
    </div>
  );
};

Container.craft = {
  related: {
    settings: ContainerSettings,
  },
};

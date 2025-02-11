/* eslint-disable @typescript-eslint/no-explicit-any */
// components/user/Button.tsx
import React from "react";
import { Button as ShadButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNode } from "@craftjs/core";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

interface ButtonProps {
  size?: "sm" | "default" | "lg" | "icon";
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "link"
    | "ghost";
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export const Button: React.FC<ButtonProps> & { craft: any } = ({
  size = "default",
  variant = "default",
  color = "#000000",
  children,
  className,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <ShadButton
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      size={size}
      variant={variant}
      className={cn("hover:text-white ", className)}
      style={{ color: `${color}` }}
    >
      {children}
    </ShadButton>
  );
};
const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      {/* Size Selection */}
      <div>
        <Label className="text-sm font-medium">Size</Label>
        <RadioGroup
          defaultValue={props.size}
          onValueChange={(value) =>
            setProp((props: any) => (props.size = value))
          }
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="sm"
              id="small"
            />
            <Label htmlFor="small">Small</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="default"
              id="medium"
            />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="lg"
              id="large"
            />
            <Label htmlFor="large">Large</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="icon"
              id="icon"
            />
            <Label htmlFor="icon">Icon</Label>
          </div>
        </RadioGroup>
      </div>
      {/* Variant Selection */}
      <div>
        <Label className="text-sm font-medium">Variant</Label>
        <RadioGroup
          defaultValue={props.variant}
          onValueChange={(value) =>
            setProp((props: any) => (props.variant = value))
          }
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="default"
              id="default"
            />
            <Label htmlFor="text">Default</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="outline"
              id="outlined"
            />
            <Label htmlFor="outlined">Outlined</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="secondary"
              id="secondary"
            />
            <Label htmlFor="secondary">Secondary</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="destructive"
              id="destructive"
            />
            <Label htmlFor="secondary">Destructive</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="link"
              id="link"
            />
            <Label htmlFor="secondary">Link</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="ghost"
              id="ghost"
            />
            <Label htmlFor="secondary">Ghost</Label>
          </div>
        </RadioGroup>
      </div>
      {/* Color Selection */}
      <div>
        <Label className="text-sm font-medium">Color</Label>

        <Input
          type="color"
          defaultValue={props.color || "#000000"}
          onChange={(e) =>
            setProp((props: any) => (props.color = e.target.value))
          }
          className="w-16 h-10 p-1 border rounded"
        />
      </div>
    </div>
  );
};

Button.craft = {
  props: {
    size: "md",
    variant: "default",
    color: "#000000",
    text: "Click me",
  },

  related: {
    settings: ButtonSettings,
  },
};

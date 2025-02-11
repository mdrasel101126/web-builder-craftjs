import { useNode } from "@craftjs/core";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import React from "react";

export type ToolbarItemProps = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey: string; // Ensure it's required
  index?: number;
  children?: React.ReactNode;
  type: "text" | "color" | "bg" | "number" | "slider" | "radio" | "select";
  onChange?: (value: any) => any;
};

export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: propKey ? node.data.props[propKey] : undefined,
  }));

  // Ensure propKey exists before using it
  if (!propKey) {
    console.error("ToolbarItem: propKey is required but missing.");
    return null;
  }

  const value = Array.isArray(propValue) ? propValue[index ?? 0] : propValue;

  return (
    <div className={cn(full ? "w-full" : "w-1/2", "mb-2")}>
      {["text", "color", "bg", "number"].includes(type) ? (
        <div>
          {props.label && <Label className="text-sm">{props.label}</Label>}
          <Input
            type={type}
            value={value}
            onChange={(e) => {
              setProp((props: any) => {
                if (Array.isArray(props[propKey])) {
                  props[propKey][index ?? 0] = onChange
                    ? onChange(e.target.value)
                    : e.target.value;
                } else {
                  props[propKey] = onChange
                    ? onChange(e.target.value)
                    : e.target.value;
                }
              }, 500);
            }}
          />
        </div>
      ) : type === "slider" ? (
        <div>
          {props.label && <Label className="text-sm">{props.label}</Label>}
          <Slider
            value={[parseInt(value) || 0]}
            onValueChange={(values) => {
              setProp((props: any) => {
                if (Array.isArray(props[propKey])) {
                  props[propKey][index ?? 0] = onChange
                    ? onChange(values[0])
                    : values[0];
                } else {
                  props[propKey] = onChange ? onChange(values[0]) : values[0];
                }
              }, 1000);
            }}
          />
        </div>
      ) : type === "radio" ? (
        <div>
          {props.label && <Label className="text-sm">{props.label}</Label>}
          <RadioGroup
            value={value || ""}
            onValueChange={(val) => {
              setProp((props: any) => {
                props[propKey] = onChange ? onChange(val) : val;
              });
            }}
          >
            {props.children}
          </RadioGroup>
        </div>
      ) : type === "select" && props.children ? (
        <div>
          {props.label && <Label className="text-sm">{props.label}</Label>}
          <Select
            value={value || ""}
            onValueChange={(val) =>
              setProp(
                (props: any) =>
                  (props[propKey] = onChange ? onChange(val) : val),
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>{props.children}</SelectContent>
          </Select>
        </div>
      ) : null}
    </div>
  );
};

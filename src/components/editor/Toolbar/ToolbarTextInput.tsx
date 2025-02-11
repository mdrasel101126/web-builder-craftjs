/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChromePicker } from "react-color";

export type ToolbarTextInputProps = {
  prefix?: string;
  label?: string;
  type: string;
  onChange?: (value: any) => void;
  value?: any;
};

export const ToolbarTextInput = ({
  onChange,
  value,
  prefix,
  label,
  type,
  ...props
}: ToolbarTextInputProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let val = value;
    if (type === "color" || type === "bg")
      val = `rgba(${Object.values(value)})`;
    setInternalValue(val);
  }, [value, type]);

  return (
    <div className="w-full relative">
      {label && <Label className="text-gray-500">{label}</Label>}

      {["color", "bg"].includes(type) ? (
        <Popover
          open={active}
          onOpenChange={setActive}
        >
          <PopoverTrigger asChild>
            <div
              className="relative w-full cursor-pointer flex items-center space-x-2 bg-gray-200 rounded-full px-3 py-2"
              onClick={() => setActive(true)}
            >
              <div
                className="w-5 h-5 rounded-full border"
                style={{ background: internalValue }}
              />
              <Input
                className="bg-transparent border-none focus:ring-0 text-sm"
                value={internalValue || ""}
                onChange={(e) => setInternalValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onChange?.(e.currentTarget.value);
                    setActive(false);
                  }
                }}
                {...props}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-auto">
            <ChromePicker
              color={value}
              onChange={(color) => {
                onChange?.(color.rgb);
              }}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Input
          className="w-full rounded-full bg-gray-200 px-4 py-2 text-sm"
          value={internalValue || ""}
          onChange={(e) => setInternalValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChange?.(e.currentTarget.value);
            }
          }}
          {...props}
        />
      )}
    </div>
  );
};

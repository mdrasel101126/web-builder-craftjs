"use client";
import { ToolbarItem, ToolbarSection } from "@/components/editor";
import { ToolbarRadio } from "@/components/editor/Toolbar/ToolbarRadio";
import { capitalize, weightDescription } from "@/lib/text";
import React from "react";
import { useState } from "react";
import {
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { useNode } from "@craftjs/core";
import { cn } from "@/lib/utils";

export const TextSettings = () => {
  return (
    <React.Fragment>
      {/* Typography Settings Section */}
      <TypographyPanel />

      {/*    <ToolbarSection
        title="Typography"
        props={["fontSize", "fontWeight", "textAlign"]}
        summary={({ fontSize, fontWeight, textAlign }: any) => {
          return `${fontSize || ""}, ${weightDescription(
            parseInt(fontWeight),
          )}, ${capitalize(textAlign)}`;
        }}
      >
        <ToolbarItem
          full={true}
          propKey="fontSize"
          type="slider"
          label="Font Size"
        />

        <ToolbarItem
          propKey="textAlign"
          type="radio"
          label="Align"
        >
          <ToolbarRadio
            value="left"
            label="Left"
          />
          <ToolbarRadio
            value="center"
            label="Center"
          />
          <ToolbarRadio
            value="right"
            label="Right"
          />
        </ToolbarItem>

        <ToolbarItem
          propKey="fontWeight"
          type="radio"
          label="Weight"
        >
          <ToolbarRadio
            value="400"
            label="Regular"
          />
          <ToolbarRadio
            value="500"
            label="Medium"
          />
          <ToolbarRadio
            value="700"
            label="Bold"
          />
        </ToolbarItem>
      </ToolbarSection> */}
      {/* Margin Settings Section */}
      <ToolbarSection
        title="Margin"
        props={["margin"]}
        summary={({ margin }: any) => {
          return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
            margin[3] || 0
          }px`;
        }}
      >
        <ToolbarItem
          propKey="margin"
          index={0}
          type="slider"
          label="Top"
        />
        <ToolbarItem
          propKey="margin"
          index={1}
          type="slider"
          label="Right"
        />
        <ToolbarItem
          propKey="margin"
          index={2}
          type="slider"
          label="Bottom"
        />
        <ToolbarItem
          propKey="margin"
          index={3}
          type="slider"
          label="Left"
        />
      </ToolbarSection>

      {/* Appearance Settings Section */}
      <ToolbarSection
        title="Appearance"
        props={["color", "shadow"]}
        summary={({
          color,
          shadow,
        }: {
          color?: string | undefined;
          shadow?: number | undefined;
        }) => {
          return (
            <div className="text-right">
              <p
                style={{
                  color: color && `rgba(${Object.values(color)})`,
                  textShadow: `0px 0px 2px rgba(0, 0, 0, ${
                    shadow ? shadow / 100 : 0
                  })`,
                }}
                className="text-white"
              >
                T
              </p>
            </div>
          );
        }}
      >
        <ToolbarItem
          full={true}
          propKey="color"
          type="color"
          label="Text"
        />
        <ToolbarItem
          full={true}
          propKey="shadow"
          type="slider"
          label="Shadow"
        />
      </ToolbarSection>
    </React.Fragment>
  );
};

interface TypographySettings {
  fontFamily: string;
  weight: string;
  size: string;
  alignment: string;
  isUnderline: boolean;
  isBold: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  color: string;
  opacity: number;
}

export function TypographyPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [settings, setSettings] = useState<TypographySettings>({
    fontFamily: "Inter",
    weight: "Medium",
    size: "16",
    alignment: "left",
    isUnderline: false,
    isBold: false,
    isItalic: false,
    isStrikethrough: false,
    color: "#000000",
    opacity: 100,
  });

  const fontWeights = ["Lighter", "Normal", "Bolder", "Bold"];
  const fontSizes = ["12", "14", "16", "18", "20", "24", "32"];
  const {
    actions: { setProp },
    fontFamily,
    fontSize,
    textAlign,
    fontWeight,
    color,
    opacity,
    isUnderline,
    isBold,
  } = useNode((node) => ({
    fontFamily: node.data.props?.fontFamily ?? "Arial",
    fontSize: node.data.props?.fontSize ?? "16",
    fontWeight: node.data.props?.fontWeight ?? "Normal",
    textAlign: node.data.props?.textAlign ?? "left",
    color: node.data.props?.color ?? "#000000",
    opacity: node.data.props?.opacity ?? 100,
    isUnderline: node.data.props?.isUnderline ?? false,
    isBold: node.data.props?.isBold ?? false,
  }));

  return (
    <Card className="border-0 shadow-none bg-gray-100">
      <CardHeader
        className="py-3 px-4 flex flex-row items-center justify-between cursor-pointer bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-sm font-medium">Typography</CardTitle>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </CardHeader>
      <p style={{ fontWeight: "" }}></p>
      {isOpen && (
        <CardContent className="p-4 pt-0 space-y-4">
          <Select
            value={fontFamily}
            onValueChange={(value) =>
              setProp((props: any) => (props.fontFamily = value))
            }
          >
            <SelectTrigger>
              <SelectValue>{fontFamily}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Poppins">Poppins</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-[2fr,1fr] gap-2">
            <Select
              value={fontWeight}
              onValueChange={(value) => {
                setProp((props: any) => (props.fontWeight = value));
                if (value === "Bold") {
                  setProp((props: any) => (props.isBold = true));
                } else {
                  setProp((props: any) => (props.isBold = false));
                }
              }}
            >
              <SelectTrigger>
                <SelectValue className="capitalize">{fontWeight}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {fontWeights.map((weight) => (
                  <SelectItem
                    key={weight}
                    value={weight}
                    className="capitalize"
                  >
                    {weight}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={fontSize}
              onValueChange={(value) =>
                setProp((props: any) => (props.fontSize = value))
              }
            >
              <SelectTrigger>
                <SelectValue>{fontSize}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {fontSizes.map((size) => (
                  <SelectItem
                    key={size}
                    value={size}
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-1 border-b pb-4">
            <Toggle
              size="sm"
              pressed={textAlign === "left"}
              onPressedChange={() =>
                setProp((props: any) => (props.textAlign = "left"))
              }
              aria-label="Align left"
            >
              <AlignLeft
                className={cn("h-4 w-4", {
                  "text-violet-600": textAlign === "left",
                })}
              />
            </Toggle>
            <Toggle
              size="sm"
              pressed={textAlign === "center"}
              onPressedChange={() =>
                setProp((props: any) => (props.textAlign = "center"))
              }
              aria-label="Align center"
            >
              <AlignCenter
                className={cn("h-4 w-4", {
                  "text-violet-600": textAlign === "center",
                })}
              />
            </Toggle>
            <Toggle
              size="sm"
              pressed={textAlign === "right"}
              onPressedChange={() =>
                setProp((props: any) => (props.textAlign = "right"))
              }
              aria-label="Align right"
            >
              <AlignRight
                className={cn("h-4 w-4", {
                  "text-violet-600": textAlign === "right",
                })}
              />
            </Toggle>
            <Toggle
              size="sm"
              pressed={textAlign === "justify"}
              onPressedChange={() =>
                setProp((props: any) => (props.textAlign = "justify"))
              }
              aria-label="Justify"
            >
              <AlignJustify
                className={cn("h-4 w-4", {
                  "text-violet-600": textAlign === "justify",
                })}
              />
            </Toggle>
          </div>

          <div className="flex space-x-1">
            <Toggle
              size="sm"
              pressed={isUnderline}
              onPressedChange={(pressed) =>
                setProp((props: any) => (props.isUnderline = pressed))
              }
              aria-label="Underline"
            >
              <span
                className={cn("font-medium", {
                  "text-violet-600": isUnderline === true,
                })}
              >
                U
              </span>
            </Toggle>
            <Toggle
              size="sm"
              pressed={isBold}
              onPressedChange={(pressed) => {
                setProp((props: any) => (props.isBold = pressed));
                if (pressed) {
                  setProp((props: any) => (props.fontWeight = "Bold"));
                } else {
                  setProp((props: any) => (props.fontWeight = "Normal"));
                }
              }}
              aria-label="Bold"
            >
              <span
                className={cn("font-medium", {
                  "text-violet-600 font-bold": isBold === true,
                })}
              >
                B
              </span>
            </Toggle>
            <Toggle
              size="sm"
              pressed={settings.isItalic}
              onPressedChange={(pressed) =>
                setSettings({ ...settings, isItalic: pressed })
              }
              aria-label="Italic"
              className="italic"
            >
              I
            </Toggle>
            <Toggle
              size="sm"
              pressed={settings.isStrikethrough}
              onPressedChange={(pressed) =>
                setSettings({ ...settings, isStrikethrough: pressed })
              }
              aria-label="Strikethrough"
              className="line-through"
            >
              S
            </Toggle>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 border rounded-md px-3 py-2">
              <input
                type="color"
                value={color}
                onChange={(e) =>
                  setProp((props: any) => (props.color = e.target.value))
                }
                className="rounded bg-black"
                style={{ backgroundColor: color }}
              />
              <p className="w-full bg-transparent border-none text-sm focus:outline-none">
                {color}
              </p>
            </div>
            <div className="flex items-center space-x-2 border rounded-md px-3 py-2">
              <input
                type="number"
                value={opacity}
                onChange={(e) =>
                  setProp((props: any) => (props.opacity = e.target.value))
                }
                className="w-full bg-transparent border-none text-sm focus:outline-none"
                min="0"
                max="100"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

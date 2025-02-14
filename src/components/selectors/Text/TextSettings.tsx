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
  Minus,
  Plus,
  ChevronUp,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TextSettings = () => {
  return (
    <React.Fragment>
      {/* Spacing Setting Section */}
      <SpacingPanel />
      {/* Size setting Section */}
      <SizePanel />
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
    isItalic,
  } = useNode((node) => ({
    fontFamily: node.data.props?.fontFamily ?? "Arial",
    fontSize: node.data.props?.fontSize ?? "16",
    fontWeight: node.data.props?.fontWeight ?? "Normal",
    textAlign: node.data.props?.textAlign ?? "left",
    color: node.data.props?.color ?? "#000000",
    opacity: node.data.props?.opacity ?? 100,
    isUnderline: node.data.props?.isUnderline ?? false,
    isBold: node.data.props?.isBold ?? false,
    isItalic: node.data.props?.isItalic ?? false,
  }));

  return (
    <Card className="border-0 rounded-none shadow-none bg-gray-100">
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
              pressed={isItalic}
              onPressedChange={(pressed) =>
                setProp((props: any) => (props.isItalic = pressed))
              }
              aria-label="Italic"
              className="italic"
            >
              <span
                className={cn("font-medium", {
                  "text-violet-600": isItalic === true,
                })}
              >
                I
              </span>
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

export function SpacingPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [isPaddingOpen, setIsPaddingOpen] = React.useState(true);
  const [isMarginOpen, setIsMarginOpen] = React.useState(false);

  const {
    actions: { setProp },
    padding,
    margin,
  } = useNode((node) => ({
    padding: node.data.props?.padding ?? ["0", "0", "0", "0"],
    margin: node.data.props?.margin ?? ["0", "0", "0", "0"],
  }));
  return (
    <div className="border-0 rounded-none shadow-none bg-gray-100">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-4 hover:bg-accent hover:no-underline"
          >
            <span className="font-medium">Spacing</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 opacity-50" />
            ) : (
              <ChevronDown className="h-4 w-4 opacity-50" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 space-y-2">
            {/* Padding Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Padding</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPaddingOpen(!isPaddingOpen)}
                >
                  {isPaddingOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {isPaddingOpen && (
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1.5">
                    <Input
                      type="number"
                      className="h-8 px-1"
                      value={padding[0]}
                      onChange={(e) =>
                        setProp(
                          (props: any) => (props.padding[0] = e.target.value),
                        )
                      }
                      min={0}
                    />
                    <div className="flex items-center justify-end">
                      <span className="text-xs text-muted-foreground">PX</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Input
                      type="number"
                      className="h-8 px-1"
                      value={padding[1]}
                      onChange={(e) =>
                        setProp(
                          (props: any) => (props.padding[1] = e.target.value),
                        )
                      }
                      min={0}
                    />
                    <div className="flex items-center justify-end">
                      <span className="text-xs text-muted-foreground">PX</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Input
                      type="number"
                      className="h-8 px-1"
                      value={padding[2]}
                      onChange={(e) =>
                        setProp(
                          (props: any) => (props.padding[2] = e.target.value),
                        )
                      }
                      min={0}
                    />
                    <div className="flex items-center justify-end">
                      <span className="text-xs text-muted-foreground">PX</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Input
                      type="number"
                      className="h-8 px-1"
                      value={padding[3]}
                      onChange={(e) =>
                        setProp(
                          (props: any) => (props.padding[3] = e.target.value),
                        )
                      }
                      min={0}
                    />
                    <div className="flex items-center justify-end">
                      <span className="text-xs text-muted-foreground">PX</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Margin Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Margin</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMarginOpen(!isMarginOpen)}
                >
                  {isMarginOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {isMarginOpen && (
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1.5">
                    <Input
                      type="number"
                      className="h-8 px-1"
                      value={margin[0]}
                      onChange={(e) =>
                        setProp(
                          (props: any) => (props.margin[0] = e.target.value),
                        )
                      }
                      min={0}
                    />
                    <div className="flex items-center justify-end">
                      <span className="text-xs text-muted-foreground">PX</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Input
                      type="number"
                      className="h-8 px-1"
                      value={margin[1]}
                      onChange={(e) =>
                        setProp(
                          (props: any) => (props.margin[1] = e.target.value),
                        )
                      }
                      min={0}
                    />
                    <div className="flex items-center justify-end">
                      <span className="text-xs text-muted-foreground">PX</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Input
                      type="number"
                      className="h-8 px-1"
                      value={margin[2]}
                      onChange={(e) =>
                        setProp(
                          (props: any) => (props.margin[2] = e.target.value),
                        )
                      }
                      min={0}
                    />
                    <div className="flex items-center justify-end">
                      <span className="text-xs text-muted-foreground">PX</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Input
                      type="number"
                      className="h-8 px-1"
                      value={margin[3]}
                      onChange={(e) =>
                        setProp(
                          (props: any) => (props.margin[3] = e.target.value),
                        )
                      }
                      min={0}
                    />
                    <div className="flex items-center justify-end">
                      <span className="text-xs text-muted-foreground">PX</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

interface SizeValue {
  value: string | number;
  unit: "PX" | "%" | "VW" | "VH" | "FIT" | "FULL" | "AUTO" | "NONE";
}
export function SizePanel() {
  const [isOpen, setIsOpen] = useState(true);
  /*  const [width, setWidth] = React.useState<SizeValue>({
    value: 500,
    unit: "PX",
  }); */
  const {
    actions: { setProp },
    width,
    height,
  } = useNode((node) => ({
    width: node.data.props?.width ?? { value: "100", unit: "%" },
    height: node.data.props?.height ?? { value: "100", unit: "%" },
  }));

  return (
    <div className="border-0 rounded-none shadow-none bg-gray-100">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-4 hover:bg-accent hover:no-underline"
          >
            <span className="font-medium">Size</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 opacity-50" />
            ) : (
              <ChevronDown className="h-4 w-4 opacity-50" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 space-y-2">
            <div className="grid grid-cols-2 gap-3">
              {/* Width */}
              <div className="flex items-center gap-1">
                <label className="block text-sm font-medium text-gray-700">
                  Width:
                </label>
                <div className="flex items-center gap-0">
                  <Input
                    type="text"
                    className="h-8 px-1"
                    value={width.value}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (/^\d*$/.test(newValue)) {
                        setProp((props: any) => {
                          props.width = { value: newValue, unit: width.unit };
                        });
                      }
                    }}
                    min={0}
                  />{" "}
                  <Select
                    value={width.unit}
                    onValueChange={(unit: SizeValue["unit"]) => {
                      if (
                        ["FIT", "AUTO", "FULL", "NONE"].includes(width.unit)
                      ) {
                        setProp((props: any) => {
                          props.width = { value: unit, unit };
                        });
                      } else {
                        setProp((props: any) => {
                          props.width = { ...width, unit };
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="h-8 w-[80px] p-1">
                      <SelectValue>
                        {["FIT", "AUTO", "FULL", "NONE"].includes(width.unit)
                          ? "-"
                          : width.unit}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PX">PX</SelectItem>
                      <SelectItem value="%">%</SelectItem>
                      <SelectItem value="VW">VW</SelectItem>
                      <SelectItem value="VH">VH</SelectItem>
                      {/*<SelectItem value="AUTO">AUTO</SelectItem>
                      <SelectItem value="FULL">FULL</SelectItem>
                      <SelectItem value="FIT">FIT</SelectItem>
                      <SelectItem value="NONE">None</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Height */}
              <div className="flex items-center gap-1">
                <label className="block text-sm font-medium text-gray-700">
                  Height:
                </label>
                <div className="flex items-center gap-0">
                  <Input
                    type="text"
                    className="h-8 px-1"
                    value={height.value}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (/^\d*$/.test(newValue)) {
                        setProp((props: any) => {
                          props.height = { value: newValue, unit: height.unit };
                        });
                      }
                    }}
                    min={0}
                  />{" "}
                  <Select
                    value={height.unit}
                    onValueChange={(unit: SizeValue["unit"]) => {
                      if (
                        ["FIT", "AUTO", "FULL", "NONE"].includes(height.unit)
                      ) {
                        setProp((props: any) => {
                          props.height = { value: unit, unit };
                        });
                      } else {
                        setProp((props: any) => {
                          props.height = { ...height, unit };
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="h-8 w-[80px] p-1">
                      <SelectValue>
                        {["FIT", "AUTO", "FULL", "NONE"].includes(height.unit)
                          ? "-"
                          : height.unit}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PX">PX</SelectItem>
                      <SelectItem value="%">%</SelectItem>
                      <SelectItem value="VW">VW</SelectItem>
                      <SelectItem value="VH">VH</SelectItem>
                      {/*                       <SelectItem value="AUTO">AUTO</SelectItem>
                      <SelectItem value="FULL">FULL</SelectItem>
                      <SelectItem value="FIT">FIT</SelectItem>
                      <SelectItem value="NONE">None</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

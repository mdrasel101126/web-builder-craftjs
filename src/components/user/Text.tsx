/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { ChevronDown, X, Plus, Minus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TextProps {
  text: string;
  className?: string;
  fontSize?: number;
}

export const Text: React.FC<TextProps> & { craft?: any } = ({
  text,
  className = "",
  fontSize = 16,
}) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!hasSelectedNode) {
      setEditable(false);
    }
  }, [hasSelectedNode]);

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      onClick={() => setEditable(true)}
    >
      <ContentEditable
        html={text}
        onChange={(e) =>
          setProp(
            (props: any) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
          )
        }
        tagName="p"
        className={cn("text-base w-fit break-words", className, {
          "outline-blue-400": editable,
        })}
        style={{ fontSize: `${fontSize}px` }}
        disabled={!editable}
      />
    </div>
  );
};

const TextSettings: React.FC = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize || 16,
  }));

  return <TextProperties />;
};

Text.craft = {
  displayName: "Text",
  related: {
    settings: TextSettings,
  },
};

export function TextProperties() {
  return (
    <div className="w-full space-y-0.5 bg-background font-sans">
      <EditorSection title="Layout">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Display</div>
            <div className="flex gap-1">
              {["grid", "center", "grid-2", "screen", "box", "eye"].map(
                (icon, i) => (
                  <Toggle
                    key={icon}
                    pressed={i === 1}
                    className="h-8 w-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    <div
                      className={cn(
                        "h-4 w-4 border",
                        i === 1
                          ? "border-primary-foreground"
                          : "border-muted-foreground",
                      )}
                    />
                  </Toggle>
                ),
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Direction</div>
            <div className="flex gap-1">
              <Button
                variant="default"
                className="h-8 flex-1 bg-primary text-primary-foreground"
              >
                Horizontal
              </Button>
              <Button
                variant="outline"
                className="h-8 flex-1"
              >
                Vertical
              </Button>
            </div>
          </div>

          <CollapsibleItem title="Align" />
          <CollapsibleItem title="Justify" />

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Gap</div>
            <div className="grid grid-cols-[1fr,auto,1fr,auto,1fr] items-center gap-2">
              <Input
                type="text"
                className="h-8"
                value="0"
              />
              <span className="text-xs text-muted-foreground">PX</span>
              <Input
                type="text"
                className="h-8"
                value="0"
              />
              <span className="text-xs text-muted-foreground">PX</span>
              <Input
                type="text"
                className="h-8"
                value="0"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Columns</span>
              <span className="mr-8">Rows</span>
            </div>
          </div>
        </div>
      </EditorSection>

      <EditorSection title="Spacing">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Padding</div>
            <div className="grid grid-cols-[auto,1fr,auto,1fr,auto] items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded border text-muted-foreground">
                ⟦
              </div>
              <Input
                type="text"
                className="h-8"
                value="100"
              />
              <span className="text-xs text-muted-foreground">PX</span>
              <Input
                type="text"
                className="h-8"
                value="20"
              />
              <span className="text-xs text-muted-foreground">PX</span>
            </div>
          </div>
          <CollapsibleItem title="Margin" />
        </div>
      </EditorSection>

      <EditorSection title="Size">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Width</div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  className="h-8"
                  value="0"
                />
                <span className="text-xs text-muted-foreground">PX</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Height</div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  className="h-8"
                  value="Auto"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Min W</div>
              <Button
                variant="outline"
                className="h-8 w-full justify-start"
              >
                None
              </Button>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Min H</div>
              <Button
                variant="outline"
                className="h-8 w-full justify-start"
              >
                None
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Max W</div>
              <Button
                variant="outline"
                className="h-8 w-full justify-start"
              >
                None
              </Button>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Max H</div>
              <Button
                variant="outline"
                className="h-8 w-full justify-start"
              >
                None
              </Button>
            </div>
          </div>
        </div>
      </EditorSection>

      <EditorSection title="Typography">
        <div className="space-y-4">
          <Select defaultValue="inter">
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-[1fr,auto] gap-2">
            <Select defaultValue="medium">
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="16">
              <SelectTrigger className="h-8 w-16">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="18">18</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-1">
            {["left", "center", "right", "justify"].map((align) => (
              <Toggle
                key={align}
                className="h-8 w-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <div className="h-4 w-4 border border-muted-foreground" />
              </Toggle>
            ))}
          </div>

          <div className="flex gap-1">
            {["normal", "underline", "bold", "italic", "strike"].map(
              (style) => (
                <Toggle
                  key={style}
                  className="h-8 w-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  <div className="h-4 w-4 border border-muted-foreground" />
                </Toggle>
              ),
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-black" />
            <Input
              type="text"
              className="h-8"
              value="#000000"
              onChange={() => {}}
            />
            <Input
              type="text"
              className="h-8 w-16"
              value="100%"
              onChange={() => {}}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <div className="h-4 w-4 rounded-sm border border-muted-foreground" />
            </Button>
          </div>
        </div>
      </EditorSection>

      <EditorSection title="Effect">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Opacity</div>
            <div className="flex items-center gap-4">
              <Slider
                defaultValue={[100]}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="w-12 text-sm">100%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Outline</div>
            <div className="flex items-center gap-2">
              <Toggle className="h-8 w-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                <X className="h-4 w-4" />
              </Toggle>
              <Toggle className="h-8 w-8 p-0">
                <Minus className="h-4 w-4" />
              </Toggle>
              <Toggle className="h-8 w-8 p-0">
                <Minus className="h-4 w-4" />
              </Toggle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <div className="h-4 w-4 rounded-sm border border-muted-foreground" />
              </Button>
            </div>
          </div>

          <CollapsibleItem title="Box Shadow" />
          <CollapsibleItem title="2D & 3D Transformation" />
          <CollapsibleItem title="Transitions" />
          <CollapsibleItem title="Filters" />
          <CollapsibleItem title="Backdrop Filters" />

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Cursor</div>
            <Select defaultValue="pointer">
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select cursor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pointer">Pointer</SelectItem>
                <SelectItem value="default">Default</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </EditorSection>
    </div>
  );
}

function EditorSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Collapsible className="space-y-2 py-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between">
        <h2 className="text-sm font-medium">{title}</h2>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function CollapsibleItem({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-muted-foreground">{title}</span>
      <Plus className="h-4 w-4" />
    </div>
  );
}

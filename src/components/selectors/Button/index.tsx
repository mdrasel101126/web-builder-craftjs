import { useEditor, useNode, UserComponent } from "@craftjs/core";
import { Button as ShadButton } from "@/components/ui/button"; // ShadCN button
import { cn } from "@/lib/utils"; // Ensure cn is properly imported
import { Text } from "../Text";
import React from "react";
import ContentEditable from "react-contenteditable";
import { ButtonSettings } from "./ButtonSettings";
type Variant =
  | "default"
  | "destructive"
  | "ghost"
  | "link"
  | "outline"
  | "secondary"
  | null
  | undefined;
type Size = "default" | "sm" | "lg" | "icon" | null | undefined;
type ButtonProps = {
  variant?: Variant;
  size?: Size;
  background?: string;
  color?: string;
  buttonStyle?: "full" | "outline";
  margin?: string;
  text?: string;
  textComponent?: any;
};

// Define the component as a Craft.js component using UserComponent
export const Button: UserComponent<ButtonProps> = ({
  text = "Button",
  variant = "default",
  size = "default",
  color = "text-gray-900",
  buttonStyle = "full",
  background = "bg-white",
  margin = "m-2",
}) => {
  const {
    connectors: { connect },
    setProp,
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <ShadButton
      ref={(node) => {
        if (node) {
          connect(node);
        }
      }}
      variant={variant}
      size={size}
      className={cn(
        "rounded px-4 py-2 w-full",
        background,
        margin,
        buttonStyle === "outline" ? "border border-gray-500" : "shadow-md",
      )}
    >
      <ContentEditable
        innerRef={connect}
        html={text}
        disabled={!enabled}
        onChange={(e) => {
          setProp((prop) => (prop.text = e.target.value), 500);
        }}
        className="focus:outline cursor-text w-full"
      />
    </ShadButton>
  );
};

// Attach craft metadata
Button.craft = {
  displayName: "Button",
  props: {
    background: "bg-white",
    color: "text-gray-900",
    buttonStyle: "full",
    text: "Button",
    margin: "m-2",
  },
  related: {
    toolbar: ButtonSettings,
  },
};

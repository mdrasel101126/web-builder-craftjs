import { useEditor, useNode, UserComponent } from "@craftjs/core";
import { Button as ShadButton } from "@/components/ui/button"; // ShadCN button
import { cn } from "@/lib/utils"; // Ensure cn is properly imported
import { Text } from "../Text";
import React from "react";
import ContentEditable from "react-contenteditable";
import { ButtonSettings } from "./ButtonSettings";

type FontKey = "Inter" | "Roboto" | "Arial" | "Poppins" | "Rajdhani";

type FontMap = Record<FontKey, string>;

const fonts: FontMap = {
  Inter: "font-inter",
  Roboto: "font-roboto",
  Arial: "font-arial",
  Poppins: "font-poppins",
  Rajdhani: "font-rajdhani",
};
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
  fontFamily: FontKey;
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<"r" | "g" | "b" | "a", string> | string;
  opacity: string;
  isUnderline: boolean;
  isBold: boolean;
  isItalic: boolean;
  variant?: Variant;
  size?: Size;
  background?: string;
  buttonStyle?: "full" | "outline";
  margin?: [string, string, string, string];
  padding?: [string, string, string, string];
  text?: string;
  textComponent?: any;
};

// Define the component as a Craft.js component using UserComponent
export const Button: UserComponent<Partial<ButtonProps>> = ({
  fontFamily = "Arial",
  fontSize,
  textAlign = "center",
  fontWeight,
  color = "#000000",
  opacity = "100",
  isUnderline = false,
  isBold = false,
  isItalic = false,
  text = "Button",
  variant = "default",
  size = "default",
  margin = ["0", "0", "0", "0"],
  buttonStyle = "full",
  background = "bg-white",
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
        buttonStyle === "outline" ? "border border-gray-500" : "shadow-md",
        fonts[fontFamily],
        { underline: isUnderline },
        { "font-bold": isBold },
        { italic: isItalic },
      )}
      style={{
        fontWeight: `${fontWeight}`,
        textAlign: `${textAlign}` as CanvasTextAlign,
        opacity: `${opacity}%`,
        color: `${color}`,
        fontSize: `${fontSize}px`,
      }}
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
    fontFamily: "Arial",
    fontSize: "16",
    textAlign: "left",
    fontWeight: "Normal",
    color: "#000000",
    opacity: "100",
    isUnderline: false,
    isBold: false,
    isItalic: false,
    text: "Button",
  },
  related: {
    toolbar: ButtonSettings,
  },
};

import { useNode, useEditor, UserComponent } from "@craftjs/core";
import React from "react";
import ContentEditable from "react-contenteditable";

import { TextSettings } from "./TextSettings";
import { cn } from "@/lib/utils";
type FontKey = "Inter" | "Roboto" | "Arial" | "Poppins" | "Rajdhani";

type FontMap = Record<FontKey, string>;

const fonts: FontMap = {
  Inter: "font-inter",
  Roboto: "font-roboto",
  Arial: "font-arial",
  Poppins: "font-poppins",
  Rajdhani: "font-rajdhani",
};

export type TextProps = {
  fontFamily: FontKey;
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<"r" | "g" | "b" | "a", string> | string;
  margin: [string, string, string, string];
  opacity: string;
  isUnderline: boolean;
  isBold: boolean;
  isItalic: boolean;
  padding: [string, string, string, string];
  width: {
    value: string;
    unit: string;
  };
  height: {
    value: string;
    unit: string;
  };
  shadow: number;
  text: string;
};

export const Text: UserComponent<Partial<TextProps>> = ({
  fontFamily = "Arial",
  fontSize,
  textAlign,
  fontWeight,
  color = "#000000",
  margin = ["0", "0", "0", "0"],
  opacity = "100",
  isUnderline = false,
  isBold = false,
  isItalic = false,
  padding = ["0", "0", "0", "0"],
  width = { value: "100", unit: "%" },
  height = { value: "100", unit: "%" },
  shadow,
  text = "Text",
}) => {
  const {
    connectors: { connect },
    setProp,
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <ContentEditable
      innerRef={connect}
      html={text} // innerHTML of the editable div
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => (prop.text = e.target.value), 500);
      }} // use true to disable editing
      tagName="h2" // Use a custom HTML tag (uses a div by default)
      className={cn(
        fonts[fontFamily],
        { underline: isUnderline },
        { "font-bold": isBold },
        { italic: isItalic },
      )}
      style={{
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        color: `${color}`,
        fontSize: `${fontSize}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
        fontWeight: `${fontWeight}`,
        textAlign: `${textAlign}`,
        opacity: `${opacity}%`,
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
        width: `${width.value}${width.unit}`,
        height: `${height.value}${height.unit}`,
      }}
    />
  );
};

Text.craft = {
  displayName: "Text",
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
    padding: ["0", "0", "0", "0"],
    margin: ["0", "0", "0", "0"],
    width: { value: "100", unit: "%" },
    height: { value: "100", unit: "%" },
    shadow: 0,
    text: "Text",
  },
  related: {
    toolbar: TextSettings,
  },
};

const Test = () => {
  return (
    <p
      style={{ fontFamily: "sans-serif", maxWidth: "10" }}
      className="h-auto w-fit"
    >
      Hello world
    </p>
  );
};

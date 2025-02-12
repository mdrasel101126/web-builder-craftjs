import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import ContentEditable from "react-contenteditable";

import { TextSettings } from "./TextSettings";

export type TextProps = {
  fontFamily: "Inter";
  weight: "Medium";
  size: "16";
  alignment: "left";
  isUnderline: false;
  isBold: false;
  isItalic: false;
  isStrikethrough: false;
  color: "#000000";
  opacity: 100;
  margin: [string, string, string, string];
  text: string;
};

export const Text = ({
  fontFamily = "Inter",
  weight = "Medium",
  size = "16",
  alignment = "left",
  isUnderline = false,
  isBold = false,
  isItalic = false,
  isStrikethrough = false,
  color = "#000000",
  text = "Text",
  margin = ["0", "0", "0", "0"],
}: Partial<TextProps>) => {
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
      style={{
        width: "100%",
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        color: `rgba(${Object.values(color)})`,
        fontSize: `${size}px`,
        fontWeight: `${weight}`,
        textAlign: `${alignment}`,
        fontFamily: `${fontFamily}`,
      }}
    />
  );
};

Text.craft = {
  displayName: "Text",
  props: {
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
    text: "Text",
  },
  related: {
    toolbar: TextSettings,
  },
};

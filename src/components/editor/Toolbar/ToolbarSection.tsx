import { useNode } from "@craftjs/core";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

interface ToolbarSectionProps {
  title: string;
  props?: string[];
  summary?: (props: any) => React.ReactNode | string;
  children: React.ReactNode;
}

export const ToolbarSection: React.FC<ToolbarSectionProps> = ({
  title,
  props,
  summary,
  children,
}) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props?.reduce((res: Record<string, any>, key) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}) || {},
  }));

  const summaryContent =
    summary && props ? (
      <h5 className="text-sm text-gray-500">
        {summary(
          props.reduce((acc: Record<string, any>, key) => {
            acc[key] = nodeProps[key];
            return acc;
          }, {}),
        )}
      </h5>
    ) : null;

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-none bg-transparent"
    >
      <AccordionItem
        value={`toolbar-section-${title}`}
        className="border-none"
      >
        <AccordionTrigger className="px-6 py-2 w-full flex items-center justify-between bg-transparent hover:no-underline">
          <div className="w-full flex items-center justify-between">
            <h5 className="text-sm text-gray-600 font-medium">{title}</h5>
            {summaryContent}
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4">
          <div className="border-t border-gray-200 mb-3"></div>
          <div className="grid grid-cols-1 gap-2">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

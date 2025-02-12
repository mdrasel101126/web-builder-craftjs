"use client";

import { useNode, useEditor } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import { useEffect, useRef, useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { ArrowUp, Move, Trash } from "lucide-react";

export const RenderNode = ({ render }: { render: React.ReactNode }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom?.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
  }));

  const currentRef = useRef<HTMLDivElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPortalTarget(
        document.querySelector(".page-container") as HTMLElement | null,
      );
    }
  }, []);

  useEffect(() => {
    if (dom) {
      dom.classList.toggle("component-selected", Boolean(isActive || isHover));
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    if (!dom) return { top: "0px", left: "0px" };
    const { top, left, bottom } = dom.getBoundingClientRect();
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    if (!currentRef.current || !dom) return;
    const { top, left } = getPos(dom);
    currentRef.current.style.top = top;
    currentRef.current.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const container = document.querySelector(".craftjs-renderer");
      container?.addEventListener("scroll", scroll);
      return () => container?.removeEventListener("scroll", scroll);
    }
  }, [scroll]);

  return (
    <>
      {(isHover || isActive) && portalTarget
        ? ReactDOM.createPortal(
            <div
              ref={currentRef}
              className="px-2 py-2 text-white bg-blue-500 fixed w-fit flex items-center"
              style={{
                ...getPos(dom!),
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1 text-sm mr-4">{name}</h2>
              {moveable && (
                <button
                  ref={(node) => {
                    if (node) {
                      drag(node);
                    }
                  }}
                  className="mr-2 cursor-move"
                >
                  <Move size={15} />
                </button>
              )}
              {id !== ROOT_NODE && (
                <button
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    if (parent) {
                      actions.selectNode(parent);
                    }
                  }}
                >
                  <ArrowUp size={15} />
                </button>
              )}
              {deletable && (
                <button
                  className="cursor-pointer"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Trash size={15} />
                </button>
              )}
            </div>,
            portalTarget,
          )
        : null}
      {render}
    </>
  );
};

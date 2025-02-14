import { RefObject, useEffect, useState } from "react";

export const useResizeContainer = (ref: RefObject<any>) => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    const container = ref.current;
    if (container) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          console.log(`Width: ${width}px, Height: ${height}px`);
          setWidth(width);
        }
      });

      resizeObserver.observe(container);

      return () => {
        resizeObserver.unobserve(container);
      };
    }
  }, []);
  return {
    width,
  };
};

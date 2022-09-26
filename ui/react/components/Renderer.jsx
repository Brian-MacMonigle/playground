import React from "react";
import { ipcRenderer } from "electron";

import { useResizeObserver } from "../hooks/useResizeObserver";

export function Renderer() {
  const ref = useResizeObserver(
    ({
      target: {
        offsetLeft: x,
        offsetTop: y,
        offsetWidth: width,
        offsetHeight: height,
      },
    }) => ipcRenderer.send("renderer-resize", { x, y, width, height })
  );

  return <div ref={ref}>Hello Renderer!</div>;
}

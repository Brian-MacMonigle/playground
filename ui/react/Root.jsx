import React from "react";
import rust from "../../lib/index.node";

export function Root(props) {
  return (
    <>
      <h1>Hello HTML</h1>
      <div id="node">Node version: {props.node}</div>
      <div id="chrome">Chrome version: {props.chrome}</div>
      <div id="electron">Electron version: {props.electron}</div>
      <div id="rust">{rust.hello("Rust!")}</div>
    </>
  );
}

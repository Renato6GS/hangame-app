import * as React from "react";

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-arrow-narrow-right"
    width={24}
    height={24}
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M5 12h14M15 16l4-4M15 8l4 4" />
  </svg>
);

export default SvgComponent;

import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-color"
    fill={props.color || "#fff"}
  >
    <path d="m21.71 11.29-3-3a1 1 0 0 0-1.42 1.42l1.3 1.29H3a1 1 0 0 0 0 2h15.59l-1.3 1.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 0-1.42Z" />
  </svg>
);
export default SVGComponent;

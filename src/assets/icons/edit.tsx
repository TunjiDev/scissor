import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={props.color} width={24} height={24} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      className="clr-i-outline clr-i-outline-path-1"
      d="M33.87 8.32 28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5 2.14 2.14 0 0 0 .43 0l8.29-1.9 20.78-20.76a2.07 2.07 0 0 0 0-2.92ZM12.09 30.2l-7.77 1.63 1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6 3.48-3.46 5.9 6Z"
    />
    <path fill="none" d="M0 0h36v36H0z" />
  </svg>
);
export default SVGComponent;

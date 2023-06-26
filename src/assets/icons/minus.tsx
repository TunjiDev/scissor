import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="-5 -11 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
    className="jam jam-minus"
    fill={props.color}
    {...props}
  >
    <path d="M1 0h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z" />
  </svg>
);
export default SVGComponent;

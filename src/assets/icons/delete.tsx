import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={props.color} width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22 5h-5V2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v3H2a1 1 0 0 0 0 2h1.117l1.891 15.124A1 1 0 0 0 6 23h12a1 1 0 0 0 .992-.876L20.883 7H22a1 1 0 0 0 0-2ZM9 3h6v2H9Zm8.117 18H6.883L5.133 7h13.734Z" />
  </svg>
);
export default SVGComponent;

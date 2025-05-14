import React from "react";

interface UpperRightArrow extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export const UpperRightArrow: React.FC<UpperRightArrow> = ({
  size = 24,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} {...props}>
      <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
    </svg>
  );
};

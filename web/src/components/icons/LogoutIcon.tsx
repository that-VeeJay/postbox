import React from "react";

interface LogoutIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  primaryColor?: string;
  secondaryColor?: string;
}

export const LogoutIcon = ({
  size = 16,
  primaryColor = "currentColor",
  secondaryColor = "currentColor",
  ...props
}: LogoutIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      {...props}
    >
      {/* Document body */}
      <path
        d="M10.95 15.84h-11V.17h11v3.88h-1V1.17h-9v13.67h9v-2.83h1v3.83z"
        fill={primaryColor}
      />

      {/* Horizontal line */}
      <path d="M5 8h6v1H5z" fill={secondaryColor} />

      {/* Arrow */}
      <path d="M11 5.96l4.4 2.54-4.4 2.54V5.96z" fill={primaryColor} />
    </svg>
  );
};

// Usage examples:
// <LogoutIcon /> (default 16x16)
// <LogoutIcon size={24} primaryColor="#3b82f6" secondaryColor="#94a3b8" />
// <LogoutIcon className="mr-2" aria-label="Export document" />

import React from "react";

interface InfoIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({
  size = 15,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350.29 350.29"
      width={size}
      height={size}
      className={className}
    >
      <g transform="translate(-202 -474.36)">
        <g transform="translate(79 352.36)">
          <g
            transform="translate(129,128)"
            style={{
              strokeLinejoin: "round",
              stroke: color,
              strokeWidth: strokeWidth * 12,
              fill: "none",
            }}
          >
            <path d="M338.29 169.14c0 93.37-75.78 169.15-169.15 169.15-93.364 0-169.14-75.78-169.14-169.15 0-93.364 75.776-169.14 169.14-169.14 93.37 0 169.15 75.776 169.15 169.14z" />
          </g>
          <g transform="translate(265.1 165.98)" style={{ fill: color }}>
            <path d="M0 30.61c0-8.461 3.217-15.677 9.651-21.65 6.434-5.9727 14.142-8.959 23.122-8.96 9.115 0.001 16.89 2.9873 23.324 8.9599 6.434 5.9731 9.651 13.189 9.652 21.65-0.001 8.338-3.218 15.555-9.652 21.652-6.434 5.972-14.209 8.958-23.324 8.958-8.98 0-16.688-2.986-23.122-8.958-6.434-6.097-9.651-13.314-9.651-21.652zm62.933 57.301v176.2h-59.716v-176.2c0 0.001 59.716 0.001 59.716 0.001" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default InfoIcon;

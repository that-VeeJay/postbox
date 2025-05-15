interface SpinnerProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  speed?: number;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 30,
  color = "#000",
  strokeWidth = 5,
  speed = 2,
}) => {
  const viewBox = `0 0 ${size} ${size}`;
  const radius = size * 0.35;

  return (
    <svg viewBox={viewBox} width={size} height={size}>
      {/* Radial gradient for the animated stroke */}
      <radialGradient
        id="spinnerGradient"
        cx="0.66"
        fx="0.66"
        cy="0.3125"
        fy="0.3125"
        gradientTransform="scale(1.5)"
      >
        <stop offset="0" stopColor={color} />
        <stop offset="0.3" stopColor={color} stopOpacity="0.9" />
        <stop offset="0.6" stopColor={color} stopOpacity="0.6" />
        <stop offset="0.8" stopColor={color} stopOpacity="0.3" />
        <stop offset="1" stopColor={color} stopOpacity="0" />
      </radialGradient>

      {/* Animated circle (rotating) */}
      <circle
        transform-origin="center"
        fill="none"
        stroke="url(#spinnerGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${radius * 2.86} ${radius * 14.3}`}
        strokeDashoffset="0"
        cx={size / 2}
        cy={size / 2}
        r={radius}
      >
        <animateTransform
          type="rotate"
          attributeName="transform"
          calcMode="spline"
          dur={`${speed}s`}
          values="360;0"
          keyTimes="0;1"
          keySplines="0 0 1 1"
          repeatCount="indefinite"
        />
      </circle>

      {/* Static background circle */}
      <circle
        transform-origin="center"
        fill="none"
        opacity="0.2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />
    </svg>
  );
};

export default Spinner;

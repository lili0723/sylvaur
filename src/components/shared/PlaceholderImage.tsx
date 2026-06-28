interface PlaceholderImageProps {
  width?: number;
  height?: number;
  label?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export default function PlaceholderImage({
  width = 800,
  height = 600,
  label = "Product Image",
  bgColor = "#F4EDE4",
  textColor = "#1A3C5E",
  className = "",
}: PlaceholderImageProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto ${className}`}
      role="img"
      aria-label={label}
    >
      <rect width={width} height={height} fill={bgColor} />
      <rect
        x={width * 0.1}
        y={height * 0.1}
        width={width * 0.8}
        height={height * 0.8}
        fill="none"
        stroke={textColor}
        strokeWidth="1"
        strokeDasharray="8,4"
        opacity="0.3"
        rx="8"
      />
      <text
        x={width / 2}
        y={height / 2 - 12}
        textAnchor="middle"
        fill={textColor}
        fontSize="16"
        fontFamily="Arial, sans-serif"
        opacity="0.6"
      >
        {label}
      </text>
      <text
        x={width / 2}
        y={height / 2 + 16}
        textAnchor="middle"
        fill={textColor}
        fontSize="12"
        fontFamily="Arial, sans-serif"
        opacity="0.4"
      >
        {width} × {height}
      </text>
    </svg>
  );
}

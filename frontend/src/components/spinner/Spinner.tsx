interface SpinnerProps {
  size?: number;
  color?: string;
  thickness?: string;
  className?: string;
}

export function Spinner({
  size = 24,
  color = "border-t-black",
  thickness = "border-4",
  className = "",
}: SpinnerProps) {
  return (
    <div
      className={`rounded-full border-gray-300 ${color} ${thickness} animate-spin ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

// Reusable "giraffe-spot" texture band, lifted from the packaging print.
// Use as a thin horizontal strip between sections — not as a full backdrop.

export default function SpottedPattern({
  id,
  bg,
  spot,
  height = 56,
  className = '',
}: {
  id: string
  bg: string
  spot: string
  height?: number
  className?: string
}) {
  return (
    <svg
      viewBox={`0 0 1600 ${height}`}
      preserveAspectRatio="none"
      className={`w-full block ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="110" height={height} patternUnits="userSpaceOnUse">
          <rect width="110" height={height} fill={bg} />
          <path
            d={`M14 ${height * 0.28}
                c9 -12 26 -11 29 3
                c3 12 -9 22 -21 19
                c-11 -3 -16 -14 -8 -22 Z`}
            fill={spot}
          />
          <path
            d={`M52 ${height * 0.7}
                c7 -8 19 -6 20 4
                c1 9 -8 15 -16 12
                c-7 -2 -10 -10 -4 -16 Z`}
            fill={spot}
            transform={`rotate(18 62 ${height * 0.7})`}
          />
          <path
            d={`M88 ${height * 0.22}
                c6 -6 15 -3 15 5
                c0 8 -9 11 -14 6
                c-3 -3 -3 -8 -1 -11 Z`}
            fill={spot}
          />
        </pattern>
      </defs>
      <rect width="1600" height={height} fill={`url(#${id})`} />
    </svg>
  )
}

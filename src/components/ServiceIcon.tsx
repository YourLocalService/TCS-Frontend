const paths: Record<string, string> = {
  mounting: "M3 12L12 4l9 8M6 11v8h12v-8",
  thermal: "M9 3v10a3 3 0 106 0V3M9 3h6M8 8h8",
  "hydro-isolation": "M12 3c3 4 6 7.5 6 11a6 6 0 11-12 0c0-3.5 3-7 6-11z",
  remont: "M14 3l7 7-2 2-7-7 2-2zM3 21l6-2 8-8-4-4-8 8-2 6z",
  dismantling: "M4 21h16M6 21V9l6-4 6 4v12M9 21v-6h6v6",
  "landscaping-and-interlocking": "M12 3v6m0 0c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5zm0 0c2-1 3-3 3-5",
  deck: "M3 10h18M3 14h18M3 18h18M7 10v8m10-8v8",
  walls: "M3 20V10l4-3v13M11 20V7l4-3v16M19 20V4",
  gazebo: "M12 2l9 5-2 2H5L3 7l9-5zM5 9v11m14-11v11M5 20h14",
  side: "M4 4h16v16H4V4zm0 5.33h16M4 14.67h16M12 4v5.33m-4 5.34v5.33m8-5.33v5.33",
};

export default function ServiceIcon({
  slug,
  className = "h-8 w-8",
}: {
  slug: string;
  className?: string;
}) {
  const d = paths[slug] ?? paths.remont;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

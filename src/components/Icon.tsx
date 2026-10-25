// Small inline stroke icon set so the site has no icon dependency.
const PATHS: Record<string, JSX.Element> = {
  check: <path d="M5 12l5 5L20 7" />,
  box: (
    <>
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v10l9 4 9-4V7" />
    </>
  ),
  arrowDown: <path d="M12 4v16M6 14l6 6 6-6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
  cart: (
    <>
      <path d="M6 6h15l-1.5 8h-12z" />
      <path d="M6 6L5 3H2" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
  shop: (
    <>
      <path d="M3 10l2-5h14l2 5" />
      <path d="M3 10a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0" />
      <path d="M5 12v8h14v-8" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  screen: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M8 8l4 4-2 3 3 2" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="7" width="16" height="10" rx="2" />
      <path d="M19 10h2v4h-2" />
      <path d="M6 10v4" />
    </>
  ),
  bolt: <path d="M13 2L5 13h6l-1 9 8-11h-6z" />,
  camera: (
    <>
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  chat: <path d="M4 4h16v12H8l-4 4z" />,
  refresh: (
    <>
      <path d="M4 12a8 8 0 0114-5" />
      <path d="M18 3v4h-4" />
      <path d="M20 12a8 8 0 01-14 5" />
      <path d="M6 21v-4h4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4M12 16h.01" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  className,
}: {
  name: keyof typeof PATHS;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

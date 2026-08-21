/**
 * Small hand-rolled icon set, stroke-based, 24x24 viewBox, sized via
 * className on the call site (e.g. "w-4 h-4"). Kept dependency-free
 * rather than pulling in an icon library for a handful of glyphs.
 */

const defaultProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function IconPin({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconBed({ className = "w-5 h-5" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 18v2M21 18v2M3 12V8a2 2 0 012-2h4v6" />
    </svg>
  );
}

export function IconHeart({ className = "w-5 h-5" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

export function IconTruck({ className = "w-5 h-5" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M3 16V7a1 1 0 011-1h9v10M3 16h10M3 16v1a1 1 0 001 1h1M13 16h4l4-4v-2a1 1 0 00-1-1h-7v7z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

export function IconCard({ className = "w-5 h-5" }) {
  return (
    <svg {...defaultProps} className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 9.5h19" />
    </svg>
  );
}

export function IconWifi({ className = "w-5 h-5" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M2 8.5a16 16 0 0 1 20 0" />
      <path d="M5.5 12a11 11 0 0 1 13 0" />
      <path d="M9 15.5a6 6 0 0 1 6 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconClock({ className = "w-5 h-5" }) {
  return (
    <svg {...defaultProps} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconParking({ className = "w-5 h-5" }) {
  return (
    <svg {...defaultProps} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 16V8h3.5a2.5 2.5 0 0 1 0 5H9" />
    </svg>
  );
}

export function IconShower({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M4 12h16M7 12V6a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3M9 16v1M12 16v2M15 16v1" />
    </svg>
  );
}

export function IconTv({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function IconCoffee({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M4 9h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M7 3.5c-.5.7-.5 1.3 0 2M10.5 3.5c-.5.7-.5 1.3 0 2" />
    </svg>
  );
}

export function IconDesk({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M3 8h18M5 8v11M19 8v11M3 15h6" />
    </svg>
  );
}

export function IconWater({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
    </svg>
  );
}

export function IconUsers({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M16 8.5a3 3 0 1 1 0-6" />
      <path d="M17.5 14.3c2.5.5 4 2.5 4 5.7" />
    </svg>
  );
}

export function IconStar({ className = "w-4 h-4", filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5z" />
    </svg>
  );
}

export function IconPhone({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M4.5 3.5h3.4l1.6 4.3-2 1.6a12 12 0 0 0 5.1 5.1l1.6-2 4.3 1.6v3.4a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3 5.1a1.5 1.5 0 0 1 1.5-1.6z" />
    </svg>
  );
}

export function IconGrid({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function IconCalendar({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconList({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

export function IconLogout({ className = "w-4 h-4" }) {
  return (
    <svg {...defaultProps} className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}
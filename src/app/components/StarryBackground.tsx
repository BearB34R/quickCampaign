import { Stars, Moon } from "./SVG";

export function StarryBackground() {
  // Create multiple rows of decorative elements
  const rows = Array.from({ length: 4 }, (_, i) => (
    <div key={i} className="relative h-screen w-full">
      <div
        className={`absolute ${i % 2 === 0 ? "left-20" : "left-32"} glow-star top-20 h-16 w-16 rotate-12 transform opacity-60`}
      >
        <Stars />
      </div>
      <div
        className={`absolute ${i % 2 === 0 ? "right-40" : "right-40"} glow-star bottom-20 h-12 w-12 -rotate-12 transform opacity-70`}
      >
        <Stars />
      </div>
      <div
        className={`absolute ${i % 2 === 0 ? "left-24" : "left-40"} glow-star bottom-20 h-8 w-8 opacity-30`}
      >
        <Stars />
      </div>
      <div
        className={`absolute ${i % 2 === 0 ? "right-16" : "right-24"} glow-moon top-16 h-48 w-48 opacity-80`}
      >
        <Moon />
      </div>
    </div>
  ));

  return <div className="pointer-events-none fixed inset-0">{rows}</div>;
}

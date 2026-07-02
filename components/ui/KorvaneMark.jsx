import { cn } from "@/lib/utils";

/**
 * The Korvane logo mark. Token-filled (foreground) so it inherits the theme.
 * Shared by the navbar and the LiveAIBox so they use the exact same icon.
 */
export default function KorvaneMark({ className, width = 30 }) {
  return (
    <svg
      width={width}
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-[rgb(var(--color-foreground))]", className)}
      aria-hidden="true"
    >
      <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
      <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
    </svg>
  );
}

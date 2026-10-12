import Link from "next/link";
import type { CSSProperties, ElementType } from "react";

/** Kašnjenje animacije otkrivanja, u sekundama. */
export const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/** Naslov čiji redovi izlaze iz maske, jedan za drugim. */
export function Heading({
  lines,
  as: Tag = "h2",
  className,
  start = 0,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  start?: number;
}) {
  return (
    <Tag className={className ? `heading ${className}` : "heading"}>
      {lines.map((line, i) => (
        <span className="line" key={line}>
          <span style={{ "--i": i, "--d": `${start}s` } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Strelica „napred“; na arapskom (RTL) se automatski okreće (vidi globals.scss). */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `arrow ${className}` : "arrow"}
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 6h20.5M15.5 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Link sa strelicom. Interne putanje (/…) idu kroz next/link, ostalo kao običan <a>. */
export function TextLink({
  href,
  label,
  className,
  style,
  external,
}: {
  href: string;
  label: string;
  className?: string;
  style?: CSSProperties;
  external?: boolean;
}) {
  const props = { className: className ? `text-link ${className}` : "text-link", style };
  const content = (
    <>
      <bdi>{label}</bdi>
      <Arrow />
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} {...props} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
    </a>
  );
}

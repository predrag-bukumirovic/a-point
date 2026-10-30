import Link from "next/link";
import type { CSSProperties, ElementType } from "react";

export const delay = (seconds: number) =>
  ({ "--d": `${seconds}s` }) as CSSProperties;

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
          {i > 0 && " "}
          <span style={{ "--i": i, "--d": `${start}s` } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Strelica „napred“. */
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
      <path
        d="M0 6h20.5M15.5 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Plus uz linkove („Read more +“); pri prelazu mišem se okrene (globals.scss). */
export function Plus({
  className,
  size = 11,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/** Link sa plusom. Interne putanje (/…) idu kroz next/link, ostalo kao običan <a>. */
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
  const props = {
    className: className ? `text-link ${className}` : "text-link",
    style,
  };
  const content = (
    <>
      <span>{label}</span>
      <Plus />
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
    <a
      href={href}
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

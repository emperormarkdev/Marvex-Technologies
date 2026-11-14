import Image from "next/image";
import { clients } from "@/data/content";

export default function TrustBar() {
  const row = [...clients, ...clients];
  return (
    <section
      className="border-b border-line bg-surface py-11"
      aria-label="Companies we keep"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center font-display text-sm font-semibold tracking-[-0.025em] text-ink">
          Companies we keep
        </p>
        <div className="marquee-mask mt-7 overflow-clip">
          <div className="animate-marquee flex w-max items-center gap-16 pr-16">
            {row.map((c, i) => (
              <Image
                key={`${c.name}-${i}`}
                src={c.file}
                alt={c.name}
                width={140}
                height={40}
                className="pointer-events-none h-8 w-auto shrink-0 select-none object-contain sm:h-9"
                aria-hidden={i >= clients.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

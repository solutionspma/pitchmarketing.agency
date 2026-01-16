// components/PageSection.tsx
import React from "react";

type PageSectionProps = {
  title: string;
  kicker?: string;
  children: React.ReactNode;
};

export default function PageSection({
  title,
  kicker,
  children,
}: PageSectionProps) {
  return (
    <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-sm shadow-black/40">
      <div className="mb-4">
        {kicker && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-400">
            {kicker}
          </p>
        )}
        <h2 className="mt-1 text-lg font-semibold text-slate-50">
          {title}
        </h2>
      </div>
      <div className="text-sm leading-relaxed text-slate-300">{children}</div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";

export default function EfficiencyCalculator() {
  const [teamSize, setTeamSize] = useState(15);
  const [weeklyManualHours, setWeeklyManualHours] = useState(6);

  const weeklyRecovered = Math.round(teamSize * weeklyManualHours * 0.6);
  const monthlyRecovered = Math.round(weeklyRecovered * 4.33);
  const annualRecovered = Math.round(weeklyRecovered * 52);
  const workdaysSaved = Math.round(annualRecovered / 8);

  return (
    <section
      className="cv-auto border-t border-line bg-surface py-20 lg:py-28"
      aria-label="Manual work savings calculator"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow>Time savings</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
              See what manual work costs your team each year.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
              Estimate the hours recovered by automating spreadsheets, manual
              reporting, and repetitive approvals.
            </p>

            <div className="mt-8 space-y-6 rounded-2xl border border-line bg-surface-card p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="calc-team" className="font-medium text-ink">
                    Staff doing manual tasks
                  </label>
                  <span className="font-display font-semibold text-brand-dark">
                    {teamSize} people
                  </span>
                </div>
                <input
                  id="calc-team"
                  type="range"
                  min={3}
                  max={150}
                  step={1}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="mt-3 w-full cursor-pointer accent-brand"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="calc-hours" className="font-medium text-ink">
                    Manual hours per person / week
                  </label>
                  <span className="font-display font-semibold text-brand-dark">
                    {weeklyManualHours} hrs
                  </span>
                </div>
                <input
                  id="calc-hours"
                  type="range"
                  min={2}
                  max={20}
                  step={1}
                  value={weeklyManualHours}
                  onChange={(e) => setWeeklyManualHours(Number(e.target.value))}
                  className="mt-3 w-full cursor-pointer accent-brand"
                />
              </div>
            </div>
          </div>

          <div className="dark-bento rounded-2xl p-8 text-white sm:p-10">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs text-neutral-400">Hours / month</p>
                <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
                  {monthlyRecovered.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Hours / year</p>
                <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-brand">
                  {annualRecovered.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Workdays / year</p>
                <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
                  {workdaysSaved.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-neutral-800 pt-7">
              <Link
                href="/scope?preset=automation"
                className="group btn-press inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
              >
                Scope this automation
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

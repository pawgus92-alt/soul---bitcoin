import { useEffect } from "react";

import { useHierarchyCopy } from "@/lib/hierarchy-copy";
import {
  councilSeats,
  custodesSeats,
  hierarchyRemaining,
  useHierarchySupply,
} from "@/lib/hierarchy-supply";
import { useHash } from "@/lib/hash";
import { useI18n } from "@/lib/i18n";
import { maskAddress, useOwners } from "@/lib/owners";
import {
  BTC_COLLECTION,
  HIERARCHY_RANKS,
  POWER_BRANCHES,
  SCALA_STEPS,
  remainingLine,
  type HierarchyRankId,
  type PowerBranchId,
  type ScalaStepId,
} from "@/lib/sins";

function amountLine(amount: number, asset: string) {
  const digits = amount < 1 ? 3 : amount % 1 === 0 ? 0 : 2;
  return `${amount.toFixed(digits)} ${asset}`;
}

function HierarchyDiagram() {
  const copy = useHierarchyCopy();
  const { locale } = useI18n();
  useHierarchySupply();
  const council = councilSeats();
  const keepers = custodesSeats();

  return (
    <nav aria-label={copy.diagramKicker} className="ms-reveal mx-auto w-full max-w-xl">
      <p className="ms-kicker text-center">{copy.diagramKicker}</p>
      <ol className="mt-6 flex flex-col items-stretch">
        {HIERARCHY_RANKS.map((rank, index) => {
          const rankCopy = copy.ranks[rank.id];
          const extra =
            rank.id === "consilium"
              ? copy.occupied(council.occupied, council.max)
              : rank.id === "custodes"
                ? copy.occupied(keepers.occupied, keepers.max)
                : rank.sellable
                  ? ""
                  : copy.notSold;
          return (
            <li key={rank.id} className="flex flex-col items-stretch">
              {index > 0 ? <div className="ms-stem" /> : null}
              <a href={rank.hash} className="ms-node px-5 py-4 text-center">
                <p className="ms-latin text-[10px] tracking-[0.28em] text-[var(--ms-brass)]">
                  {rank.latin}
                </p>
                <p className="font-heading mt-1 text-2xl text-[var(--ms-parchment)]">
                  {rankCopy.name}
                </p>
                <p className="mt-1 text-sm text-[var(--ms-parchment)]/70">
                  {rankCopy.charge}
                </p>
                {extra ? (
                  <p className="ms-latin mt-2 text-[10px] tracking-[0.14em] text-[var(--ms-brass)]">
                    {extra}
                  </p>
                ) : null}
              </a>
            </li>
          );
        })}
        <li className="flex flex-col items-stretch">
          <div className="ms-stem" />
          <div className="grid gap-2 sm:grid-cols-5">
            {SCALA_STEPS.map((step) => {
              const stock = hierarchyRemaining(step.id);
              return (
                <a
                  key={step.id}
                  href={step.hash}
                  className="ms-node px-2 py-3 text-center"
                >
                  <p className="ms-latin text-[10px] tracking-[0.2em] text-[var(--ms-brass)]">
                    {step.roman} · {step.latin}
                  </p>
                  <p className="mt-2 font-heading text-lg">
                    {copy.steps[step.id].name}
                  </p>
                  <p className="ms-latin mt-1 text-[10px] text-[var(--ms-parchment)]/55">
                    {remainingLine(stock.remaining, stock.max, locale)}
                  </p>
                </a>
              );
            })}
          </div>
        </li>
      </ol>
    </nav>
  );
}

function RankArticle({ id }: { id: Exclude<HierarchyRankId, "scala"> }) {
  const copy = useHierarchyCopy();
  const rank = HIERARCHY_RANKS.find((item) => item.id === id);
  if (!rank) return null;
  const text = copy.ranks[id];
  const council = councilSeats();
  const keepers = custodesSeats();
  const seated =
    id === "consilium"
      ? copy.occupied(council.occupied, council.max)
      : id === "custodes"
        ? copy.occupied(keepers.occupied, keepers.max)
        : null;

  return (
    <article id={rank.hash.slice(1)} className="ms-reveal border border-[var(--ms-gold)]/40 bg-black/25 p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="ms-latin text-[10px] tracking-[0.28em] text-[var(--ms-brass)]">
            {rank.latin}
            {rank.sin ? ` · ${rank.sin}` : ""}
          </p>
          <h3 className="font-heading mt-2 text-3xl md:text-4xl">{text.name}</h3>
          <p className="mt-2 text-sm tracking-wide text-[var(--ms-parchment)]/70">
            {text.charge}
          </p>
        </div>
        {id === "summus" ? <div className="ms-seal" aria-hidden /> : null}
      </div>
      <p className="mt-5 max-w-2xl text-[17px] leading-8">{text.body}</p>
      {seated ? (
        <p className="ms-latin mt-4 text-[11px] tracking-[0.16em] text-[var(--ms-brass)]">
          {seated}
        </p>
      ) : (
        <p className="ms-latin mt-4 text-[11px] tracking-[0.16em] text-[var(--ms-brass)]">
          {copy.notSold}
        </p>
      )}
    </article>
  );
}

function PowerBranch({ type }: { type: PowerBranchId }) {
  const copy = useHierarchyCopy();
  const { locale } = useI18n();
  const branch = POWER_BRANCHES.find((item) => item.id === type);
  if (!branch) return null;
  const text = copy.branches[type];
  const stock = hierarchyRemaining(type);

  return (
    <article
      id={branch.hash.slice(1)}
      className="ms-reveal flex flex-col border border-[var(--ms-gold)]/40 bg-black/20 p-6 md:p-8"
    >
      <p className="ms-latin text-[10px] tracking-[0.28em] text-[var(--ms-brass)]">
        {branch.latin} · {branch.sin}
      </p>
      <h3 className="font-heading mt-2 text-3xl">{text.name}</h3>
      <p className="mt-2 text-sm text-[var(--ms-brass)]">{text.manifestation}</p>
      <p className="mt-4 flex-1 text-[17px] leading-8">{text.body}</p>
      <blockquote className="mt-6 border-l border-[var(--ms-brass)] pl-4">
        <p className="italic leading-7">“{text.quote}”</p>
        <footer className="ms-latin mt-2 text-[10px] tracking-[0.18em] text-[var(--ms-brass)]">
          {text.quoteBy}
        </footer>
      </blockquote>
      <p className="mt-6 text-sm leading-7 text-[var(--ms-parchment)]/75">{text.entrance}</p>
      <p className="ms-latin mt-4 text-[11px] tracking-[0.14em] text-[var(--ms-brass)]">
        {amountLine(branch.amount, branch.asset)} × {branch.max} ·{" "}
        {remainingLine(stock.remaining, stock.max, locale)}
      </p>
    </article>
  );
}

function StepCard({ stepId }: { stepId: ScalaStepId }) {
  const copy = useHierarchyCopy();
  const { locale } = useI18n();
  const step = SCALA_STEPS.find((item) => item.id === stepId);
  if (!step) return null;
  const text = copy.steps[stepId];
  const stock = hierarchyRemaining(stepId);

  return (
    <article
      id={step.hash.slice(1)}
      className="ms-reveal border border-[var(--ms-gold)]/35 bg-[#100c08] p-5 md:p-6"
    >
      <p className="ms-latin text-[10px] tracking-[0.26em] text-[var(--ms-brass)]">
        {step.roman} · {step.latin} · {step.sin}
      </p>
      <h3 className="font-heading mt-2 text-3xl">{text.name}</h3>
      <p className="mt-1 text-sm text-[var(--ms-brass)]">{text.sinName}</p>
      <p className="mt-3 text-sm tracking-wide text-[var(--ms-parchment)]/80">
        {text.manifestation}
      </p>
      <p className="mt-4 text-[17px] leading-8">{text.body}</p>
      <blockquote className="mt-5 border-l border-[var(--ms-gold)] pl-4">
        <p className="italic leading-7">“{text.quote}”</p>
        <footer className="ms-latin mt-2 text-[10px] tracking-[0.16em] text-[var(--ms-brass)]">
          {text.quoteBy}
        </footer>
      </blockquote>
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-heading text-2xl text-[var(--ms-brass)]">
          {amountLine(step.amount, step.asset)} × {step.max}
        </p>
        <p className="ms-latin text-[11px] tracking-[0.12em] text-[var(--ms-parchment)]/60">
          {step.buyable
            ? remainingLine(stock.remaining, stock.max, locale)
            : copy.recorded}
        </p>
      </div>
      {!step.buyable ? (
        <p className="ms-latin mt-2 text-[10px] tracking-[0.14em] text-[var(--ms-brass)]">
          {remainingLine(stock.remaining, stock.max, locale)}
        </p>
      ) : null}
    </article>
  );
}

function PathOfSeeker() {
  const copy = useHierarchyCopy();
  return (
    <section id="h-path" className="ms-reveal space-y-8">
      <div>
        <p className="ms-kicker">{copy.pathKicker}</p>
        <h2 className="font-heading mt-2 text-4xl md:text-5xl">{copy.pathHeading}</h2>
      </div>
      <article id="h-ordeal" className="border border-[var(--ms-gold)]/35 p-6 md:p-8">
        <p className="ms-latin text-[10px] tracking-[0.22em] text-[var(--ms-brass)]">
          {copy.gateILatin}
        </p>
        <h3 className="font-heading mt-2 text-3xl">{copy.gateITitle}</h3>
        <div className="mt-4 space-y-3 text-[17px] leading-8">
          {copy.gateIBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
      <article className="border border-[var(--ms-gold)]/35 p-6 md:p-8">
        <p className="ms-latin text-[10px] tracking-[0.22em] text-[var(--ms-brass)]">
          {copy.gateIILatin}
        </p>
        <h3 className="font-heading mt-2 text-3xl">{copy.gateIITitle}</h3>
        <p className="mt-4 text-[17px] leading-8">{copy.gateIIBody}</p>
        <ol className="mt-5 list-decimal space-y-2 pl-5 text-[17px] leading-8">
          {copy.gateIIChoices.map((choice) => (
            <li key={choice}>{choice}</li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-[var(--ms-parchment)]/70">{copy.gateIIRefuse}</p>
      </article>
      <article id="h-clavis" className="border border-[var(--ms-gold)]/35 p-6 md:p-8">
        <p className="ms-latin text-[10px] tracking-[0.22em] text-[var(--ms-brass)]">
          {copy.gateIIILatin}
        </p>
        <h3 className="font-heading mt-2 text-3xl">{copy.gateIIITitle}</h3>
        <div className="mt-4 space-y-3 text-[17px] leading-8">
          {copy.gateIIIBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </section>
  );
}

function rankOfOwner(level: string, kind: string): string {
  const hay = `${level} ${kind}`.toLowerCase();
  if (hay.includes("888") || hay.includes("lucky") || hay.includes("seal")) return "seal";
  if (hay.includes("1 btc") || hay.includes("bitcoin desk") || kind === "buy") return "key";
  if (hay.includes("0.088") || hay.includes("shadow") || hay.includes("umbra")) return "umbra";
  if (hay.includes("0.88") || hay.includes("seeker") || hay.includes("petitor")) return "petitor";
  if (hay.includes("purgans")) return "purgans";
  if (hay.includes("imago")) return "imago";
  if (hay.includes("illuminatus")) return "illuminatus";
  return "";
}

function HierarchyOwners() {
  const copy = useHierarchyCopy();
  const owners = useOwners();
  const groups: Array<{ id: string; label: string; latin: string }> = [
    { id: "seal", label: copy.branches.seal.name, latin: "SIGILLA" },
    { id: "key", label: copy.branches.key.name, latin: "CLAVES" },
    ...SCALA_STEPS.map((step) => ({
      id: step.id,
      label: copy.steps[step.id].name,
      latin: step.latin,
    })),
  ];

  return (
    <section id="h-wall" className="ms-reveal">
      <p className="ms-kicker">{copy.wallKicker}</p>
      <h2 className="font-heading mt-2 text-4xl">{copy.wallHeading}</h2>
      <p className="mt-4 max-w-2xl text-[17px] leading-8 text-[var(--ms-parchment)]/75">
        {copy.wallBody}
      </p>
      <div className="mt-8 space-y-8">
        {groups.map((group) => {
          const rows = owners.filter((row) => rankOfOwner(row.level, row.kind) === group.id);
          return (
            <div key={group.id} className="border-t border-[var(--ms-gold)]/30 pt-4">
              <p className="ms-latin text-[10px] tracking-[0.22em] text-[var(--ms-brass)]">
                {group.latin}
              </p>
              <h3 className="font-heading mt-1 text-2xl">{group.label}</h3>
              {rows.length === 0 ? (
                <p className="mt-2 text-sm text-[var(--ms-parchment)]/50">{copy.unclaimed}</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {rows.map((row) => (
                    <li
                      key={`${row.address}-${row.kind}`}
                      className="flex flex-wrap items-baseline justify-between gap-2"
                    >
                      <span className="font-heading text-lg">{row.alias}</span>
                      <span className="ms-latin text-[11px] text-[var(--ms-parchment)]/55">
                        {maskAddress(row.address)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function HierarchyPage() {
  const copy = useHierarchyCopy();
  const hash = useHash();
  useHierarchySupply();

  useEffect(() => {
    const id = (hash || "#hierarchy").replace("#", "") || "hierarchy";
    const node = document.getElementById(id);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hash]);

  return (
    <main id="hierarchy" className="manuscript flex-1">
      <div className="mx-auto w-full max-w-5xl px-5 py-14 md:py-20">
        <header className="ms-reveal text-center">
          <p className="ms-kicker">{copy.kicker}</p>
          <h1 className="font-heading mt-4 text-4xl leading-tight md:text-6xl">
            {copy.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-heading text-xl leading-8 text-[var(--ms-brass)] md:text-2xl">
            {copy.formula}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-8 text-[var(--ms-parchment)]/75">
            {copy.formulaSecond}
          </p>
          <div className="ms-rule mx-auto mt-10 max-w-md" />
          <p className="mt-6">
            <a href="#top" className="ms-latin text-[11px] tracking-[0.18em] text-[var(--ms-brass)]">
              {copy.returnDesk}
            </a>
          </p>
        </header>

        <div className="mt-16">
          <HierarchyDiagram />
        </div>

        <div className="mt-16 space-y-5">
          <RankArticle id="summus" />
          <RankArticle id="curator" />
          <RankArticle id="consilium" />
          <RankArticle id="custodes" />
        </div>

        <section className="mt-20">
          <p className="ms-kicker">{copy.powerKicker}</p>
          <h2 className="font-heading mt-2 text-4xl md:text-5xl">{copy.powerHeading}</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-8">{copy.powerSymmetry}</p>
          <p className="mt-4 max-w-2xl text-[17px] leading-8 text-[var(--ms-parchment)]/75">
            {copy.succession}
          </p>
          <p className="ms-latin mt-4 text-[11px] tracking-[0.12em] text-[var(--ms-brass)]">
            {copy.btcCanon} · {BTC_COLLECTION.total}
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <PowerBranch type="seal" />
            <PowerBranch type="key" />
          </div>
        </section>

        <section id="h-scala" className="mt-20">
          <p className="ms-kicker">{copy.scalaKicker}</p>
          <h2 className="font-heading mt-2 text-4xl md:text-5xl">{copy.scalaHeading}</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-8">{copy.scalaLogic}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {SCALA_STEPS.map((step) => (
              <StepCard key={step.id} stepId={step.id} />
            ))}
          </div>
        </section>

        <div className="mt-20">
          <PathOfSeeker />
        </div>

        <div className="mt-20">
          <HierarchyOwners />
        </div>

        <section id="h-apocryphon" className="ms-reveal mt-20 border border-[var(--ms-gold)]/40 bg-black/30 p-6 md:p-10">
          <p className="ms-kicker">{copy.apocryphonKicker}</p>
          <h2 className="font-heading mt-2 text-4xl">{copy.apocryphonHeading}</h2>
          <blockquote className="mt-6">
            <p className="font-heading text-2xl leading-9 italic md:text-3xl">
              “{copy.apocryphonQuote}”
            </p>
            <footer className="ms-latin mt-3 text-[11px] tracking-[0.18em] text-[var(--ms-brass)]">
              {copy.apocryphonBy}
            </footer>
          </blockquote>
          <p className="mt-6 max-w-2xl text-[17px] leading-8">{copy.apocryphonBody}</p>
        </section>

        <section id="h-why" className="ms-reveal mt-16">
          <p className="ms-kicker">{copy.whyKicker}</p>
          <h2 className="font-heading mt-2 text-4xl">{copy.whyHeading}</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-8">{copy.whyBody}</p>
        </section>

        <section id="h-faq" className="ms-reveal mt-16">
          <p className="ms-kicker">{copy.faqKicker}</p>
          <h2 className="font-heading mt-2 text-4xl">{copy.faqHeading}</h2>
          <dl className="mt-8 divide-y divide-[var(--ms-gold)]/25 border-y border-[var(--ms-gold)]/25">
            {copy.faq.map((item) => (
              <div key={item.q} className="grid gap-2 py-5 md:grid-cols-[minmax(0,0.9fr)_1.1fr]">
                <dt className="font-heading text-xl">{item.q}</dt>
                <dd className="text-[17px] leading-8 text-[var(--ms-parchment)]/80">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="h-diary" className="ms-reveal mt-16 pb-8">
          <p className="ms-kicker">{copy.diaryKicker}</p>
          <h2 className="font-heading mt-2 text-4xl">{copy.diaryHeading}</h2>
          <ol className="mt-8 space-y-6 border-l border-[var(--ms-gold)]/40 pl-6">
            {copy.diary.map((entry, index) => (
              <li key={`${entry.date}-${index}`}>
                <p className="ms-latin text-[10px] tracking-[0.2em] text-[var(--ms-brass)]">
                  {entry.date}
                </p>
                <p className="mt-1 text-[17px] leading-8">{entry.body}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}

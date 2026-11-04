import { FormEvent, useMemo, useState } from "react";

import { SoulCertificate } from "@/components/soul-certificate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isGateAnswer, useHouseCopy } from "@/lib/house-copy";
import { useI18n } from "@/lib/i18n";
import {
  isInnerCabinet,
  maskAddress,
  ownersForAddress,
  useOwners,
  type OwnerEntry,
} from "@/lib/owners";

const GATE_KEY = "maison-gates-open";
const MIRROR_KEY = "maison-mirror-address";

function kickerClass(locale: string) {
  return locale === "en"
    ? "text-[11px] tracking-[0.28em] text-primary/80 uppercase"
    : "text-[11px] tracking-[0.16em] text-primary/80 uppercase";
}

function readStored(key: string) {
  if (typeof window === "undefined") return "";
  return window.sessionStorage.getItem(key) || "";
}

async function requestWalletAddress() {
  const eth = window.ethereum as
    | { request: (args: { method: string }) => Promise<string[]> }
    | undefined;
  if (eth?.request) {
    const accounts = await eth.request({ method: "eth_requestAccounts" });
    if (accounts?.[0]) return accounts[0];
  }
  const sol = (
    window as Window & {
      solana?: { connect: () => Promise<{ publicKey: { toString(): string } }> };
    }
  ).solana;
  if (sol?.connect) {
    const session = await sol.connect();
    const key = session?.publicKey?.toString();
    if (key) return key;
  }
  throw new Error("no-wallet");
}

export function HouseNav() {
  const house = useHouseCopy();
  return (
    <>
      <a href="#manifest" className="hover:text-primary">
        {house.navManifest}
      </a>
      <a href="#hierarchy" className="hover:text-primary">
        {house.navHierarchy}
      </a>
      <a href="#marketplace" className="hover:text-primary">
        {house.navMarket}
      </a>
      <a href="#curator" className="hover:text-primary">
        {house.navCurator}
      </a>
      <a href="#wall" className="hover:text-primary">
        {house.navWall}
      </a>
      <a href="#mirror" className="hover:text-primary">
        {house.navMirrors}
      </a>
      <a href="#gates" className="hover:text-primary">
        {house.navGates}
      </a>
    </>
  );
}

export function ManifestSection() {
  const { locale } = useI18n();
  const house = useHouseCopy();
  const kicker = kickerClass(locale);
  return (
    <section id="manifest" className="border-b border-primary/10 bg-black/20">
      <div className="mx-auto w-full max-w-6xl px-5 py-16">
        <p className={kicker}>{house.manifestKicker}</p>
        <h2 className="font-heading mt-2 max-w-3xl text-4xl sm:text-5xl">
          {house.manifestHeading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {house.manifesto.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-sm leading-7 text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CuratorSection() {
  const { locale } = useI18n();
  const house = useHouseCopy();
  const kicker = kickerClass(locale);
  return (
    <section id="curator" className="mx-auto w-full max-w-6xl px-5 py-16">
      <p className={kicker}>{house.curatorKicker}</p>
      <h2 className="font-heading mt-2 max-w-2xl text-4xl sm:text-5xl">
        {house.curatorHeading}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
        {house.curatorIntro}
      </p>
      <ol className="mt-10 space-y-8 border-l border-primary/20 pl-6">
        {house.diary.map((entry) => (
          <li key={entry.date} className="relative">
            <span className="absolute -left-[29px] mt-1.5 size-2 rounded-full bg-primary" />
            <p className="font-mono text-[11px] tracking-[0.18em] text-primary/80">
              {entry.date}
            </p>
            <h3 className="font-heading mt-1 text-2xl">{entry.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {entry.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function OwnersWall() {
  const { locale } = useI18n();
  const house = useHouseCopy();
  const kicker = kickerClass(locale);
  const owners = useOwners();
  return (
    <section id="wall" className="border-y border-primary/10 bg-black/15">
      <div className="mx-auto w-full max-w-6xl px-5 py-16">
        <p className={kicker}>{house.wallKicker}</p>
        <h2 className="font-heading mt-2 max-w-2xl text-4xl sm:text-5xl">
          {house.wallHeading}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
          {house.wallBody}
        </p>
        {owners.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">{house.wallEmpty}</p>
        ) : (
          <ul className="mt-10 divide-y divide-primary/10 border border-primary/15">
            {owners.map((row) => (
              <li
                key={`${row.address}-${row.kind}-${row.acquiredAt}`}
                className="grid gap-2 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <p className="font-heading text-lg">{row.alias || house.wallAnonymous}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {maskAddress(row.address)}
                  </p>
                </div>
                <p className="text-[11px] tracking-[0.14em] text-primary uppercase">
                  {house.wallLevel} · {row.level}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function MirrorRoom() {
  const { locale } = useI18n();
  const house = useHouseCopy();
  const kicker = kickerClass(locale);
  const [typed, setTyped] = useState("");
  const [address, setAddress] = useState(() => readStored(MIRROR_KEY));
  const [error, setError] = useState("");
  const holdings = useMemo(
    () => (address ? ownersForAddress(address) : []),
    [address],
  );
  const open = holdings.length > 0;
  const inner = isInnerCabinet(holdings);
  const primary = holdings[0] as OwnerEntry | undefined;

  function admit(value: string) {
    const found = ownersForAddress(value);
    if (!found.length) {
      setError(house.mirrorsFail);
      setAddress("");
      sessionStorage.removeItem(MIRROR_KEY);
      return;
    }
    setError("");
    setAddress(value);
    sessionStorage.setItem(MIRROR_KEY, value);
  }

  async function connect() {
    setError("");
    try {
      const wallet = await requestWalletAddress();
      admit(wallet);
    } catch (reason) {
      setError(
        reason instanceof Error && reason.message === "no-wallet"
          ? house.mirrorsNoWallet
          : house.mirrorsFail,
      );
    }
  }

  function onPaste(event: FormEvent) {
    event.preventDefault();
    admit(typed.trim());
  }

  return (
    <section id="mirrors" className="mx-auto w-full max-w-6xl px-5 py-16">
      <p className={kicker}>{house.mirrorsKicker}</p>
      <h2 className="font-heading mt-2 max-w-2xl text-4xl sm:text-5xl">
        {house.mirrorsHeading}
      </h2>
      {!open ? (
        <div className="mt-8 max-w-xl space-y-4 border border-primary/20 bg-black/30 p-6">
          <p className="text-sm leading-6 text-muted-foreground">
            {house.mirrorsLocked}
          </p>
          <p className="text-sm leading-6 text-primary/80">{house.mirrorsHint}</p>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => void connect()}>
              {house.mirrorsConnect}
            </Button>
          </div>
          <form onSubmit={onPaste} className="space-y-3">
            <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              {house.mirrorsPaste}
            </p>
            <Input
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              className="h-10 font-mono text-xs"
              autoComplete="off"
            />
            <Button type="submit" variant="outline">
              {house.mirrorsOpen}
            </Button>
          </form>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="max-w-2xl text-sm leading-6 text-primary">
              {house.mirrorsWelcome(
                primary?.alias || house.wallAnonymous,
                primary?.level || "",
              )}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setAddress("");
                sessionStorage.removeItem(MIRROR_KEY);
              }}
            >
              {house.mirrorsDisconnect}
            </Button>
          </div>
          <div>
            <p className={kicker}>{house.bookKicker}</p>
            <h3 className="font-heading mt-2 text-3xl">{house.bookHeading}</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {house.fragments.map((fragment) => (
                <article
                  key={fragment.latin}
                  className="border border-primary/15 bg-card/60 p-5"
                >
                  <p className="text-[11px] tracking-[0.2em] text-primary/80 uppercase">
                    {fragment.latin}
                  </p>
                  <h4 className="font-heading mt-1 text-2xl">{fragment.title}</h4>
                  <p className="mt-2 text-sm italic leading-6 text-muted-foreground">
                    {fragment.line}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <p className={kicker}>{house.notesKicker}</p>
            <h3 className="font-heading mt-2 text-3xl">{house.notesHeading}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              {house.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="border border-primary/25 bg-black/40 p-6">
            <p className={kicker}>{house.leakKicker}</p>
            <h3 className="font-heading mt-2 text-3xl">{house.leakHeading}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {house.leakBody}
            </p>
            <p className="mt-3 font-mono text-[11px] text-primary">{house.leakClock}</p>
          </div>
          {inner ? (
            <div className="border border-primary/40 bg-primary/5 p-6">
              <h3 className="font-heading text-3xl">{house.innerHeading}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {house.innerBody}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}

export function GateRiddle() {
  const { locale } = useI18n();
  const house = useHouseCopy();
  const kicker = kickerClass(locale);
  const [answer, setAnswer] = useState("");
  const [open, setOpen] = useState(() => readStored(GATE_KEY) === "1");
  const [wrong, setWrong] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (isGateAnswer(answer)) {
      sessionStorage.setItem(GATE_KEY, "1");
      setOpen(true);
      setWrong(false);
      window.location.hash = "#invitation";
      return;
    }
    setWrong(true);
  }

  return (
    <section id="gates" className="border-y border-primary/10 bg-black/25">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[minmax(0,0.9fr)_1.1fr] lg:items-center">
        <div className="overflow-hidden border border-primary/20">
          <img
            src="/certificates/plate-gate.jpg"
            alt=""
            className="mx-auto h-[36rem] w-full object-cover object-center"
          />
        </div>
        <div>
          <p className={kicker}>{house.gatesKicker}</p>
          <h2 className="font-heading mt-2 text-4xl sm:text-5xl">
            {house.gatesHeading}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            {house.gatesRiddle}
          </p>
          <p className="mt-2 text-[11px] tracking-[0.16em] text-primary/80 uppercase">
            {house.gatesHint}
          </p>
          <form onSubmit={submit} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              className="h-11"
              autoComplete="off"
            />
            <Button type="submit" className="h-11 px-6">
              {house.gatesSubmit}
            </Button>
          </form>
          {wrong && !open ? (
            <p className="mt-3 text-sm text-destructive">{house.gatesWrong}</p>
          ) : null}
          {open ? (
            <p className="mt-3 text-sm text-primary">{house.gatesOpen}</p>
          ) : null}
        </div>
      </div>
      {open ? (
        <div id="invitation" className="border-t border-primary/15 bg-black/40">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_minmax(0,20rem)] lg:items-center">
            <div>
              <p className={kicker}>{house.inviteKicker}</p>
              <h3 className="font-heading mt-2 text-4xl">{house.inviteHeading}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                {house.inviteBody}
              </p>
              <p className="mt-6 text-[11px] tracking-[0.16em] text-primary/80 uppercase">
                {house.inviteFoot}
              </p>
            </div>
            <SoulCertificate
              compact
              kind="eth"
              holder="Knyaz Pustoy"
              serial="AE-1666-E88-F00D1E5C0FFE"
              digest="e88f00d1e5c0ffe9876543210aabbccddeeff00112233445566778899aabb"
              btcAmount="0.08800000 ETH"
              issuedAt={new Date("1666-06-06T16:06:00Z")}
              receiveAddress="0x2222222222222222222222222222222222222222"
              nftChain="ethereum"
              edition={1}
              editionMax={1}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

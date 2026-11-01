"use client";

import { useState } from "react";
import { Bitcoin, Check, Copy, LoaderCircle, ScrollText } from "lucide-react";

import { FakeQr } from "@/components/fake-qr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BTC_ADDRESS, DEAL_BTC, DEAL_USD } from "@/lib/deal";

type Step = "invoice" | "settling" | "done";

function formatUsd(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BitcoinPayDialog({
  triggerClassName,
  triggerLabel = "Оплатить в Bitcoin",
}: {
  triggerClassName?: string;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("invoice");
  const [name, setName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState("");

  function reset() {
    setStep("invoice");
    setName("");
    setAccepted(false);
    setCopied(false);
    setError(null);
    setCertificate("");
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(BTC_ADDRESS);
      setCopied(true);
      setError(null);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Буфер обмена отказал. Перепишите адрес от руки — как в хороших семьях.");
    }
  }

  function settle() {
    if (!accepted) {
      setError("Поставьте галочку. Душа не уходит по устному поручению.");
      return;
    }
    setError(null);
    setStep("settling");
    window.setTimeout(() => {
      const stamp = Math.floor(Date.now() / 1000)
        .toString(16)
        .slice(-6)
        .toUpperCase();
      setCertificate(`AE-1666-${stamp}`);
      setStep("done");
    }, 1600);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger
        render={
          <Button
            size="lg"
            className={triggerClassName}
          />
        }
      >
        <Bitcoin data-icon="inline-start" />
        {triggerLabel}
      </DialogTrigger>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border border-primary/25 bg-[#14110d] sm:max-w-lg"
        showCloseButton
      >
        {step === "invoice" ? (
          <>
            <DialogHeader>
              <Badge variant="outline" className="w-fit border-primary/40 text-primary">
                Ceremonial invoice
              </Badge>
              <DialogTitle className="font-heading text-2xl font-semibold tracking-wide">
                Оплата в Bitcoin
              </DialogTitle>
              <DialogDescription>
                Сто тысяч долларов фиксируем как {DEAL_BTC} BTC. Курс вечный.
                Настоящих монет мы не принимаем: это театр для тех, кто уже всё купил.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
              <FakeQr seed={BTC_ADDRESS} className="mx-auto w-40 sm:w-full" />
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                    Сумма
                  </p>
                  <p className="font-heading text-3xl text-primary">
                    {formatUsd(DEAL_USD)}
                  </p>
                  <p className="font-mono text-sm text-muted-foreground">
                    {DEAL_BTC} BTC · settlement only
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                    Адрес (демо)
                  </p>
                  <div className="flex items-start gap-2">
                    <code className="block flex-1 break-all rounded-md border border-primary/20 bg-black/40 px-2 py-2 font-mono text-[11px] leading-relaxed text-primary">
                      {BTC_ADDRESS}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyAddress}
                      aria-label="Скопировать адрес"
                    >
                      {copied ? <Check /> : <Copy />}
                    </Button>
                  </div>
                  {copied ? (
                    <p className="mt-1 text-xs text-primary">Скопировано в карман смокинга.</p>
                  ) : null}
                </div>
              </div>
            </div>

            <label className="grid gap-1.5">
              <span className="text-[11px] tracking-[0.22em] text-primary/80 uppercase">
                Как вас записать в книге
              </span>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Аноним / family office / яхта «Елена»"
                className="h-10 bg-black/30"
              />
            </label>

            <label className="flex items-start gap-3 rounded-md border border-primary/15 bg-black/20 p-3 text-sm leading-relaxed">
              <Checkbox
                checked={accepted}
                onCheckedChange={(value) => {
                  setAccepted(value === true);
                  if (value === true) setError(null);
                }}
                className="mt-0.5"
              />
              <span>
                Понимаю: душа уходит без права выкупа. Раскаяние — отдельный продукт
                от $2.4M, и его всё равно не будет в наличии.
              </span>
            </label>

            {error ? (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <DialogFooter className="border-primary/10 bg-transparent">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Ещё поживу
              </Button>
              <Button onClick={settle}>
                Подтвердить перевод
              </Button>
            </DialogFooter>
          </>
        ) : null}

        {step === "settling" ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 py-10 text-center">
            <LoaderCircle className="size-8 animate-spin text-primary" />
            <DialogTitle className="font-heading text-2xl">
              Сверяем мемпул с вечностью
            </DialogTitle>
            <DialogDescription>
              Ваш хеш ещё тёплый. Не закрывайте вкладку — совесть уже в пути.
            </DialogDescription>
          </div>
        ) : null}

        {step === "done" ? (
          <div className="space-y-4 py-2">
            <DialogHeader className="items-center text-center">
              <ScrollText className="size-8 text-primary" />
              <DialogTitle className="font-heading text-2xl">
                Добро пожаловать в портфель
              </DialogTitle>
              <DialogDescription>
                {name.trim() || "Аноним"}, сделка закрыта по цене {formatUsd(DEAL_USD)}.
                Вы легче ровно на одну душу и тяжелее на ноль сатоши: это была церемония.
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-md border border-primary/25 bg-black/30 px-4 py-5 text-center">
              <p className="text-[11px] tracking-[0.28em] text-primary/80 uppercase">
                Certificate of vacancy
              </p>
              <p className="font-heading mt-2 text-3xl text-primary">{certificate}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Храните номер рядом с офшорными бумагами. На таможне не показывают.
              </p>
            </div>
            <DialogFooter className="border-primary/10 bg-transparent sm:justify-center">
              <Button onClick={() => setOpen(false)}>Вернуться в свет</Button>
            </DialogFooter>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

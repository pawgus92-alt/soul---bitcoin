import { BitcoinPayDialog } from "@/components/bitcoin-pay-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CITIES, KEEP, LEDGER, TAKE, TESTIMONIALS } from "@/lib/deal";

function formatUsd() {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(100_000);
}

export default function App() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b border-primary/15 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <a href="#top" className="min-w-0">
            <p className="font-heading text-lg tracking-[0.28em] text-primary uppercase">
              Maison Æternum
            </p>
            <p className="truncate text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              Private Soul Desk · Est. 1666
            </p>
          </a>
          <nav className="hidden items-center gap-6 text-[11px] tracking-[0.2em] text-muted-foreground uppercase md:flex">
            <a href="#terms" className="hover:text-primary">
              Условия
            </a>
            <a href="#inventory" className="hover:text-primary">
              Что остаётся
            </a>
            <a href="#clients" className="hover:text-primary">
              Клиенты
            </a>
            <a href="#contract" className="hover:text-primary">
              Контракт
            </a>
          </nav>
          <BitcoinPayDialog
            triggerLabel="Bitcoin"
            triggerClassName="hidden sm:inline-flex"
          />
        </div>
      </header>

      <div className="overflow-hidden border-b border-primary/10 bg-black/20">
        <div className="ticker-track flex w-max gap-10 py-2 pr-10 text-[11px] tracking-[0.18em] text-primary/80 uppercase">
          {[...LEDGER, ...LEDGER].map((row, i) => (
            <span key={`${row.city}-${i}`} className="flex items-center gap-3">
              <span className="text-muted-foreground">{row.city}</span>
              <span>{row.client}</span>
              <span className="font-mono normal-case">{row.amount}</span>
              <span aria-hidden className="text-primary/40">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>

      <main id="top" className="flex-1">
        <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div className="space-y-7">
            <Badge variant="outline" className="border-primary/40 text-primary">
              By invitation, then by invoice
            </Badge>
            <p className="text-[11px] tracking-[0.32em] text-primary/80 uppercase">
              {CITIES.join(" · ")}
            </p>
            <h1 className="font-heading max-w-xl text-5xl leading-[0.95] font-semibold text-balance sm:text-6xl md:text-7xl">
              Продайте душу.
              <span className="block text-primary">Сохраните яхту.</span>
            </h1>
            <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              Фиксированная цена для тех, кому совесть уже мешает в портфеле.
              Мы не торгуемся, не берём процент и не задаём, зачем вам стало
              легче дышать после совета директоров.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <BitcoinPayDialog
                triggerClassName="h-12 px-6 text-base"
                triggerLabel="Оплатить в Bitcoin"
              />
              <a
                href="#terms"
                className="inline-flex h-12 items-center justify-center border border-primary/25 px-5 text-sm tracking-[0.16em] text-primary uppercase hover:bg-primary/10"
              >
                Читать условия
              </a>
            </div>
            <p className="max-w-md text-xs leading-5 text-muted-foreground">
              Банковский перевод оставлен для людей, которые ещё верят в
              государства. Наличные пахнут моралью. Bitcoin — единственный
              приличный язык в этой комнате.
            </p>
          </div>

          <Card className="self-start border-primary/20 bg-card/80 ring-primary/10">
            <CardHeader className="border-b border-primary/10">
              <p className="text-[11px] tracking-[0.28em] text-primary/80 uppercase">
                The only SKU
              </p>
              <CardTitle className="font-heading text-4xl font-semibold text-primary sm:text-5xl">
                {formatUsd()}
              </CardTitle>
              <p className="font-mono text-sm text-muted-foreground">
                1.00000000 BTC · курс фиксирован на вечность
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                <li>Одна душа. Без рассрочки и без семейного пакета.</li>
                <li>Минимальный чек — сто тысяч. Это не цена. Это фильтр.</li>
                <li>Возврат не предусмотрен. Раскаяние — платная опция.</li>
                <li>НДС нет: у вечности нет юрисдикции.</li>
              </ul>
              <Separator className="bg-primary/15" />
              <p className="text-xs leading-5 text-muted-foreground">
                Мы не покупаем души среднего класса. Если вам нужно посчитать,
                хватит ли ста тысяч, вам ещё рано. Приходите после первого
                фонда.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="terms" className="border-y border-primary/10 bg-black/20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Назначьте себя",
                text: "Имя, family office или борт. Анонимность сохраняем так же тщательно, как ваши офшоры.",
              },
              {
                step: "02",
                title: "Оплатите в Bitcoin",
                text: "Один перевод, один хеш, одна вечность. Курс круглый, чтобы ваш бухгалтер не страдал лишний раз.",
              },
              {
                step: "03",
                title: "Получите вакансию внутри",
                text: "Сертификат пустоты. Носите его рядом с паспортом второго гражданства.",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <p className="font-mono text-xs tracking-[0.24em] text-primary">
                  {item.step}
                </p>
                <h2 className="font-heading text-3xl">{item.title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="inventory"
          className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-16 md:grid-cols-2"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <p className="text-[11px] tracking-[0.24em] text-primary/80 uppercase">
                Assets retained
              </p>
              <CardTitle className="font-heading text-3xl">Что остаётся вам</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {KEEP.map((item) => (
                <div key={item.title}>
                  <h3 className="font-heading text-xl">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader>
              <p className="text-[11px] tracking-[0.24em] text-primary/80 uppercase">
                Assets acquired
              </p>
              <CardTitle className="font-heading text-3xl">Что забираем мы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {TAKE.map((item) => (
                <div key={item.title}>
                  <h3 className="font-heading text-xl">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="clients" className="border-y border-primary/10 bg-black/15">
          <div className="mx-auto w-full max-w-6xl px-5 py-16">
            <p className="text-[11px] tracking-[0.28em] text-primary/80 uppercase">
              Quiet references
            </p>
            <h2 className="font-heading mt-2 max-w-xl text-4xl sm:text-5xl">
              Клиенты, которых нельзя называть вслух
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((item) => (
                <blockquote
                  key={item.role}
                  className="flex flex-col justify-between border border-primary/15 bg-card/70 p-6"
                >
                  <p className="font-heading text-xl leading-8">
                    “{item.quote}”
                  </p>
                  <footer className="mt-6 text-sm text-muted-foreground">
                    <span className="text-primary">{item.name}</span>
                    <span className="mt-0.5 block">{item.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="contract" className="mx-auto w-full max-w-6xl px-5 py-16">
          <div className="grid gap-10 border border-primary/20 bg-card/60 p-6 md:grid-cols-[1fr_auto] md:p-10">
            <div className="space-y-4">
              <p className="text-[11px] tracking-[0.28em] text-primary/80 uppercase">
                Closing
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl">
                Контракт на одну вечность
              </h2>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                Нажимая кнопку, вы не покупаете спасение. Вы продаёте единственную
                вещь, которую нельзя показать гостям на яхте. Мы берём её за сто
                тысяч, потому что больше — vulgar, меньше — несерьёзно.
              </p>
              <p className="max-w-xl text-xs leading-5 text-muted-foreground">
                Это сатирический стол. Реальных биткоинов, душ и оферт дьявола
                здесь нет. Если вы искали настоящий ад, он обычно начинается с
                семейного офиса и плохого юриста.
              </p>
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <BitcoinPayDialog
                triggerClassName="h-12 px-6 text-base"
                triggerLabel="Оплатить в Bitcoin"
              />
              <p className="max-w-xs text-xs text-muted-foreground">
                Счёт церемониальный. Адрес кошелька — бутафория. Пустота настоящая
                только если вы сами её принесёте.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Maison Æternum · Private Acquisition Desk · Est. 1666</p>
          <p>Не является офертой. Не является религией. Является плохим вкусом высокого полёта.</p>
        </div>
      </footer>
    </div>
  );
}

import { useI18n, type Locale } from "@/lib/i18n";

const OPTIONS: Locale[] = ["en", "ru", "zh"];

export function LanguageSwitcher() {
  const { locale, copy, setLocale } = useI18n();
  const label = (option: Locale) =>
    option === "en" ? copy.langEn : option === "ru" ? copy.langRu : copy.langZh;

  return (
    <div
      role="group"
      aria-label={copy.langSwitch}
      className="flex shrink-0 overflow-hidden border border-primary/30 text-[10px] tracking-[0.14em] uppercase"
    >
      {OPTIONS.map((option) => {
        const active = locale === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            aria-pressed={active}
            className={
              active
                ? "bg-primary px-2 py-1.5 font-medium text-primary-foreground"
                : "bg-transparent px-2 py-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }
          >
            {label(option)}
          </button>
        );
      })}
    </div>
  );
}

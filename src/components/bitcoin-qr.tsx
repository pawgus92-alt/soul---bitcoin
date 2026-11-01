import { useEffect, useState } from "react";
import QRCode from "qrcode";

import { cn } from "@/lib/utils";

export function BitcoinQr({
  payload,
  className,
}: {
  payload: string;
  className?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    QRCode.toDataURL(payload, {
      width: 320,
      margin: 1,
      color: {
        dark: "#d4b56a",
        light: "#0f0c09",
      },
    })
      .then((url) => {
        if (!cancelled) setSrc(url);
      })
      .catch(() => {
        if (!cancelled) {
          setSrc(null);
          setFailed(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [payload]);

  if (failed) {
    return (
      <div
        className={cn(
          "flex aspect-square items-center justify-center border border-destructive/40 bg-black/40 p-3 text-center text-xs text-destructive",
          className,
        )}
      >
        QR failed. Use the address.
      </div>
    );
  }

  if (!src) {
    return (
      <div
        className={cn(
          "aspect-square animate-pulse border border-primary/20 bg-black/40",
          className,
        )}
      />
    );
  }

  return (
    <img
      src={src}
      alt="Bitcoin payment QR code"
      className={cn("aspect-square w-full border border-primary/20 bg-black", className)}
    />
  );
}

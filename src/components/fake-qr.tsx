import { cn } from "@/lib/utils";

function cellsFromSeed(seed: string, size = 21) {
  const cells: boolean[] = [];
  let n = 0;
  for (let i = 0; i < seed.length; i += 1) {
    n = (n * 33 + seed.charCodeAt(i)) >>> 0;
  }
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const finder =
        (x < 7 && y < 7) ||
        (x > size - 8 && y < 7) ||
        (x < 7 && y > size - 8);
      if (finder) {
        const edge = x === 0 || y === 0 || x === 6 || y === 6 ||
          x === size - 1 || y === size - 1 ||
          x === size - 7 || y === size - 7 ||
          (x > size - 8 && (x === size - 7 || y === 0 || y === 6)) ||
          (y > size - 8 && (y === size - 7 || x === 0 || x === 6));
        const inner =
          (x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
          (x >= size - 5 && x <= size - 3 && y >= 2 && y <= 4) ||
          (x >= 2 && x <= 4 && y >= size - 5 && y <= size - 3);
        cells.push(edge || inner);
        continue;
      }
      n = (n * 1664525 + 1013904223) >>> 0;
      cells.push(n % 3 !== 0);
    }
  }
  return cells;
}

export function FakeQr({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const size = 21;
  const cells = cellsFromSeed(seed, size);

  return (
    <div
      aria-hidden
      className={cn(
        "grid aspect-square w-full gap-px bg-primary/20 p-2",
        className
      )}
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {cells.map((on, i) => (
        <span
          key={i}
          className={on ? "bg-primary" : "bg-background"}
        />
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";

import {
  CONSILIUM_SEATS,
  CUSTODES_SEATS,
  POWER_BRANCHES,
  SCALA_STEPS,
  type PowerBranchId,
  type ScalaStepId,
} from "@/lib/sins";

const STORAGE_KEY = "maison-hierarchy-ledger";

export type HierarchyLedger = Record<ScalaStepId | PowerBranchId, number>;

function empty(): HierarchyLedger {
  return {
    umbra: 0,
    petitor: 0,
    purgans: 0,
    imago: 0,
    illuminatus: 0,
    seal: 0,
    key: 0,
  };
}

function read(): HierarchyLedger {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<HierarchyLedger>;
    const next = empty();
    for (const step of SCALA_STEPS) {
      next[step.id] = Math.min(Number(parsed[step.id]) || 0, step.max);
    }
    for (const branch of POWER_BRANCHES) {
      next[branch.id] = Math.min(Number(parsed[branch.id]) || 0, branch.max);
    }
    return next;
  } catch {
    return empty();
  }
}

const listeners = new Set<() => void>();

export function hierarchyRemaining(id: ScalaStepId | PowerBranchId) {
  const ledger = read();
  const spec =
    SCALA_STEPS.find((step) => step.id === id) ||
    POWER_BRANCHES.find((branch) => branch.id === id);
  const max = spec?.max ?? 0;
  const issued = ledger[id] ?? 0;
  return { issued, max, remaining: Math.max(0, max - issued) };
}

export function councilSeats() {
  const keys = read().key;
  return {
    occupied: Math.min(keys, CONSILIUM_SEATS),
    max: CONSILIUM_SEATS,
  };
}

export function custodesSeats() {
  const keys = read().key;
  return {
    occupied: Math.min(Math.max(0, keys - CONSILIUM_SEATS), CUSTODES_SEATS),
    max: CUSTODES_SEATS,
  };
}

export function subscribeHierarchy(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useHierarchySupply() {
  const [ledger, setLedger] = useState<HierarchyLedger>(empty);
  useEffect(() => {
    const refresh = () => setLedger(read());
    refresh();
    return subscribeHierarchy(refresh);
  }, []);
  return ledger;
}

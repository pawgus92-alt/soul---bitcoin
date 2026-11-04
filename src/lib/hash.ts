import { useEffect, useState } from "react";

import { isHierarchyHash } from "@/lib/sins";

function readLocation() {
  if (typeof window === "undefined") {
    return { hash: "", path: "/" };
  }
  return {
    hash: window.location.hash,
    path: window.location.pathname.replace(/\/+$/, "") || "/",
  };
}

export function useHash() {
  const [hash, setHash] = useState(() => readLocation().hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

export function isHierarchyPath(path: string) {
  return (
    path === "/hierarchy" ||
    path === "/cn/hierarchy" ||
    path.endsWith("/hierarchy") ||
    path === "/collection" ||
    path.endsWith("/collection")
  );
}

export type DeskView = "desk" | "hierarchy" | "marketplace" | "mirror";

export function isMarketplaceHash(hash: string) {
  return hash === "#marketplace" || hash.startsWith("#marketplace/");
}

export function listingIdFromHash(hash: string) {
  const match = hash.match(/^#marketplace\/([a-z0-9-]+)/i);
  return match?.[1] ?? "";
}

export function isMirrorHash(hash: string) {
  return hash === "#mirror";
}

export function isMarketplacePath(path: string) {
  return path === "/marketplace" || path.endsWith("/marketplace") || path.includes("/marketplace/");
}

export function isMirrorPath(path: string) {
  return path === "/mirror" || path.endsWith("/mirror");
}

export function useDeskView(): DeskView {
  const hash = useHash();
  const [path, setPath] = useState(() => readLocation().path);
  useEffect(() => {
    const onChange = () => setPath(readLocation().path);
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);
  useEffect(() => {
    if (isHierarchyPath(path) && !window.location.hash) {
      window.history.replaceState(window.history.state, "", `${path}#hierarchy`);
    }
    if (isMarketplacePath(path) && !hash.startsWith("#marketplace")) {
      window.history.replaceState(window.history.state, "", `${path}#marketplace`);
    }
    if (isMirrorPath(path) && !isMirrorHash(hash)) {
      window.history.replaceState(window.history.state, "", `${path}#mirror`);
    }
  }, [path, hash]);
  if (isHierarchyHash(hash) || isHierarchyPath(path)) return "hierarchy";
  if (isMarketplaceHash(hash) || isMarketplacePath(path)) return "marketplace";
  if (isMirrorHash(hash) || isMirrorPath(path)) return "mirror";
  return "desk";
}

export function useHierarchyView() {
  return useDeskView() === "hierarchy";
}

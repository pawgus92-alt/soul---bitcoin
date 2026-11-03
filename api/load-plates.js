import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { CERTIFICATE_PLATES } from "./certificate-plates-data.js";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "plates");

function uri(name) {
  return `data:image/jpeg;base64,${readFileSync(join(DIR, name)).toString("base64")}`;
}

export function embeddedPlates() {
  return {
    ...CERTIFICATE_PLATES,
    "plate-888.jpg": uri("plate-888.jpg"),
    "plate-btc.jpg": uri("plate-btc.jpg"),
    "plate-eth-last.jpg": uri("plate-eth-last.jpg"),
    "plate-eth-shadow.jpg": uri("plate-eth-shadow.jpg"),
    "plate-laptop.jpg": uri("plate-laptop.jpg"),
    "plate-seeker.jpg": uri("plate-seeker.jpg"),
  };
}

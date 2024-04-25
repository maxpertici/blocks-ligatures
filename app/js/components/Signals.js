import { signal } from "@preact/signals-react";

import LocalStorage from "./LocalStorage.js";

const storage = new LocalStorage();

const ManagerIsActive = signal(storage.getManagerIsActive());

export { ManagerIsActive };
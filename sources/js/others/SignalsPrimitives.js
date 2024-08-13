import { signal } from "@preact/signals-react";
import { useSelect, useDispatch } from "@wordpress/data";

import LocalStorage from "./LocalStorage.js";

const storage = new LocalStorage();

const ManagerIsActive = signal(storage.getManagerIsActive());

const LigaturesCollection = signal(window.blocksLigatures.collection);

const LigaturesScope = signal([]);

const blocksCapacities = signal({});

const hardRefresh = signal(0);

export {
  ManagerIsActive,
  LigaturesCollection,
  LigaturesScope,
  blocksCapacities,
  hardRefresh
};

export default class LocalStorage {
  constructor() {}

  getManagerIsActive() {
    return window.localStorage.getItem("blocksLigatures__manager__isActive") ===
      null
      ? "false"
      : window.localStorage.getItem("blocksLigatures__manager__isActive");
  }

  setManagerIsActive(state) {
    window.localStorage.setItem("blocksLigatures__manager__isActive", state);
  }
}
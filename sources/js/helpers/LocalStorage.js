export default class LocalStorage {

  constructor() {}

  getManagerIsActive() {
    let IsActiveString =
      window.localStorage.getItem("blocksLigatures__manager__isActive") === null
        ? "false"
        : window.localStorage.getItem("blocksLigatures__manager__isActive");
    return IsActiveString === "true" ? true : false;
  }

  setManagerIsActive(state) {
    let IsActiveString = true === state ? "true" : "false";
    window.localStorage.setItem(
      "blocksLigatures__manager__isActive",
      IsActiveString
    );
  }
}
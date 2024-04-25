import "./hooks/registerBlockType.js";
import "./hooks/blockEdit.js";

import domReady from "@wordpress/dom-ready";
import { App } from "./components/App.js";

import { waitingDependencies, waitingElement } from "./components/Utils.js";

domReady(async () => {
  // Waiting the right moment
  await waitingElement(".popover-slot");
  await waitingDependencies(["React", "ReactDOM"]);

  // Create App Root
  const appDiv = document.createElement("div");
  appDiv.id = "blocks-ligatures-app-root";

  const popoverSlot = document.querySelector(".popover-slot");
  const AppRoot = popoverSlot.parentNode.insertBefore(appDiv, popoverSlot);

  const React = window.React;

  let RootApp = null;

  // createRoot for React 18+
  if (18 <= parseInt(React.version.split(".")[0])) {
    const { createRoot } = window.ReactDOM;
    const root = createRoot(AppRoot);
    root.render(React.createElement(App));
    RootApp = document.querySelector("#blocks-ligatures-app-root");
  } else {
    ReactDOM.render(React.createElement(App), AppRoot);
    RootApp = document.querySelector("#blocks-ligatures-app-root");
  }

});

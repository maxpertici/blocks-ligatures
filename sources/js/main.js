import "./hooks/registerBlockType.js";
import "./hooks/blockEdit.js";

import domReady from "@wordpress/dom-ready";
import { App } from "./components/App.js";
import { Toggle } from "./components/Toggle.js"
import "../sass/main.scss";

import { waitingDependencies, waitingElement } from "./functions/waiting.js";
import Editor from './helpers/Editor.js';
import { createRoot } from "react-dom/client";

domReady(async () => {

  // Waiting js dependencies
  await waitingDependencies( [ "React", "ReactDOM" ] );
  const React = window.React ;

  // App
  // Waiting the right moment
  await waitingElement(".popover-slot");
  
  // Create App Root
  const appDiv = document.createElement("div");
  appDiv.id = "blocks-ligatures-app-root";

  const popoverSlot = document.querySelector(".popover-slot");
  const AppRoot = popoverSlot.parentNode.insertBefore(appDiv, popoverSlot);

  let RootApp = null;

  // createRoot for React 18+
  if (18 <= parseInt(React.version.split(".")[0])) {

    const root = createRoot(AppRoot);
    root.render(React.createElement(App));
    RootApp = document.querySelector("#blocks-ligatures-app-root");
  } else {
    window.ReactDOM.render(React.createElement(App), AppRoot);
    RootApp = document.querySelector("#blocks-ligatures-app-root");
  }

  // Toggle
  // Waiting the right moment
  await waitingElement(".editor-document-tools__left");
  
  // Create Toggle Root
  const toggleDiv = document.createElement("div");
  toggleDiv.id = "blocks-ligatures-toggle-root";

  const editPostCenter = document.querySelector('.editor-document-tools__left');
  const ToggleRoot = editPostCenter.appendChild(toggleDiv);

  let RootToggle = null;

  // createRoot for React 18+
  if (18 <= parseInt(React.version.split(".")[0])) {

    const root = createRoot(ToggleRoot);
    root.render(React.createElement(Toggle));
    RootToggle = document.querySelector("#blocks-ligatures-toggle-root");
  } else {
    window.ReactDOM.render(React.createElement(Toggle), ToggleRoot);
    RootToggle = document.querySelector("#blocks-ligatures-toggle-root");
  }

  // Save RootApp !
  let canvas = new Editor();
	canvas.keepChildAlive( '.editor-document-tools__left', ToggleRoot ) ;

});

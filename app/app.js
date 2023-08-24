
import domReady from '@wordpress/dom-ready';
import App from "./Components/App.js";

domReady( async () => {

	let app = new App() ;

	const editorIsReady = await app.verifyEditorMarkups() ;

	if( editorIsReady ){
		app.setup();
		app.addManager();
	}

} );
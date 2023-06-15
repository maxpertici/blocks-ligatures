
import domReady from '@wordpress/dom-ready';
import App from "./Library/App/App";

domReady( async () => {

	let app = new App() ;

	const editorIsReady = await app.verifyEditorMarkups() ;

	if( editorIsReady ){
		app.setupProperties();
		app.addManager();
	}

} );
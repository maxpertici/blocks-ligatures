
import { useBLStore } from "./Store.js";
import Debug from './Debug.js' ;

export default class Editor {

	constructor(){
		this.blocks = [] ;
	}

	/**
	 * getBodyNodes
	 * @returns {HTMLElement[]}
	 */
	getBodyNodes() {
		let bodyNodes = [];

		let main = this.domBody();

		bodyNodes.push(main);

		if (document.body !== main) {
		bodyNodes.push(document.body);
		}

		return bodyNodes;
	}

	/**
	 * getBody
	 * @returns {HTMLElement|null}
	 */
	getBody() {
		return this.domBody();
	}


	/**
   * domBody
   * @returns {null|HTMLElement}
   */
	domBody() {
		let body = null;
		let node = this.isPostEditorIframe()
			? document.querySelector('iframe[name="editor-canvas"]')
			: document.querySelector(".block-editor-writing-flow");

		if (node && this.isPostEditorIframe()) {
			body = node.contentWindow.document.body;
		}

		if (this.isSiteEditor()) {
			node = document.querySelector('iframe[name="editor-canvas"]');
			body = node.contentWindow.document.body;
		}

		if (node && !this.isPostEditorIframe() && !this.isSiteEditor()) {
			body = document.querySelector("body");
		}

		return ( ! body ) ? document.querySelector("body") : body ;
	}


	/**
	 * isPostEditorIframe
	 * @returns {boolean}
	 */
	isPostEditorIframe() {
		return document.querySelector(".block-editor-writing-flow") ? false : true;
	}


	/**
	 * isSiteEditor
	 * @returns {boolean}
	 */
	isSiteEditor() {
		return document.querySelector(".edit-site-visual-editor") ? true : false;
	}

	/**
	 * keepChildAlive
	 * Keep React Child Alive in the DOM, append it to parentNode
	 * @param parentSelector
	 * @param App
	 */
	keepChildAlive( parentSelector, App ){


		setInterval( () => {

			Debug( 'keepChildAlive' );

			let child = null ;
			let parent = document.querySelector( parentSelector ) ;

			if( parent ){
				child = parent.querySelector('#blocks-ligatures-app-root') ;
			}

			if( ! child ){
				parent.appendChild( App );
			}
		}, 1200 );

	}


	/**
	 * Retrieve the position of a block in the editor
	 * 
	 * @param {*} clientId 
	 * @returns 
	 */
	getBlockPosition( clientId ){

		const domBlock = this.domBody().querySelector( '#block-' + clientId )  ;

		if (domBlock) {
			return { "x" : domBlock.offsetLeft, "y" : domBlock.offsetTop } ;
		}

		return false ;
	}

	/**
	 * Bind Scroll Event to the blocks watch
	 */
	bindScreenForBlocksWatch(){

		Debug( "bindScreenForBlocksWatch" );

		const state = useBLStore.getState();
		
		Debug( { "editorHelperScreenIsRunning" : state.EditorHelperScreenIsRunning } );
		if( state.EditorHelperScreenIsRunning ){ return ; }

		const domBody = this.domBody() ;

		Debug( { "domBody" : domBody } );

		if( ! domBody ){ return ; }

		Debug( { "isPostEditorIframe" : this.isPostEditorIframe() } );

		let scrollRefDom = null ;

		if( this.isPostEditorIframe() ){
			const html = domBody.closest('html');
			if( html ){
				scrollRefDom = html.parentNode ;
			}
		}else{
			scrollRefDom = document.querySelector('.block-editor-writing-flow') ;
		}

		if( ! scrollRefDom ){ return ; }

		// @TODO : use the scrol value for Y translation, not for the position : => computed positions with this translation
		scrollRefDom.addEventListener( 'scroll', () => {
			const positions = this.getBlocksPositions();
			this.dispatchPositions( positions );
		});

		const resizeObserver = new ResizeObserver( () => {
			const positions = this.getBlocksPositions();
			this.dispatchPositions(positions);
		});

		resizeObserver.observe(domBody);

		state.setEditorHelperScreenIsRunning(true);
	}


	/**
	 * Dispatch the positions of the blocks from the editor into signals
	 * @param {*} positions 
	 */
	dispatchPositions( positions ){

		const state = useBLStore.getState();
		state.setBlocksPositions(positions);
	}

	/**
	 * Add a block to the watch list
	 * 
	 * @param {*} block 
	 */
	watchBlock( block ){

		const state = useBLStore.getState();
		
		let blocks = state.EditorHelperBlocks ;
		blocks.push( block ) ;
		state.setEditorHelperBlocks(blocks);
	}

	/**
	 * Retrieve the positions of all the blocks in the editor
	 * 
	 * @returns object[]
	 */
	getBlocksPositions(){

		let positions = {} ;
		let blockMissing = [] ;
		
		const state = useBLStore.getState();
		let blocks = state.EditorHelperBlocks ;

		blocks.forEach( clientId => {

			const result = this.getBlockPosition( clientId );
			// console.log( result );

			if( false != result ){
				positions[clientId] = result ;
			}else{
				blockMissing.push( clientId );
			}
		});

		// clean up the watch list
		state.setEditorHelperBlocks( blocks.filter( clientId => ! blockMissing.includes( clientId ) ) );

		return positions ;
	}

}

import { useBLStore } from "./Store.js";

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
	 * Retrieve the translation of a block in the editor
	 * 
	 * @param {*} clientId 
	 * @returns 
	 */
	getBlockScroll( clientId, scrollTop ){

		console.log( 'getBlockScroll : ' + clientId );

		const domBlock = this.domBody().querySelector( '#block-' + clientId )  ;

		console.log( 'domBlock : ' + domBlock );

		if (domBlock) {
			console.log( "scrollTop : " + scrollTop );
			return { "scrollTop" : scrollTop } ;
		}

		return null ;
	}



	/**
	 * Retrieve the position of a block in the editor
	 * 
	 * @param {*} clientId 
	 * @returns 
	 */
	getBlockPosition( clientId ){

		console.log( 'getBlockPosition : ' + clientId );

		const domBlock = this.domBody().querySelector( '#block-' + clientId )  ;

		console.log( 'domBlock : ' + domBlock );

		if (domBlock) {
			console.log( "x : " + domBlock.offsetLeft + ", y : " + domBlock.offsetTop );
			return { "x" : domBlock.offsetLeft, "y" : domBlock.offsetTop } ;
		}

		return null ;
	}



	/**
	 * Bind Scroll Event to the blocks watch
	 */
	bindScreenForBlocksWatch(){


		const state = useBLStore.getState();
		
		if( state.EditorScreenIsRunning ){ return ; }

		const domBody = this.domBody() ;


		if( ! domBody ){ return ; }


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

		// @TODO : use the scroll value for Y translation, not for the position : => computed positions with this translation
		scrollRefDom.addEventListener( 'scroll', (e) => handleScroll(e, scrollRefDom) );

		const handleScroll = (e, scrollRefDom) => {

			// https://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument
			// https://developer.mozilla.org/en-US/docs/Web/API/Document
			// scrollRefDom = HTMLDocument => Document
			const scrollElm = scrollRefDom.scrollingElement;
			const scrollTop = scrollElm.scrollTop;

			const scrolls = this.getBlocksScrolls( scrollTop );

			this.dispatchScrolls(scrolls);
		};

		const mutationObserver = new MutationObserver((mutationsList) => {
			console.log('mutationObserver');
		
			const positions = this.getBlocksPositions();
			this.dispatchPositions(positions);
		});
		
		mutationObserver.observe(domBody, { attributes: true, childList: true, subtree: true });

		/**
		 * Observe the title of the post editor
		 * used to retrieve the title box size and ajdust the block commands postions in the editor
		 */
		const rootSpacingTop = new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
					const rootContainer = domBody.querySelector('.is-root-container');
					const offsetTop = rootContainer.offsetTop;
		
					const postTitleWrapper = domBody.querySelector('.edit-post-visual-editor__post-title-wrapper');
					const marginTop = window.getComputedStyle(postTitleWrapper).marginTop;
		
					const computedMarginTop = parseInt(marginTop.replace('px', ''));
					const top = offsetTop + computedMarginTop;
		
					state.setEditorLayoutRootTop(top);
				}
			}
		});
		
		rootSpacingTop.observe(domBody, { attributes: true, childList: true, subtree: true });

		state.setEditorScreenIsRunning(true);

	}

	/**
	 * Dispatch the tranlsations of the blocks from the editor into signals
	 * @param {*} positions 
	 */
	dispatchScrolls( scrolls ){
		
		const state = useBLStore.getState();
		state.setBlocksScrolls(scrolls);
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
		
		let blocks = state.EditorBlocks ;
		
		if( ! blocks.includes( block ) ){
			blocks.push( block ) ;
		} 

		state.setEditorBlocks(blocks);
	}


	/**
	 * Retrieve the scrolls of all the blocks in the editor
	 * 
	 * @returns object[]
	 */
	getBlocksScrolls( scrollTop ){

		let scrolls = {} ;
		let blockMissing = [] ;
		
		const state = useBLStore.getState();
		let blocks = state.EditorBlocks ;

		// console.log( blocks );

		blocks.forEach( clientId => {

			const result = this.getBlockScroll( clientId, scrollTop );
			// console.log( result );

			if( false != result ){
				scrolls[clientId] = result ;
			}else{
				blockMissing.push( clientId );
			}
		});

		console.log( state.EditorBlocks );

		return scrolls ;
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
		let blocks = state.EditorBlocks ;

		// console.log( blocks );

		blocks.forEach( clientId => {

			const result = this.getBlockPosition( clientId );
			// console.log( result );

			if( false != result ){
				positions[clientId] = result ;
			}else{
				blockMissing.push( clientId );
			}
		});

		// on the first load, all clientId are reset, so if blockMissing is the same as blocks, force a new retrieve of the blocks clientId
		// so, trigger a refresh in order to force a new retrieve of the blocks clientId
		// if( blockMissing.length == blocks.length ){
		// 	const event = new Event('mxpBL__App__forceUpdate');
  		// 	window.dispatchEvent(event);
		// }


		// console.log(  blocks.filter( clientId => ! blockMissing.includes( clientId ) ) );

		// clean up the watch list
		// state.setEditorBlocks( blocks.filter( clientId => ! blockMissing.includes( clientId ) ) );
		console.log( state.EditorBlocks );

		return positions ;
	}

}

import '../Styles/App.scss' ;

import BlocksLigaturesManager from "./BlocksLigaturesManager.js";

// TODO : replace with gutenberg redux store
import DumbStore from './DumbStore.js'

import { dispatch } from '@wordpress/data';
import { store as interfaceStore } from '@wordpress/interface';

export default class App {

	constructor() {}

	setup(){

		this.toolBarElement      = document.querySelector('.edit-post-header-toolbar') ;

		this.isActive = false ;
		this.dispatchManagerActivation() ;
	}

	dispatchManagerActivation(){

		let isManagerActive = this.isManagerActiveFromCookie() ;
		this.isActive = isManagerActive ;

		dispatch( interfaceStore ).setFeatureDefaults(
			'maxpertici/blocksLigatures',
			{
				isManagerActive: isManagerActive,
			}
		);
	}

	toggleManagerActivation(){

		wp.data.dispatch( 'core/interface' ).toggleFeature( 'maxpertici/blocksLigatures', 'isActive' );

		let store = new DumbStore() ;
		let managerNode = store.getManagerNode() ;

		// save in cookie
		let isManagerActive = wp.data.select( 'core/interface' ).isFeatureActive( 'maxpertici/blocksLigatures', 'isActive' ) ;
		if( isManagerActive === true ){
			window.localStorage.setItem('blocksLigatures/Manager/isActive', 'false' );
			managerNode.classList.remove('blocks-ligatures-manager--active');
		}else{
			window.localStorage.setItem('blocksLigatures/Manager/isActive', 'true' );
			managerNode.classList.add('blocks-ligatures-manager--active');
		}
	}


	verifyEditorMarkups(){

		return new Promise(( resolve, reject ) => {

			const { subscribe, select } = wp.data ;

			const waitingEditor = subscribe( () => {

				let blockList = select('core/block-editor').getBlocks() ;
				// console.log(blockList);

				if( ( blockList.constructor === Array ) ){

					let toolbar = document.querySelector('.edit-post-header-toolbar') ;
					let editor  = document.querySelector('.edit-post-visual-editor') ;

					if( toolbar !== null && editor !== null ){ resolve(true ); }
				}
			});

		});
	}

	addButton(){

		const { __ } = wp.i18n ;

		let toogler = document.createElement("button");
		toogler.classList.add('blocks-ligatures-manager-toogler');

		this.toolBarElement.after( toogler );
		this.tooglerElement = document.querySelector('.blocks-ligatures-manager-toogler') ;
		this.tooglerElement.innerHTML = __( 'Ligatures', 'blocks-ligatures' ) ;

		this.tooglerElement.addEventListener('click', (e) => {
			e.preventDefault();
			this.toggleManager();
		} );
	}

	addManager(){

		// add button
		this.addButton();

		// add manager to BlockListBlock

		const { createHigherOrderComponent } =  wp.compose ;

		const addBlocksLigaturesManager = createHigherOrderComponent( ( BlockListBlock ) => {

			// console.log( BlockListBlock );

			return ( props ) => {

				// - - - - - - - - - - - - - - - - -

				// let blockList = this._wp.data.select('core/block-editor').getBlocks() || [] ;
				let blockList = wp.data.select('core/block-editor').getBlocks() || [] ;
				let blocksCount = blockList.length ;
				let lastBlock = blockList[ blocksCount - 1 ] ;

				let isEnd = false ;
				if( lastBlock.clientId === props.clientId ){
					isEnd = true ;
				}

				// - - -- - - -- - - -- - - - --  --

				return <>
					<BlockListBlock { ...props } />
					{isEnd === true && <BlocksLigaturesManager isActive={this.isActive} blockList={blockList} />}
				</> ;
			}

		}, 'addBlocksLigaturesManager' );

		wp.hooks.addFilter(

			'editor.BlockListBlock',
			'blocks-ligatures/add-blocks-ligatures-manager',
			addBlocksLigaturesManager
		);

		// - -
	}

	toggleManager(){

		// console.log('toggleManager');
		this.toggleManagerActivation()
	}

	isManagerActiveFromCookie(){

		if( 'true' === window.localStorage.getItem('blocksLigatures/Manager/isActive') ){
			return true;
		}

		return false ;
	}

}

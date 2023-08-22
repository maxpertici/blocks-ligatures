
import './App.scss' ;

import BlocksLigaturesManager from "../BlocksLigaturesManager/BlocksLigaturesManager.js";

import { subscribe, select, useSelect } from '@wordpress/data';
import { dispatch, useDispatch } from '@wordpress/data';
import { store as interfaceStore } from '@wordpress/interface';
import DumbStore from '../DumbStore.js'
export default class App {

	constructor() {

		this.subscribe = subscribe ;
		this.select = select ;
	}

	setupProperties(){

		this.toolBarElement      = document.querySelector('.edit-post-header-toolbar') ;
		this.visualEditorElement = document.querySelector('.edit-post-visual-editor') ;

		// this.managerElement = document.getElementById('blocks-ligatures-manager') ;

		this.isActive = false ;
		this.localStorage = window.localStorage ;

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
			this.localStorage.setItem('blocksLigatures/Manager/isActive', 'false' );
			managerNode.classList.remove('blocks-ligatures-manager--active');
		}else{
			this.localStorage.setItem('blocksLigatures/Manager/isActive', 'true' );
			managerNode.classList.add('blocks-ligatures-manager--active');
		}
	}


	verifyEditorMarkups(){

		return new Promise(( resolve, reject ) => {

			const { subscribe, select } = wp.data ;

			const waitingEditor =subscribe( () => {

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

		const { __, _x, _n, _nx, sprintf } = wp.i18n ;

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

		this.addButton();

		// add manager, launch component.

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
					{isEnd === true && <BlocksLigaturesManager isActive={this.isActive} />}
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


	showManager(){

		document.querySelector('.blocks-ligatures-manager').classList.add('blocks-ligatures-manager--active') ;
		this.isActive = true ;
		this.localStorage.setItem('blocksLigatures/Manager/isActive', 'true' );

	}

	hideManager(){

		document.querySelector('.blocks-ligatures-manager').classList.remove('blocks-ligatures-manager--active') ;
		this.isActive = false ;
		this.localStorage.setItem('blocksLigatures/Manager/isActive', 'false' );
	}

	toggleManager(){

		// console.log('toggleManager');
		this.toggleManagerActivation()
	}

	CheckIsManagerIsSavedAsActive(){

		if( 'true' === this.localStorage.getItem('blocksLigatures/Manager/isActive') ){
			this.showManager();
		}
	}

	isManagerActiveFromCookie(){

		if( 'true' === this.localStorage.getItem('blocksLigatures/Manager/isActive') ){
			return true;
		}

		return false ;
	}

}

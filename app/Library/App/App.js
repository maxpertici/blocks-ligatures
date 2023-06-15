
import './App.scss' ;
import BlocksLigaturesManager from "../BlocksLigaturesManager/BlocksLigaturesManager.js";

export default class App {

	constructor() {}
	setupProperties(){

		this.isActive = false ;
		this.localStorage = window.localStorage ;

		this.toolBarElement      = document.querySelector('.edit-post-header-toolbar') ;
		this.visualEditorElement = document.querySelector('.edit-post-visual-editor') ;
	}

	verifyEditorMarkups(){

		return new Promise(( resolve, reject ) => {

			const { subscribe, select } = wp.data ;

			const waitingEditor = subscribe( () => {

				let blockList = wp.data.select('core/block-editor').getBlocks() ;

				if( ( blockList.constructor === Array ) ){

					let toolbar = document.querySelector('.edit-post-header-toolbar') ;
					let editor  = document.querySelector('.edit-post-visual-editor') ;

					if( toolbar !== null && editor !== null ){ resolve(true ); }
				}
			});

		});
	}

	addButton(){

		// TODO : remove jQuery
		jQuery('.edit-post-header-toolbar').after( '<div class="">' + '<button class="blocks-ligatures-manager-toogler">Ligatures</button>' + '</div>' );
		this.visualEditorElement.appendChild( document.querySelector('#blocks-ligatures-manager') );

		let button = document.querySelector('.blocks-ligatures-manager-toogler') ;

		button.addEventListener('click', (e) => {
			e.preventDefault();
			this.toggleManager();
		} );
	}

	addManager(){

		this.addButton();

		ReactDOM.render(
			<BlocksLigaturesManager/>,
			document.getElementById('blocks-ligatures-manager')
		);

		this.CheckIsManagerIsSavedAsActive();
	}


	showManager(){
		document.querySelector('#blocks-ligatures-manager').classList.add('blocks-ligatures-manager--active') ;
		this.isActive = true ;
		this.localStorage.setItem('blocksLigatures/Manager/isActive', 'true' );

	}

	hideManager(){
		document.querySelector('#blocks-ligatures-manager').classList.remove('blocks-ligatures-manager--active') ;
		this.isActive = false ;
		this.localStorage.setItem('blocksLigatures/Manager/isActive', 'false' );
	}

	toggleManager(){

		if( this.isActive ){
			this.hideManager();
		}else{
			this.showManager();
		}
	}

	CheckIsManagerIsSavedAsActive(){

		if( 'true' === this.localStorage.getItem('blocksLigatures/Manager/isActive') ){
			this.showManager();
		}
	}

}

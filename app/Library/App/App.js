
import './App.scss' ;
import BlocksLigaturesManager from "../BlocksLigaturesManager/BlocksLigaturesManager.js";

export default class App {

	constructor() {}
	setupProperties(){

		this.isActive = false ;
		this.localStorage = window.localStorage ;

		this.toolBarElement      = document.querySelector('.edit-post-header-toolbar') ;
		this.visualEditorElement = document.querySelector('.edit-post-visual-editor') ;

		this.managerElement = document.getElementById('blocks-ligatures-manager') ;
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

		const { __, _x, _n, _nx, sprintf } = wp.i18n ;
		let toogler = document.createElement("button");
		toogler.classList.add('blocks-ligatures-manager-toogler');
		this.toolBarElement.after( toogler );
		this.tooglerElement = document.querySelector('.blocks-ligatures-manager-toogler') ;
		this.tooglerElement.innerHTML = __( 'Ligatures', 'blocks-ligatures' ) ;

		this.visualEditorElement.appendChild( this.managerElement );

		this.tooglerElement.addEventListener('click', (e) => {
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
		this.managerElement.classList.add('blocks-ligatures-manager--active') ;
		this.isActive = true ;
		this.localStorage.setItem('blocksLigatures/Manager/isActive', 'true' );

	}

	hideManager(){
		this.managerElement.classList.remove('blocks-ligatures-manager--active') ;
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

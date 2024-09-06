
import Debug from './Debug.js' ;

export default class Editor {

	constructor(){}


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

}
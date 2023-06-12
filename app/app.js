
import './styles/app.scss' ;

import domReady from '@wordpress/dom-ready';
import BlocksLigaturesManager from "./components/BlocksLigaturesManager.js";

domReady( function () {

	if( ! document.body.classList.contains( 'block-editor-page' ) ){ return ; }

	const { createHigherOrderComponent } =  wp.compose ;

	// const { subscribe, select } = wp.data ;

	// - - - - - - - - - - - - - - - -
	// on( BlockListBlock )

	const withLigatureSupport = createHigherOrderComponent( ( BlockListBlock ) => {

		// console.log( BlockListBlock );

		return ( props ) => {


			// - - - - - - - - - - - - - - - - -

			// props.ligatures.functions.component = this ;

			// console.log( props );

			// const { blockLigature } = props.attributes ;
			// let blockList = wp.data.select('core/block-editor').getBlocks() || [] ;

			// - - -- - - -- - - -- - - - --  --

			return <>
						<BlockListBlock { ...props } />
						<BlocksLigaturesManager />
					</> ;
		}

	}, 'withLigatureSupport' );


	wp.hooks.addFilter(

		'editor.BlockListBlock',
		'blocks-ligatures/with-ligature-support',
		withLigatureSupport
	);


} );
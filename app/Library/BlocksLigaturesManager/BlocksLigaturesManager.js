
import './BlocksLigaturesManager.scss' ;

import React from "react";
export default class BlocksLigaturesManager extends React.Component {

	constructor(props) {
		super(props);
	}


	// https://www.educba.com/react-componentdidmount/
	componentDidMount() {}


	off(){
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
	}

	render() {

		return(
			<>
				<strong>Blocks Ligatures Manager</strong>
			</>
		);

	}
}

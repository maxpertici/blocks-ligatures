
import './BlocksLigaturesManager.scss' ;

import React from "react";
import { dispatch, useDispatch } from '@wordpress/data';
import { select, useSelect } from '@wordpress/data';
import { findDOMNode } from 'react-dom';
import DumbStore from '../DumbStore.js'

export default class BlocksLigaturesManager extends React.Component {

	constructor(props) {
		super( props );
		this.state = {...props} ;
		this.node = null ;
	}


	// https://www.educba.com/react-componentdidmount/
	componentDidMount() {

		this.node = findDOMNode(this);
		let store = new DumbStore() ;
		store.setManagerNode( this.node ) ;

		if( this.state.isActive ){
			this.node.classList.add('blocks-ligatures-manager--active');
		}

	}


	render() {

		// blocks-ligatures-manager--active ?
		// console.log(this.state.isActive);

		/*
		const { preferences } = useSelect( ( select ) => {
			return  wp.data.select( 'core/interface' ) ;
		} );

		console.log( preferences ) ;
		*/

		return(
			<>
				<div id="blocks-ligatures-manager" className="blocks-ligatures-manager">
					<strong>Blocks Ligatures Manager</strong>
				</div>
			</>
		);

	}
}


import '../Styles/BlocksLigaturesManager.scss' ;

import React, { useState, useEffect } from "react";
import { dispatch, useDispatch } from '@wordpress/data';
import { select, useSelect } from '@wordpress/data';
import { findDOMNode } from 'react-dom';
import DumbStore from './DumbStore.js'
import LigaturesGrid from "./LigaturesGrid.js";

export default class BlocksLigaturesManager extends React.Component {

	constructor(props) {

		super( props );
		this.node = null ;

		// console.log(props);

		this.state = {
			isActive: props.isActive,
			blockList: [...props.blockList]
		};
	}


	// https://www.educba.com/react-componentdidmount/
	componentDidMount() {

		this.node = findDOMNode(this);
		let store = new DumbStore() ;
		store.setManagerNode( this.node ) ;
	}


	// TODO : connect with hook to 'core/interface' || 'core/preferences' feature
	/*
		const { preferences } = useSelect( ( select ) => {
			return  wp.data.select( 'core/interface' ) ;
		} );

		console.log( preferences ) ;
	*/


	render(){

		let managerClassname = 'blocks-ligatures-manager' ;

		if( true === this.state.isActive ){
			managerClassname += ' blocks-ligatures-manager--active' ;
		}

		return (
			<>
				<div id="blocks-ligatures-manager" className={managerClassname}>
					<LigaturesGrid blockList={this.props.blockList}/>
				</div>
			</>
		);

	}
}

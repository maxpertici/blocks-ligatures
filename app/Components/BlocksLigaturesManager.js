
import '../Styles/BlocksLigaturesManager.scss' ;

import React from "react";
import { dispatch, useDispatch } from '@wordpress/data';
import { select, useSelect } from '@wordpress/data';
import { findDOMNode } from 'react-dom';
import DumbStore from './DumbStore.js'
import LigaturesGrid from "./LigaturesGrid.js";

export default class BlocksLigaturesManager extends React.Component {

	constructor(props) {
		super(props);
		this.node = null;
		this.state = {
			isActive: props.isActive,
			blockList: [...props.blockList]
		};
	}

	componentDidUpdate(prevProps) {

		console.log( prevProps.blockList )

		// Check if props or state have changed before updating
		if (
			prevProps.isActive !== this.props.isActive ||
			prevProps.blockList !== this.props.blockList
		) {
			this.setState({
				isActive: this.props.isActive,
				blockList: [...this.props.blockList]
			});
		}
	}

	// https://www.educba.com/react-componentdidmount/
	componentDidMount() {

		this.node = findDOMNode(this);
		let store = new DumbStore() ;
		store.setManagerNode( this.node ) ;
		store.setAppRootNode( this.node.parentNode ) ;
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

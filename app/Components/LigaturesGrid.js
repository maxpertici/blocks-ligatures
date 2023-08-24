import React from "react";

export default class LigaturesGrid extends React.Component {

	constructor(props) {
		super( props );

		this.state = {
			blockList: [...props.blockList]
		};
	}

	componentDidMount() {}

	render(){

		return (
			<>
				<div id="ligatures-grid" className="ligatures-grid">
					{this.props.blockList.map( (block, index) => {
						return (
							<div className="ligatures-grid__item" key={index}>
								{block.name}
							</div>
						)
					} )}
				</div>
			</>
		) ;
	}
}
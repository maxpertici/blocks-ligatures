
import './styles/app.scss' ;

import React from "react";

document.addEventListener('DOMContentLoaded', () => {

	// Check if gutenberg exist
	if( typeof wp.data == 'undefined' ){ return ; }

	(function (wp) {

		console.log('wp app.jsx');

	})(window.wp);

}, false );


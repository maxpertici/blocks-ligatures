export default class DumbStore {

	constructor() {

		window.maxpertici = window.maxpertici || {} ;
		window.maxpertici.blocksLigatures = window.maxpertici.blocksLigatures || {} ;
		window.maxpertici.blocksLigatures.store = window.maxpertici.blocksLigatures.store || {} ;
	}

	setManagerNode( node ){
		window.maxpertici.blocksLigatures.store.managerNode = node ;
	}

	setAppRootNode( node ){
		window.maxpertici.blocksLigatures.store.appRootNode = node ;
	}

	getManagerNode(){
		return window.maxpertici.blocksLigatures.store.managerNode  ;
	}

	getAppRootNode(){
		return window.maxpertici.blocksLigatures.store.appRootNode ;
	}


}
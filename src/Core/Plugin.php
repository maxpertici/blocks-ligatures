<?php

namespace BlocksLigatures\Core;

class Plugin {
	public $version = '0.1' ; // TODO : catch from main plugin file comments
	protected $pluginUrl = null ;
	protected $directoryPath = null ;
	function __construct( $mainPluginFilePath = null ){

		if( is_null( $mainPluginFilePath ) ){ return ; }

		$this->setDirectoryPath( $mainPluginFilePath ) ;
		$this->setPluginUrl() ;
	}

	private function setPluginUrl() {
		if( is_null($this->directoryPath) ){ return ; }
		$this->pluginUrl = trailingslashit( plugin_dir_url( $this->directoryPath ) ) ;
	}

	private function setDirectoryPath( $mainPluginFilePath ){
		$this->directoryPath = trailingslashit( $mainPluginFilePath );
	}
}
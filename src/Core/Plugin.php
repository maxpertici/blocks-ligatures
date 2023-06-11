<?php

namespace BlocksLigatures\Core;

class Plugin
{
	public $version = '0.1' ; // TODO : catch from main plugin file comments

	protected $pluginUrl = null ;
	protected $directoryPath = null ;


	function __construct( $mainPluginFilePath = null ){

		if( is_null( $mainPluginFilePath ) ){ return ; }

		$this->setPluginUrl( $mainPluginFilePath ) ;
		$this->setDirectoryPath( $mainPluginFilePath ) ;
	}

	private function setPluginUrl( $mainPluginFilePath ){

		$this->pluginUrl = trailingslashit( plugin_dir_url( $this->directoryPath ) . 'blocks-ligatures' ) ;
	}

	private function setDirectoryPath( $mainPluginFilePath ){

		$this->directoryPath = trailingslashit( $mainPluginFilePath );
	}

}
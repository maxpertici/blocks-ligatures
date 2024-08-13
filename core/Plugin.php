<?php

namespace MXP\BlocksLigatures;

class Plugin {

	public $version = '' ;
	protected $pluginUrl = null ;
	protected $directoryPath = null ;
	function __construct( $mainPluginFilePath = null ){

		if( is_null( $mainPluginFilePath ) ){ return ; }

		$this->setDirectoryPath( $mainPluginFilePath ) ;
		$this->setPluginUrl();
		$this->setVersion();
	}

	private function setVersion(){
		if( ! function_exists('get_plugin_data') ){
			require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
		}
		$plugin_data = get_plugin_data( $this->directoryPath . 'blocks-ligatures.php' ) ;
		$this->version = $plugin_data['Version'] ;
	}

	private function setPluginUrl() {
		if( is_null($this->directoryPath) ){ return ; }
		$this->pluginUrl = trailingslashit( plugin_dir_url( $this->directoryPath ) . 'blocks-ligatures' ) ;
	}

	private function setDirectoryPath( $mainPluginFilePath ){
		$this->directoryPath = trailingslashit( dirname( $mainPluginFilePath ) );
	}

	public function getVersion(){
		return $this->version;
	}
}
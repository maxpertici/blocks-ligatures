<?php

namespace MXP\Core;

final class Plugin
{
	private $directoryPath = null ;

	function __construct( $mainPluginFilePath = null ){

		if( is_null( $mainPluginFilePath ) ){ return ; }

		$this->set_directoryPath( $mainPluginFilePath ) ;
	}

	public function init(){
		$this->set_hooks();
	}

	private function set_directoryPath( $mainPluginFilePath ){
		$this->directoryPath = trailingslashit( $mainPluginFilePath );
	}

	private function set_hooks(){
		add_action( 'enqueue_block_editor_assets', [ $this, 'editor_assets' ] );
	}

	public function editor_assets(){
		if( is_null( $this->directoryPath ) ){ return ; }
		wp_enqueue_script( 'blocks-ligatures' , plugin_dir_url( $this->directoryPath ) . 'build/app.js',  array(), '0.1' );
		wp_enqueue_style(  'blocks-ligatures' , plugin_dir_url( $this->directoryPath ) . 'build/app.css', array(), '0.1', 'all' );
	}
}
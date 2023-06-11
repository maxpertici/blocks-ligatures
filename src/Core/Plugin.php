<?php

namespace MXP\Core;

final class Plugin
{

	public $directory_path = null ;

	function __construct( $file_path ){
		$this->set_directory_path( $file_path ) ;
	}

	function set_directory_path( $file_path ){
		$this->directory_path = trailingslashit( $file_path );
	}

	function run(){
		$this->set_hooks();
	}

	function set_hooks(){
		add_action( 'enqueue_block_editor_assets', [ $this, 'editor_assets' ] );
	}

	function editor_assets(){
		wp_enqueue_script( 'blocks-ligatures' , plugin_dir_url( $this->directory_path ) . 'build/app.js',  array(), '0.1' );
		wp_enqueue_style(  'blocks-ligatures' , plugin_dir_url( $this->directory_path ) . 'build/app.css', array(), '0.1', 'all' );
	}
}
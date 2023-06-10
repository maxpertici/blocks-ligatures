<?php

namespace MXP\Core;

use \MXP\Helpers\Singleton ;

final class Plugin extends Singleton
{
	function __construct(){
		$this->hooks();
	}

	function hooks(){
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_app' ] );
	}

	function enqueue_app(){

		wp_enqueue_script( 'blocks-ligatures' , plugin_dir_url( dirname( dirname(__FILE__)  ) ) . 'build/app.js', array(), '0.1' );
		wp_enqueue_style(  'blocks-ligatures' , plugin_dir_url( dirname( dirname(__FILE__)  ) ) . 'build/app.css', array(), '0.1', 'all' );
	}

}
<?php

namespace BlocksLigatures\Core;

final class App extends Plugin {


	public function __construct( $mainPluginFilePath ) {
		parent::__construct( $mainPluginFilePath );
	}

	public function init() {
		$this->setHooks();
	}

	private function setHooks() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'blockEditorAssets' ] );
	}

	public function blockEditorAssets() {

		if( is_null( $this->pluginUrl ) ){ return ; }
		wp_enqueue_script( 'blocks-ligatures' , $this->pluginUrl . 'build/app.js',  [], $this->version );
		wp_enqueue_style(  'blocks-ligatures' , $this->pluginUrl . 'build/app.css', [], $this->version, 'all' );
	}
}
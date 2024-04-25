<?php

namespace MXP\BlocksLigatures\Core;

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
		if ( is_null( $this->pluginUrl ) ) {
			return;
		}
		$assets = include $this->directoryPath . 'build/blocks-ligatures.asset.php' ;
		wp_enqueue_script( 'blocks-ligatures', $this->pluginUrl . 'build/blocks-ligatures.js', $assets['dependencies'], $this->version );
		wp_enqueue_style( 'blocks-ligatures', $this->pluginUrl . 'build/blocks-ligatures.css', [], $this->version, 'all' );
	}

}
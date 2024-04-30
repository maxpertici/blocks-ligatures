<?php

namespace MXP\BlocksLigatures\Core;

final class App extends Plugin {


	private $ligaturesColection = [];

	public function __construct( $mainPluginFilePath ) {
		parent::__construct( $mainPluginFilePath );
	}

	public function load() {
		$this->setHooks();
	}

	private function setHooks() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'init' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'extendLigaturesCollection' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'blockEditorAssets' ] );
	}

	public function init(){
		do_action('blocks_ligatures/init');
	}

	public function extendLigaturesCollection(){
		$additionnals_ligatures = apply_filters( 'blocks_ligatures/extend_collection', [] );
		$this->ligaturesColection = array_merge( $this->ligaturesColection, $additionnals_ligatures ) ;
	}

	
	public function blockEditorAssets() {
		if ( is_null( $this->pluginUrl ) ) {
			return;
		}
		$assets = include $this->directoryPath . 'build/blocks-ligatures.asset.php' ;
		wp_enqueue_script( 'blocks-ligatures', $this->pluginUrl . 'build/blocks-ligatures.js', $assets['dependencies'], $this->version );
		wp_enqueue_style( 'blocks-ligatures', $this->pluginUrl . 'build/blocks-ligatures.css', [], $this->version, 'all' );
		wp_localize_script( 'blocks-ligatures', 'blocksLigatures', [ 'collection' => $this->ligaturesColection ] );
	}
}

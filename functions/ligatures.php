<?php
/**
 * Use to Register Block's Ligatures
 *
 * @param array $ligatures
 * @return void
 */
function mxp_blocks_ligatures_register_ligatures( $ligatures = [] ){

    if( ! is_array( $ligatures ) || $ligatures === [] ) return ;
    
    $once = ( ! is_array( array_values( $ligatures )[0] ) ) ? true : false ;

    $once ? $ligatures = [ $ligatures ] : null ;

    foreach( $ligatures as $ligature ){

        add_filter( 'blocks_ligatures/extend_collection', function( $collection ) use ( $ligature ) {
            return array_merge( $collection, [ $ligature ] );
        });
    }
}
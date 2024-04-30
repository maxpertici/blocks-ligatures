<?php



function mxp_register_blocks_ligatures( $ligatures = [] ){

    if( ! is_array( $ligatures ) || $ligatures === [] ) return ;
    
    $once = ( ! is_array( array_values( $ligatures )[0] ) ) ? true : false ;

    $once ? $ligatures = [ $ligatures ] : null ;

    foreach( $ligatures as $ligature ){

        add_filter( 'blocks_ligatures/extend_collection', function( $collection ) use ( $ligature ) {
            return array_merge( $collection, [ $ligature ] );
        });
    }
}
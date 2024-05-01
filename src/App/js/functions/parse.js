
import BlockWalker from '../others/BlockWalker.js' ;

/**
 * Parse the ligatures in the editor blocks and validate them against the ligatures collection.
 * @param {*} editorBlocks 
 * @param {*} LigaturesCollection 
 * @returns 
 */
const parseLigatures = ( editorBlocks, LigaturesCollection ) => {

    console.log( 'parseLigatures' ) ;

    const walker = new BlockWalker();
    walker.setLigatures( LigaturesCollection ) ;
    walker.setBlockList( editorBlocks );
    walker.walk();
    
    return walker.getAvailableLigatures() ;
};


/**
 * Parse the blocks and create the capacities of each block.
 * Each block will have a set of capacities.
 * The capacities are the ligatures that are available on the block.
 * Each block can check and compare the capacities of the ligatures.
 * @param {*} editorBlocks 
 * @param {*} parsedLigatures 
 * @returns 
 */
const parseBlocks =  ( editorBlocks, parsedLigatures ) => {

    const blocksCapacities = {} ;

    // unique ID for each ligature ?

    for( const block of editorBlocks ) {

        const capacities = {} ;

        // for each ligature in parsedLigatures
        for( const ligature of parsedLigatures ) {


            console.log( ligature);

            /*
            // if the ligature is available on the block
            if( block.ligatures.includes( ligature.id ) ) {

                // add the ligature to the capacities of the block
                capacities[ ligature.id ] = true ;
            }
            */
        }

        // add the capacities of the block to the blocksCapacities
        blocksCapacities[ block.id ] = capacities ;
    }

    return blocksCapacities ;
}


export { parseLigatures, parseBlocks }
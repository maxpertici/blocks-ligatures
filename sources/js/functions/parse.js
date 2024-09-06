
import EditorBlocksWalker from '../helpers/EditorBlocksWalker.js' ;

/**
 * Parse the ligatures in the editor blocks and validate them against the ligatures collection.
 * @param {*} editorBlocks 
 * @param {*} LigaturesCollection 
 * @returns 
 */
const parseBlocks = ( editorBlocks, LigaturesCollection ) => {

    const walker = new EditorBlocksWalker();

    walker.setLigatures( LigaturesCollection ) ;
    walker.setBlockList( editorBlocks );
    walker.walk();
    
    return walker.getAvailableLigatures() ;
};


/**
 * Parse the ligatures and create the capacities of each block.
 * Each block will have a set of capacities.
 * The capacities are the ligatures that are available on the block.
 * Each block can check and compare the capacities of the ligatures.
 * @param {*} editorBlocks 
 * @param {*} parsedLigatures 
 * @returns 
 */
const parseLigatures =  ( editorBlocks, parsedLigatures ) => {

    const blocksCapacities = {} ;

    for( const block of editorBlocks ) {

        const ligaturesByBlock = [] ;

        for( const ligature of parsedLigatures ) {

            let inScope = false ;

            if( block.clientId === ligature.blockStart || block.clientId === ligature.blockEnd || ligature.blockIn.includes( block.clientId ) ) {
                inScope = true ;
            }
            
            true ? ligaturesByBlock.push( ligature ) : null ;
        }

        // add the capacities of the block to the blocksCapacities
        blocksCapacities[ block.clientId ] = ligaturesByBlock ;
    }

    return blocksCapacities ;
}


export { parseBlocks, parseLigatures }
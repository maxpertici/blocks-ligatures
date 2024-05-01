import { blocksCapacities } from "../others/SignalsPrimitives.js";
import { parseLigatures, parseBlocks } from "./parse.js";

const dispatchCollection = ( editorBlocks, LigaturesCollection ) => {

    console.log( 'dispatchCollection' ) ;
    
    const parsedLigatures = parseLigatures( editorBlocks, LigaturesCollection ) ;

    const capacities = parseBlocks( editorBlocks, parsedLigatures );

    console.log( capacities ) ;

    // blocksCapacities.value = { "cliendId" : { "demo" : true } } ;
}

export { dispatchCollection };
import { blocksCapacities } from "../others/SignalsPrimitives.js";
import { parseBlocks, parseLigatures } from "./parse.js";

const dispatchCollection = ( editorBlocks, LigaturesCollection ) => {
    

    // console.log('dispatchCollection');

    const parsedLigatures = parseBlocks( editorBlocks, LigaturesCollection ) ;

    const capacities = parseLigatures( editorBlocks, parsedLigatures );

    blocksCapacities.value = capacities ;
}

export { dispatchCollection };
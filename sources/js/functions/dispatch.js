import { blocksCapacities } from "../signals/SignalsPrimitives.js";
import { parseBlocks, parseLigatures } from "./parse.js";

const dispatchCollection = ( editorBlocks, LigaturesCollection ) => {

    const parsedLigatures = parseBlocks( editorBlocks, LigaturesCollection ) ;

    const capacities = parseLigatures( editorBlocks, parsedLigatures );

    blocksCapacities.value = capacities ;
}

export { dispatchCollection };
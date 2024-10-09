import { useBLStore } from "../helpers/Store.js";
import { parseBlocks, parseLigatures } from "./parse.js";

const dispatchCollection = ( editorBlocks, LigaturesCollection ) => {

    const parsedLigatures = parseBlocks( editorBlocks, LigaturesCollection ) ;

    const state = useBLStore.getState();

    const capacities = parseLigatures( editorBlocks, parsedLigatures );
    state.setBlocksCapacities(capacities);
}

export { dispatchCollection };
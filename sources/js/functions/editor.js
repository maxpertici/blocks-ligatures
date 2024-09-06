

const concatBlocksClientID = ( editorBlocks ) => {

    let s = 'concat-client-id';
    editorBlocks.forEach( block => {
        s += '--' + block.clientId ;
    });
    return s ;
}

export { concatBlocksClientID }
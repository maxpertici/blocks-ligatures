

const concatBlocksClientID = ( editorBlocks ) => {

    let s = 'concat-clients-id';
    editorBlocks.forEach( block => {
        s += '--' + block.clientId ;
    });
    return s ;
}

export { concatBlocksClientID }
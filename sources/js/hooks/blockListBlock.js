import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { useBLStore } from "../helpers/Store.js";

import Editor from "../helpers/Editor.js";

// @link : https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/

const advancedBlockListCLientId = createHigherOrderComponent(
    
    ( BlockListBlock ) => {

        return ( props ) => {

            const EditorBlocks    = useBLStore( ( state ) => state.EditorBlocks )
            const setEditorBlocks = useBLStore( ( state ) => state.setEditorBlocks )

            // console.log( 'blockListBlock.js' );
            // console.log( props );

            // be sure the block is registered in the EditorBlocks store
            if( ! EditorBlocks.includes( props.clientId ) ){
                // console.log( props.clientId );
                // setEditorBlocks( [ ...EditorBlocks, props.clientId ] );
                console.log( 'blockListBlock.js :: ! clientId' );

                const editor = new Editor();
                const domBody = editor.getBody();

                // trigger resizeObserver
                // domBody.classList.add("blocks-ligatures--force-resize");
                // domBody.classList.toggle("blocks-ligatures--force-resize");
                // domBody.dispatchEvent(new Event('resize'));
            }

            return (
                <BlockListBlock
                    { ...props }
                />
            );
        };
    },
    'advancedBlockListCLientId'
);

addFilter(
    'editor.BlockListBlock',
    'blocks-ligatures/handle-ligatures-blokc-list-block',
    advancedBlockListCLientId
);
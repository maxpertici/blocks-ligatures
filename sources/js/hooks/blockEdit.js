import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { useSelect, useDispatch, select } from "@wordpress/data";
import { useEffect, useState, useMemo} from 'react';
import { useBLStore } from "../helpers/Store.js";
import Editor from "../helpers/Editor.js";

const handleLigaturesAttributes = createHigherOrderComponent( (BlockEdit) => {


  return (props) => {

    const { attributes, clientId, isSelected } = props ;
    const { ligatures } = attributes ;
    // const [ blocksCaps, setBlocksCaps ] = useState( blocksCapacities.value );



    console.log( props );

    const { editorBlocks } = useSelect(
      (select) => ({
        editorBlocks: select("core/editor").getEditorBlocks()
      }),
    [ clientId ] );

    // console.log( select("core/editor").getEditorBlocks() );
    console.log( editorBlocks );


    console.log( 'blockEdit.js' );

    const EditorBlocks    = useBLStore( ( state ) => state.EditorBlocks )
    const setEditorBlocks = useBLStore( ( state ) => state.setEditorBlocks )




    // const EditorBlocks = useBLStore( ( state ) => state.EditorBlocks )
    // const setEditorBlocks = useBLStore((state) => state.setEditorBlocks)
  
    // const { editorBlocks } = useSelect(
    //   (select) => ({
    //     editorBlocks: select("core/editor").getEditorBlocks()
    //   }),
    //   []
    // );
  
    // const clientIds = useMemo(() => {
    //   return editorBlocks.map(block => block.clientId);
    // }, [editorBlocks]);
  
  
    // useEffect(() => {
  
    //   if( EditorBlocks != clientIds ){
    //     setEditorBlocks( clientIds );
    //   }  
    // }, [clientIds]);
    
    // useEffect(() => {
      
    //   setEditorBlocks(editorBlocks.map(block => block.clientId));
      
    //   const editor = new Editor();
    //   const positions = editor.getBlocksPositions();
		// 	editor.dispatchPositions(positions);

    // }, [editorBlocks]);



    // Verify if the block the clienId if exists in the list of blocks
    // If not, need refresh the list of blocks
    if( ! EditorBlocks.includes( clientId ) ){

      // console.log( editorBlocks );
      console.log( 'Block not exists in the list' );
      console.log( select("core/editor").getBlock( clientId ) );
      console.log( select("core/editor").getEditorBlocks() );

      const newBlock = select("core/editor").getBlock( clientId );
      const newBlockClientIds = newBlock.clientId;

      console.log('----------');
      console.log(EditorBlocks.concat( newBlockClientIds ));
      console.log('----------');

      setEditorBlocks( EditorBlocks.concat( newBlockClientIds ) );

      const editor = new Editor();
      const positions = editor.getBlocksPositions();
			editor.dispatchPositions(positions);

      // const editor = new Editor();
      // const positions = editor.getBlocksPositions();

      // console.log( positions );

      // editor.dispatchPositions(positions);

    }


    if( isSelected ){
      
      console.log( 'Block is selected' );


    }




    // effect(() => {
    //   setBlocksCaps( blocksCapacities.value );
    // }, [blocksCapacities.value]);

    // const availableLigatures = blocksCapacities.value[clientId] ?? {} ;
    // <BlockEditLigaturesControls clientId={clientId} availableLigatures={availableLigatures} />

    return (
      <>
        <BlockEdit key="edit" {...props} />
      </>
    );
  };
}, "withMyPluginControls");

addFilter(
  "editor.BlockEdit",
  "blocks-ligatures/handle-ligatures-attributes",
  handleLigaturesAttributes
);

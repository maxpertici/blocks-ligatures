import { LigaturesGrid } from "./ManagerGrid.js";
import { useEffect, useState, useMemo } from 'react';
import { dispatchCollection } from "../../functions/dispatch.js";
import { concatBlocksClientID } from "../../functions/editor.js"

import { useBLStore } from "../../helpers/Store.js";

const LigaturesManager = (props) => {

  const { editorBlocks } = props ;

  const ManagerIsActive     = useBLStore((state) => state.ManagerIsActive)
  const LigaturesCollection = useBLStore((state) => state.LigaturesCollection)

  /**
   * Handle Active State
   */
  const [ isActive, setIsActive ] = useState( ManagerIsActive ) ;
  const [ concatEditorBlocksClientID, setConcatEditorBlocksClientID ] = useState( concatBlocksClientID(editorBlocks) );
 
  useEffect(() => {
    if (ManagerIsActive !== isActive) {
      setIsActive(ManagerIsActive);
    }
  }, [ ManagerIsActive ]);


  /**
   * Dispatch Ligatures Collection on Editor Blocks change
   */
  useEffect(() => {

    if( concatBlocksClientID(editorBlocks) != concatEditorBlocksClientID ){

      setConcatEditorBlocksClientID( concatBlocksClientID(editorBlocks) );
      dispatchCollection( editorBlocks, LigaturesCollection );
    }
    
  }, [editorBlocks]);



  /**
   * Markup
   */
  let managerClassname = "blocks-ligatures-manager";
  if ( isActive ) {
    managerClassname += " blocks-ligatures-manager--is-active";
  }

  return (
    <>
      <div id="blocks-ligatures-manager" className={managerClassname}>
        <LigaturesGrid editorBlocks={editorBlocks} />
      </div>
    </>
  );
};

export { LigaturesManager };
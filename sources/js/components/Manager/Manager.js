import { LigaturesGrid } from "./ManagerGrid.js";

import {useEffect, useState, useMemo} from 'react';
import { ManagerIsActive, LigaturesCollection, blocksCapacities } from "../../signals/SignalsPrimitives.js";
import { effect } from "@preact/signals-react";
import { dispatchCollection } from "../../functions/dispatch.js";
import { concatBlocksClientID } from "../../functions/editor.js"
import Debug from '../../helpers/Debug.js';

const LigaturesManager = (props) => {

  const { editorBlocks } = props ;

  /**
   * Handle Active State
   */
  const [ isActive, setIsActive ] = useState( ManagerIsActive.value ) ;
  const [ concatEditorBlocksClientID, setConcatEditorBlocksClientID ] = useState( concatBlocksClientID(editorBlocks) );

  effect(() => {
    if( ManagerIsActive.value != isActive ){
      setIsActive( ManagerIsActive.value ) ;
    }
	});
  

  // Debug( blocksCapacities.value );

  /**
   * Dispatch Ligatures Collection on Editor Blocks change
   */
  useEffect(() => {

    if( concatBlocksClientID(editorBlocks) != concatEditorBlocksClientID ){

      setConcatEditorBlocksClientID( concatBlocksClientID(editorBlocks) );
      dispatchCollection( editorBlocks, LigaturesCollection.value );
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
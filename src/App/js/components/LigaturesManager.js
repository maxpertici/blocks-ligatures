import { LigaturesGrid } from "./LigaturesGrid.js";

import {useEffect, useState, useMemo} from 'react';
import { ManagerIsActive, LigaturesCollection } from "../others/SignalsPrimitives.js";
import { effect } from "@preact/signals-react";
import { dispatchCollection } from "../functions/dispatch.js";

const LigaturesManager = (props) => {

  const { editorBlocks } = props;

  /**
   * Handle Active State
   */
  const [ isActive, setIsActive ] = useState( ManagerIsActive.value ) ;

  effect(() => {
    if( ManagerIsActive.value != isActive ){
      setIsActive( ManagerIsActive.value ) ;
    }  
	});

  /**
   * Handle Collection & dispatch
   */
  const memoEditorBlocks = useMemo(
    () => { return editorBlocks },
    [editorBlocks]
  );

  const memoLigaturesCollection = useMemo(
    () => { return LigaturesCollection.value },
    [ LigaturesCollection.value]
  );

  useEffect(() => {
    dispatchCollection( memoEditorBlocks, memoLigaturesCollection );
  }, [memoEditorBlocks, memoLigaturesCollection]);


  /**
   * Markup
   */
  let managerClassname = "ligatures-manager";
  if ( isActive ) {
    managerClassname += " ligatures-manager--is-active";
  }

  return (
    <>
      <div id="ligatures-manager" className={managerClassname}>
        <LigaturesGrid editorBlocks={editorBlocks} />
      </div>
    </>
  );
};

export { LigaturesManager };
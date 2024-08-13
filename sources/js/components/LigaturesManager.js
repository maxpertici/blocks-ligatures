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


  // console.log( editorBlocks ) ;

  const clientIdCollection =  editorBlocks.map( (block) => {
    return block.clientId;
  } );

  const memoClientIdCollection = useMemo(
    () => {
      // console.log(clientIdCollection);
      return clientIdCollection ;
    },
    [ clientIdCollection ]
  );

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


  // console.log(memoLigaturesCollection);
  // console.log(memoClientIdCollection);

  // useEffect(() => {
  //   console.log('ligaturesManager : useEffect');
  //   dispatchCollection( memoEditorBlocks, memoLigaturesCollection );
  // }, [memoLigaturesCollection, memoClientIdCollection]);

  useEffect(() => {

    if( memoClientIdCollection.toString() != clientIdCollection.toString() ){
      console.log('update ids');
    }
    console.log('ligaturesManager : useEffect');
    dispatchCollection( memoEditorBlocks, memoLigaturesCollection );
  }, [memoLigaturesCollection, memoClientIdCollection]);


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
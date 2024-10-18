
import { useSelect, useDispatch } from "@wordpress/data";
import {useEffect, useState, useMemo} from 'react';
import { LigaturesManager } from "./Manager/Manager.js";

import { BlocksControls } from "./Block/BlocksControls.js";
import Editor from "../helpers/Editor.js";

import { useBLStore } from "../helpers/Store.js";

const App = () => {

  const EditorBlocks    = useBLStore( ( state ) => state.EditorBlocks )
  const setEditorBlocks = useBLStore( ( state ) => state.setEditorBlocks )

  const { editorBlocks } = useSelect(
    (select) => ({
      editorBlocks: select("core/editor").getEditorBlocks()
    }),
    [ ] );


  // console.log( editorBlocks );

  const clientIds = useMemo(() => {
    return editorBlocks.map(block => block.clientId);
  }, [editorBlocks]);


  useEffect(() => {

    if( EditorBlocks != clientIds ){
      setEditorBlocks( clientIds );
    }  
  }, [clientIds]);


  const editor = new Editor();
  editor.bindScreenForBlocksWatch();

  // - - - -

  // const [ updated, setUpdated] = useState(false) ;

  // useEffect(() => {
  //   const handleForceUpdate = () => {
  //     console.log('Forcing update...');
  //     console.log( editorBlocks );
  //     setUpdated(prev => !prev); // Force un re-rendu en changeant l'état
  //   };

  //   // Écoute l'événement personnalisé
  //   window.addEventListener('mxpBL__App__forceUpdate', handleForceUpdate);

  //   // Nettoie l'événement lorsqu'on quitte le composant
  //   return () => {
  //     window.removeEventListener('mxpBL__App__forceUpdate', handleForceUpdate);
  //   };
  // }, []);


  // - - - -

  return (
    <>
      {/* <LigaturesManager editorBlocks={editorBlocks} /> */}
      <BlocksControls editorBlocks={editorBlocks}/>
    </>
  );
};

export { App };
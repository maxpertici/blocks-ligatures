
import { useSelect, useDispatch } from "@wordpress/data";
import {useEffect, useState, useMemo} from 'react';
import { LigaturesManager } from "./Manager/Manager.js";

import Debug from '../helpers/Debug.js';
import { BlocksControls } from "./Block/BlocksControls.js";
import Editor from "../helpers/Editor.js";

import { useBLStore } from "../helpers/Store.js";

const App = () => {

  const EditorHelperBlocks = useBLStore( ( state ) => state.EditorHelperBlocks )
  
  const { editorBlocks } = useSelect(
    (select) => ({
      editorBlocks: select("core/editor").getEditorBlocks()
    }),
    []
  );

  Debug( { "editorBlocks" : editorBlocks } );

  const editor = new Editor();
  editor.bindScreenForBlocksWatch();

  return (
    <>
      <LigaturesManager editorBlocks={editorBlocks} />
      <BlocksControls editorBlocks={editorBlocks}/>
    </>
  );
};

export { App };
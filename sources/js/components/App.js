
import { useSelect, useDispatch } from "@wordpress/data";
import {useEffect, useState, useMemo} from 'react';
import { LigaturesManager } from "./Manager/Manager.js";
import { ManagerIsActive, LigaturesCollection, blocksCapacities } from "../signals/SignalsPrimitives.js";
import { effect } from "@preact/signals-react";
import Debug from '../helpers/Debug.js';
import { BlocksControls } from "./Block/BlocksControls.js";

const App = () => {

  const { editorBlocks } = useSelect(
    (select) => ({
      editorBlocks: select("core/editor").getEditorBlocks()
    }),
    []
  );

  Debug( { "editorBlocks" : editorBlocks } );


  return (
    <>
      <LigaturesManager editorBlocks={editorBlocks} />
      <BlocksControls editorBlocks={editorBlocks}/>
    </>
  );
};

export { App };
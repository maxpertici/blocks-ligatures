
import Debug from '../../helpers/Debug.js';
import { BlockLigaturesToolBar } from './BlockToolBar.js';
import { ManagerIsActive, blocksCapacities } from "../../signals/SignalsPrimitives.js";
import {useEffect, useState, useMemo} from 'react';
import { effect } from "@preact/signals-react";

const BlocksControls = (props) => {

    const { editorBlocks } = props ;


  /**
   * Handle Active State
   */
  const [ isActive, setIsActive ] = useState( ManagerIsActive.value ) ;

  effect(() => {
    if( ManagerIsActive.value != isActive ){
      setIsActive( ManagerIsActive.value ) ;
    }
  });

    return <>
    { isActive && editorBlocks.map((block) => (
        <div className="blocks-ligatures-blocks-controls">
            <BlockLigaturesToolBar editorBlocks={editorBlocks} clientId={block.clientId} availableLigatures={blocksCapacities.value[block.clientId] ?? {}} />
        </div>
    ))}
    </>;
};

export { BlocksControls };

import { LigaturesGrid } from "./LigaturesGrid.js";

import {useEffect, useState} from 'react';
import { ManagerIsActive } from "./Signals.js";
import { effect } from "@preact/signals-react";

const LigaturesManager = (props) => {

  const { editorBlocks } = props;

  const [ isActive, setIsActive ] = useState( ManagerIsActive.value ) ;

  let managerClassname = "ligatures-manager";
  if ( isActive ) {
    managerClassname += " ligatures-manager--is-active";
  }
  
	effect(() => {
    if( ManagerIsActive.value != isActive ){
      setIsActive( ManagerIsActive.value ) ;
    }
	});

  return (
    <>
      <div id="ligatures-manager" className={managerClassname}>
        <LigaturesGrid editorBlocks={editorBlocks} />
      </div>
    </>
  );
};

export { LigaturesManager };
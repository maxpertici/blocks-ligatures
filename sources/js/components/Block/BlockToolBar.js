
import Debug from '../../helpers/Debug.js';
import {useEffect, useState, useMemo} from 'react';
import { useSelect, useDispatch } from "@wordpress/data";
import Editor from '../../helpers/Editor.js';

const BlockLigaturesToolBar = (props) => {

  const { editorBlocks, clientId, availableLigatures, blockPosition } = props ;


  Debug( { "clientId" : clientId } );
  Debug( { "availableLigatures" : availableLigatures } );
  Debug( { "blockPosition" : blockPosition } );

  // const { block } = useSelect(
  //   (select) => ({
  //     block: select("core/block-editor").getBlock(clientId)
  //   }),
  //   [clientId]
  // );

  // Debug({ "block": block });

  const editor = new Editor();
  
  useEffect(() => {
    editor.watchBlock( clientId );
  }, [ editor ] );

  const styles = {
    block : {
      left      : blockPosition.x ,
      top       : blockPosition.y ,
      transform : `translate( 0px, ${ ( -1 * blockPosition.scrollTop ) }px)`
    }
  }

  return <>
    <div className="blocks-ligatures-block-toolbar" style={styles.block}>
      {clientId}
    </div>
  </>;
};

export { BlockLigaturesToolBar };

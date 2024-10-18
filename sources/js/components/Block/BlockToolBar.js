
import {useEffect, useState, useMemo} from 'react';
import { useSelect, useDispatch } from "@wordpress/data";
import Editor from '../../helpers/Editor.js';

const BlockLigaturesToolBar = (props) => {

  const { editorBlocks, clientId, availableLigatures, blockPosition, blockTranslation, editorLayoutRootTop } = props ;

  const editor = new Editor();

  useEffect(() => {
    editor.watchBlock( clientId );
  }, [ editor ] );

  const styles = {
    block : {
      left      : blockPosition.x ?? 0,
      top       : blockPosition.y ?? 0,
      transform : blockTranslation.scrollTop ? `translate( 0px, ${ ( -1 * ( blockTranslation.scrollTop - editorLayoutRootTop) ) }px)` : `translate( 0px, ${ ( editorLayoutRootTop ) }px)`
    }
  }

  return <>
    <div className="blocks-ligatures-block-toolbar" style={styles.block}>
      {clientId}
    </div>
  </>;
};

export { BlockLigaturesToolBar };

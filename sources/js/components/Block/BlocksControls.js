
import { BlockLigaturesToolBar } from './BlockToolBar.js';
import { useEffect, useState, useMemo } from 'react';
import { useBLStore } from '../../helpers/Store.js';

const BlocksControls = (props) => {

  const { editorBlocks } = props ;

  const ManagerIsActive     = useBLStore( ( state ) => state.ManagerIsActive     )
  const BlocksPositions     = useBLStore( ( state ) => state.BlocksPositions     )
  const BlocksScrolls       = useBLStore( ( state ) => state.BlocksScrolls       )
  const BlocksCapacities    = useBLStore( ( state ) => state.BlocksCapacities    )
  const EditorLayoutRootTop = useBLStore( ( state ) => state.EditorLayoutRootTop )
  

  /**
   * Handle Active State
   */
  const [ isActive, setIsActive   ] = useState( ManagerIsActive ) ;
  const [ positions, setPositions ] = useState( BlocksPositions ) ;
  const [ editorLayoutRootTop, setEditorLayoutRootTop ] = useState( EditorLayoutRootTop ) ;

  useEffect(() => {

    if( ManagerIsActive != isActive ){
      setIsActive( ManagerIsActive ) ;
    }

    console.log( BlocksPositions != positions ) ;

    if( BlocksPositions != positions ){
      setPositions( BlocksPositions ) ;
    }

  }, [ ManagerIsActive, BlocksPositions ]);


  useEffect(() => {

    if( EditorLayoutRootTop != editorLayoutRootTop ){
      setEditorLayoutRootTop( EditorLayoutRootTop ) ;
    }

  }, [ EditorLayoutRootTop ]);

  

  return <>
    { isActive && editorBlocks.map((block) => (
        <div key={block.clientId} className="blocks-ligatures-blocks-controls">
            <BlockLigaturesToolBar editorBlocks={editorBlocks} clientId={block.clientId} editorLayoutRootTop={editorLayoutRootTop} blockTranslation={ BlocksScrolls[block.clientId] ?? { "scrollTop" : null } } blockPosition={ BlocksPositions[block.clientId] ?? { "x" : null, "y" : null } } availableLigatures={ BlocksCapacities[block.clientId] ?? {} } />
        </div>
    ))}
  </>;

};

export { BlocksControls };

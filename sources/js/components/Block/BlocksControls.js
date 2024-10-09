
import { BlockLigaturesToolBar } from './BlockToolBar.js';
import { useEffect, useState, useMemo } from 'react';
import { useBLStore } from '../../helpers/Store.js';

const BlocksControls = (props) => {

  const { editorBlocks } = props ;

  const ManagerIsActive  = useBLStore( ( state ) => state.ManagerIsActive  )
  const BlocksPositions  = useBLStore( ( state ) => state.BlocksPositions  )
  const BlocksCapacities = useBLStore( ( state ) => state.BlocksCapacities )

  /**
   * Handle Active State
   */
  const [ isActive, setIsActive   ] = useState( ManagerIsActive ) ;
  const [ positions, setPositions ] = useState( BlocksPositions ) ;

  useEffect(() => {

    if( ManagerIsActive != isActive ){
      setIsActive( ManagerIsActive ) ;
    }

    if( BlocksPositions != positions ){
      setPositions( BlocksPositions ) ;
    }
  }, [ ManagerIsActive, BlocksPositions ]);

  return <>
    { isActive && editorBlocks.map((block) => (
        <div key={block.clientId} className="blocks-ligatures-blocks-controls">
            <BlockLigaturesToolBar editorBlocks={editorBlocks} clientId={block.clientId} blockPosition={ BlocksPositions[block.clientId] ?? 0 } availableLigatures={ BlocksCapacities[block.clientId] ?? {} } />
        </div>
    ))}
  </>;

};

export { BlocksControls };

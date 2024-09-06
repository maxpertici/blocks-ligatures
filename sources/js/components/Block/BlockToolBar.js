
import Debug from '../../helpers/Debug.js';

const BlockLigaturesToolBar = (props) => {

  const { editorBlocks, clientId, availableLigatures } = props ;

  Debug( { "clientId" : clientId } );
  Debug( { "availableLigatures" : availableLigatures } );


  const getBlockPosition = (clientId) => {
      return editorBlocks.findIndex(block => block.clientId === clientId);
  };

  const blockPosition = getBlockPosition(clientId);
  console.log(`Position of block with clientId ${clientId}: ${blockPosition}`);


  return <>
        <div className="blocks-ligatures-block-toolbar">
        {clientId}
        </div>
        </>;
};

export { BlockLigaturesToolBar };

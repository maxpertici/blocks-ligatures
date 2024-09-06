
import Debug from '../../helpers/Debug.js';

const BlockLigaturesToolBar = (props) => {

  const { clientId, availableLigatures } = props ;

  Debug( { "clientId" : clientId } );
  Debug( { "availableLigatures" : availableLigatures } );

  return <>
        <div className="blocks-ligatures-block-toolbar">
        {clientId}
        </div>
        </>;
};

export { BlockLigaturesToolBar };

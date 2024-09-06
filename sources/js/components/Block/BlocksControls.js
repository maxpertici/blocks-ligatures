
import Debug from '../../helpers/Debug.js';
import { BlockLigaturesToolBar } from './BlockToolBar.js';
import { blocksCapacities } from "../../signals/SignalsPrimitives.js";

const BlocksControls = (props) => {

    const { editorBlocks } = props ;


    return <>
        {editorBlocks.map((block) => (
            <div className="blocks-ligatures-blocks-controls">
                <BlockLigaturesToolBar clientId={block.clientId} availableLigatures={blocksCapacities.value[block.clientId] ?? {}} />
            </div>
        ))}
        </>;
};

export { BlocksControls };

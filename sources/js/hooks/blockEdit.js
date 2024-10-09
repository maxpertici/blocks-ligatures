import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { useEffect, useState, useMemo} from 'react';

const handleLigaturesAttributes = createHigherOrderComponent( (BlockEdit) => {

  return (props) => {

    const { attributes, clientId } = props;
    const { ligatures } = attributes ;
    // const [ blocksCaps, setBlocksCaps ] = useState( blocksCapacities.value );


    // effect(() => {
    //   setBlocksCaps( blocksCapacities.value );
    // }, [blocksCapacities.value]);

    // const availableLigatures = blocksCapacities.value[clientId] ?? {} ;
    // <BlockEditLigaturesControls clientId={clientId} availableLigatures={availableLigatures} />

    return (
      <>
        <BlockEdit key="edit" {...props} />
      </>
    );
  };
}, "withMyPluginControls");

addFilter(
  "editor.BlockEdit",
  "blocks-ligatures/handle-ligatures-attributes",
  handleLigaturesAttributes
);

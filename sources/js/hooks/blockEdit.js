import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { blocksCapacities } from "../signals/SignalsPrimitives.js";
import { effect } from "@preact/signals-react";
import { useEffect, useState, useMemo} from 'react';
import { useSelect, useDispatch } from "@wordpress/data";

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

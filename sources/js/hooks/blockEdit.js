import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { blocksCapacities, LigaturesCollection } from "../others/SignalsPrimitives.js";
import { effect } from "@preact/signals-react";
import { useEffect, useState, useMemo} from 'react';
import { useSelect, useDispatch } from "@wordpress/data";
import { dispatchCollection } from "../functions/dispatch.js";

const handleLigaturesAttributes = createHigherOrderComponent((BlockEdit) => {

  return (props) => {

    const { attributes } = props;
    const { ligatures } = attributes;

    const { editorBlocks } = useSelect(
      (select) => ({
        editorBlocks: select("core/editor").getEditorBlocks(),
      }),
      []
    );



    // Force blocksCapacities if clientID change

    const memoClientID = useMemo(
      () => { return props.clientId },
      [props.clientId]
    );

    // console.log( 'render : :' +  props.clientId);

    const clientID = props.clientId ;

    useEffect( () => {

      if( clientID != memoClientID ){

        // console.log("clientID useEffect : ——————");
        // console.log(props.clientId);
        // console.log(memoClientID);
        // console.log("——————");

        dispatchCollection( editorBlocks, LigaturesCollection.value );
      }

    }, [ memoClientID, editorBlocks ] );


    effect(() => {

      // const references = blocksCapacities.value;
    
      // if( references[ props.clientId ] ){
      //   console.log("yep");
      //   // console.log( references[props.clientId] );
      // }else{
      //   console.log("nope");
      // }

      // console.log("LIGATURES...");

      // const references = blocksCapacities.value;
      // console.log(references);

      // safe test if property exists
      // if( references[ props.clientId ] ){
      //   console.log("yep");
      //   // console.log( references[props.clientId] );
      // }
    });

    
    return (
      <>
        <BlockEdit key="edit" {...props} />
        <p>LIGATURES...</p>
      </>
    );
  };
}, "withMyPluginControls");

addFilter(
  "editor.BlockEdit",
  "blocks-ligatures/handle-ligatures-attributes",
  handleLigaturesAttributes
);

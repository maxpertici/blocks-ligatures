import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { blocksCapacities } from "../others/SignalsPrimitives.js";

const handleLigaturesAttributes = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const { attributes } = props;
    const { ligatures } = attributes;

    const ligaturesDEBUG = ligatures.join(", ");

    // console.log(blocksCapacities.value);
    
    return (
      <>
        <BlockEdit key="edit" {...props} />
        <p>LIGATURES : {ligaturesDEBUG}</p>
      </>
    );
  };
}, "withMyPluginControls");

addFilter(
  "editor.BlockEdit",
  "blocks-ligatures/handle-ligatures-attributes",
  handleLigaturesAttributes
);

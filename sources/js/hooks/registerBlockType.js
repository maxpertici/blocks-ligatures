import { addFilter } from "@wordpress/hooks";

/**
 * Add the attributes for ligatures support
 * @since 0.1.0
 * @param {Object} settings
 */
function addAttributes(settings) {
  
  const ligaturesAttributes = {
    ligatures: {
      type: "array",
      default: [],
    },
  };

  const newSettings = {
    ...settings,
    attributes: {
      ...settings.attributes,
      ...ligaturesAttributes,
    },
  };

  return newSettings;
}

addFilter(
  "blocks.registerBlockType",
  "blocks-ligatures/add-attributes",
  addAttributes
);

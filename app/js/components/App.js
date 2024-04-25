import "../../sass/components/App.scss";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { BlocksLigaturesManager } from "./BlocksLigaturesManager.js";

const App = () => {
  const { editorBlocks } = useSelect(
    (select) => ({
      editorBlocks: select("core/editor").getEditorBlocks(),
    }),
    []
  );

  console.log(editorBlocks);

  return (
    <>
      <BlocksLigaturesManager isActive={true} editorBlocks={editorBlocks} />
    </>
  );
};

export { App };
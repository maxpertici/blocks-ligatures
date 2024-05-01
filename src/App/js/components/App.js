
import { useSelect, useDispatch } from "@wordpress/data";
import { LigaturesManager } from "./LigaturesManager.js";

const App = () => {

  const { editorBlocks } = useSelect(
    (select) => ({
      editorBlocks: select("core/editor").getEditorBlocks(),
    }),
    []
  );


  return (
    <>
      <LigaturesManager editorBlocks={editorBlocks} />
    </>
  );
};

export { App };
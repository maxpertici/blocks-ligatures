
import { useSelect, useDispatch } from "@wordpress/data";
import { LigaturesManager } from "./LigaturesManager.js";

const App = () => {

  const { editorBlocks } = useSelect(
    (select) => ({
      editorBlocks: select("core/editor").getEditorBlocks(),
    }),
    []
  );

  // console.log(editorBlocks);


  return (
    <>
      <LigaturesManager editorBlocks={editorBlocks} />
    </>
  );
};

export { App };
import { LigaturesGrid } from "./LigaturesGrid.js";

const BlocksLigaturesManager = (props) => {
  const { isActive, editorBlocks } = props;

  let managerClassname = "blocks-ligatures-manager";
  if (isActive) {
    managerClassname += " blocks-ligatures-manager--is-active";
  }

  return (
    <>
      <div id="blocks-ligatures-manager" className={managerClassname}>
        <LigaturesGrid editorBlocks={editorBlocks} />
      </div>
    </>
  );
};

export { BlocksLigaturesManager };
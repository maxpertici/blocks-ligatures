import { LigaturesCollection } from "../others/SignalsPrimitives.js";

const LigaturesGrid = (props) => {
  
  const { editorBlocks } = props;

  const joinedClientIds = editorBlocks.map((block) => block.clientId).join(" ");

  return <>{joinedClientIds}</>;
};

export { LigaturesGrid };

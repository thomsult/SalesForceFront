/* delete node */
const deleteNode = (
  currentNodeToDelete,
  nodesToDelete,
  callBackNodes,
  callBackSetCurrentNode
) => {
  // get object Id (nodes object)
  const idNodeToDelete = JSON.parse(currentNodeToDelete).id;
  // set new data without element to delete
  const result = nodesToDelete.filter((el) => el.id !== idNodeToDelete);
  // set new data into nodes
  callBackNodes(result);
  // reset current node
  callBackSetCurrentNode("no current");
};

export default deleteNode;

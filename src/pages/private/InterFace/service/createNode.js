/* creation du noeud & liens */
const createNode = (
  nodesData,
  titleNodeData,
  colorNodeData,
  textNodeData,
  lienNodeData,
  imageNodeData,
  videoNodeData,
  setNodesData,
  setShowCreateButtonData
) => {
  // model node object for front app interface creation
  const nodeObject = {
    id: `${nodesData.length + 1}`,
    name: `${titleNodeData}`,
    color: `${colorNodeData}`,
    size: 50,
    children: [
      {
        id: `${nodesData.length + 1}-1`,
        type: "textes",
        content: textNodeData,
      },
      {
        id: `${nodesData.length + 1}-2`,
        type: "liens",
        content: lienNodeData,
      },
      {
        id: `${nodesData.length + 1}-3`,
        type: "images",
        content: imageNodeData,
      },
      {
        id: `${nodesData.length + 1}-4`,
        type: "vidéos",
        content: videoNodeData,
      },
    ],
  };
  setNodesData([...nodesData, nodeObject]);
  setShowCreateButtonData("");
};

export default createNode;

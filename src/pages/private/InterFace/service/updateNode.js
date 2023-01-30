import * as d3 from "d3";

const updateNode = (
  resetFunc,
  selectedData,
  allNodes,
  methodAllNodes,
  titleNode,
  colorNode,
  textNode,
  lienNode,
  imageNode,
  videoNode
) => {
  const dataCurrent = JSON.parse(selectedData);

  // set new value for nodes state array
  const result = allNodes.map((item) => {
    if (item.id === dataCurrent.id) {
      return {
        ...item,
        name: titleNode,
        color: colorNode,
        children: [
          { ...item.children[0], content: textNode },
          { ...item.children[1], content: lienNode },
          { ...item.children[2], content: imageNode },
          { ...item.children[3], content: videoNode },
        ],
      };
    }
    return item;
  });
  // change text content with the new one
  d3.selectAll(`[data-id="${dataCurrent.id}"`).text(`#${titleNode}`);

  d3.select(`[id="${dataCurrent.id}"]`)
    .attr("fill", `rgba(${colorNode},0.5)`)
    .attr("stroke", `rgba(${colorNode},0.8)`);

  // update nodes
  methodAllNodes(result);
  // reset function
  resetFunc();
};

export default updateNode;

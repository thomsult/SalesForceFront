/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import * as d3 from "d3";

function getfixeWidth() {
  if (window.innerWidth < 1024) {
    return window.innerWidth;
  }
  return window.innerWidth - 320;
}

// eslint-disable-next-line consistent-return
function getfixeHeight() {
  return window.innerHeight - 100;
}

function flatten(rootToFlatten) {
  let i = 0;
  const nodes = [];
  function recurse(currentNode) {
    if (currentNode.children) currentNode.children.forEach(recurse);
    if (!currentNode.id) currentNode.id = ++i;
    else ++i;
    nodes.push(currentNode);
  }
  recurse(rootToFlatten);
  return nodes;
}

function radius(d) {
  return d * 25;
}
// let init = false;
let simulation = null;
let node;
let link = null;
// let init = false;
let nodes;
let links;
let InitData = { children: [] };
export default function GraphVisualisation(data, userId, openMenu) {
  let init = false;
  init = data.children.length === InitData.children.length || false;

  const dimensions = {
    width: getfixeWidth(),
    height: getfixeHeight(),
  };
  InitData = { ...InitData, ...data };
  const root = d3.hierarchy(InitData);

  nodes = flatten(root);
  links = root.links();
  const svg = d3
    .select("#area-svg")
    .attr("class", "cursor-crosshair")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .attr("viewBox", [
      -dimensions.width / 2,
      -dimensions.height / 2,
      dimensions.width,
      dimensions.height,
    ])
    .style("pointer-events", "all");

  const update = () => {
    link = svg
      .select("g")
      .selectAll(".link")
      .data(links, function (d) {
        return d.target.id;
      });

    link.exit().remove();

    // eslint-disable-next-line no-unused-vars
    const linkEnter = link
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", "#000")
      .style("opacity", "0.2")
      .style("stroke-width", 2);

    link = linkEnter.merge(link);

    node = svg
      .select("g")
      .selectAll(".node")
      .attr("name", (e) => e.data.name)
      .data(nodes, function (d) {
        return d.id;
      });
    node.exit().remove();

    const nodeEnter = node
      .enter()
      .append("g")
      .on("click", (e, f) => {
        // eslint-disable-next-line no-use-before-define
        if (!f.data.root && f.depth === 1) {
          openMenu({ data: f.data.name, callBack: null });
        }
        if (f.parent === null) {
          update();
        }
      })
      .attr("depth", (e) => e.depth)
      .attr("class", "node cursor-grab")
      .style("fill", (e) => {
        if (e.data.hashtagAuthor === userId) {
          return "#4bb1d880";
        }
        if (e.parent === null) {
          return "#a7a7a77c";
        }
        return "#d14c3980";
      });

    nodeEnter
      .append("circle")
      .attr("r", function (d) {
        if (d.parent === null) {
          return 25;
        }
        return Math.sqrt(radius(d.data.size)) || 4.5;
      })
      .attr("stroke-width", 5)
      .style("stroke", (e) => {
        if (e.data.hashtagAuthor === userId) {
          return "#4bb1d8cc";
        }
        if (e.parent === null) {
          return "#a7a7a77c";
        }

        return "#d14c39cc";
      });

    nodeEnter
      .append("a")
      .attr("href", (e) => {
        if (!e.data.root && e.depth > 2 && e.data.type === "link") {
          return e.data.name;
        }
        return null;
      })
      .attr("target", "_blank")
      .attr("rel", "noopener noreferrer")
      .append("text")
      .attr("x", (d) =>
        d.children ? `${d.data.size + 7}px` : `${d.data.size + 10}px`
      )
      .attr("y", 0)
      .attr("y", 0)
      .attr("dy", 0)
      .attr("fill", "#374151")
      .text(function (d) {
        return d.data.name || d.data.content;
      });
    nodeEnter.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );
    node = nodeEnter.merge(node);
    simulation.nodes(nodes);
    simulation.force("link").links(links);
  };
  function ticked() {
    if (link && node) {
      link
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });
      node.attr("transform", function (d) {
        return `translate(${d.x}, ${d.y})`;
      });
      init = true;
    } else {
      init = false;
    }
  }
  if (!init) {
    simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id(function (d) {
            return d.id;
          })
          .distance((d) => {
            if (d.source.depth === 0) {
              return 100;
            }
            if (d.source.depth === 1) {
              return 200;
            }
            if (d.source.depth === 2) {
              return 50;
            }
            return d.target.data.size + d.source.depth * 100;
          })
      )
      .force("charge", d3.forceManyBody().distanceMax(3000).strength(-1000))
      .force("center", d3.forceCenter(0, 0))
      .force(
        "collision",
        d3.forceCollide().radius((e) => {
          if (e.parent === null) {
            return 25;
          }
          return Math.sqrt(radius(e.data.size)) || 4.5;
        })
      )
      .on("tick", ticked);

    init = true;
    const zoom = d3
      .zoom()
      .scaleExtent([1 / 8, 64])
      // eslint-disable-next-line no-use-before-define
      .on("zoom", zoomed)
      .filter(function (event) {
        return event.type !== "dblclick" ? event : null;
      });

    svg.call(zoom);
    update();

    window.onresize = handleResize;
  }

  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(1).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  function zoomed(e) {
    d3.select("g").attr("transform", e.transform);
  }

  function handleResize() {
    svg
      .attr("width", getfixeWidth())
      .attr("height", getfixeHeight())
      .attr("viewBox", [
        -dimensions.width / 2,
        -dimensions.height / 2,
        dimensions.width,
        dimensions.height,
      ]);
  }
  return svg;
}

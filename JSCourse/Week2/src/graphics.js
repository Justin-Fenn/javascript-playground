import * as d3 from 'd3';

export function generateTree(treeData){
  // ************** Generate the tree diagram	 *****************
  // set the dimensions and margins of the diagram
  var margin = {top: 40, right: 90, bottom: 50, left: 90},
      width = window.innerWidth - margin.left - margin.right,
      height = window.innerHeight - margin.top - margin.bottom;

  // declares a tree layout and assigns the size
  var treemap = d3.tree()
      .size([width, height]);

  //  assigns the data to a hierarchy using parent-child relationships
  var nodes = d3.hierarchy(treeData);

  // maps the node data to the tree layout
  nodes = treemap(nodes);

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom),
      g = svg.append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

  // adds the links between the nodes
  var link = g.selectAll(".link")
      .data( nodes.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + d.x + "," + d.y
          + "C" + d.x + "," + (d.y + d.parent.y) / 2
          + " " + d.parent.x + "," +  (d.y + d.parent.y) / 2
          + " " + d.parent.x + "," + d.parent.y;
        });

  // adds each node as a group
  var node = g.selectAll(".node")
      .data(nodes.descendants())
    .enter().append("g")
      .attr("class", function(d) { 
        return "node" + 
          (d.children ? " node--internal " : " node--leaf ")
          + d.data.status; })
      .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; });

  // adds the circle to the node
  node.append("circle")
    .attr("r", 10);

  // adds the text to the node
  node.append("text")
    .attr("dy", ".35em")
    .attr("y", function(d) { return d.children ? -20 : 20; })
    .style("text-anchor", "middle")
    .text(function(d) { return d.data.name; });
}

export function forceDirected(data){
    var nodes = d3.hierarchy(data).descendants();
    console.log(nodes);
    // var nodes = d3.range(1000).map(function(i) {
    // return {
    //     index: i
    // };
    // });

    var links = d3.range(nodes.length - 1).map(function(i) {
        return {
            source: Math.floor(Math.sqrt(i)),
            target: i + 1
        };
    });

    var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink(links).distance(20).strength(1))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", ticked);

    var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height;

    d3.select(canvas)
        .call(d3.drag()
            .container(canvas)
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    function ticked() {
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(width / 2, height / 2);

        context.beginPath();
        links.forEach(drawLink);
        context.strokeStyle = "#aaa";
        context.stroke();

        context.beginPath();
        nodes.forEach(drawNode);
        context.fill();
        context.strokeStyle = "#fff";
        context.stroke();

        context.restore();
    }

    function dragsubject() {
        return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
    }

    function dragstarted() {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
    }

    function dragged() {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
        if (!d3.event.active) simulation.alphaTarget(0);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
    }

    function drawLink(d) {
        context.moveTo(d.source.x, d.source.y);
        context.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
        context.moveTo(d.x + 3, d.y);
        context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
    }

}

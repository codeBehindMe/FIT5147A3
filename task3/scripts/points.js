// Get the body
//
// var bdy = d3.select("body");
// var svg = bdy.append("svg");
//
// // Generate some data
//
// var myData = [10, 20, 30, 40, 50, 60];
//
// // assign the data
// var points = svg.selectAll("circles").data(myData);
//
// var pEnter = points.enter().append("circle");
//
//     pEnter.attr("r",10)
//     .attr("cx",function(d){
//         return d;
//     })
//     .attr("cy",function(d){
//         return d;
//     })
//
//
//


// set the data
var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
];
// Set the margins
var margins = {top: 20, right: 80, bottom: 30, left: 50};

// creating the x scale
var xScale = d3.scaleLinear();
xScale.domain([0, d3.max(dataset, function (d) {
    return d[0];
})])
    .range([0, 960 - margins.left - margins.right]);

// creating the y scale
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function (d) {
        return d[1];
    })])
    .range([0, 500 - margins.top - margins.bottom]);


// Creating the x axis
var xAxis = d3.axisBottom(xScale)



var _body = d3.select("body");

var _svg = _body.append("svg")
    .attr("height", 500 - margins.top - margins.bottom)
    .attr("width", 960 - margins.left - margins.right);

var _circles = _svg.selectAll("circles").data(dataset);

var _cEnter = _circles.enter().append("circle");

_cEnter.attr("r", 10)
    .attr("cx", function (d, i) {
        return xScale(d[0]);
    })
    .attr("cy", function (d) {
        return yScale(d[1]);
    })

_svg.append("g").attr("class","x axis").call(xAxis)
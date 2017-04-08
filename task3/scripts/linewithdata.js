/**
 * Created by tillera on 8/04/2017.
 */

// generate data
var xData = [1, 2, 3, 4, 5, 6];
var yData = [2, 5, 3, 6, 7, 8];

var DATA = [];

for (var i = 0; i < xData.length; i++) {
    DATA.push({x: xData[i], y: yData[i]});
}

//
// var DATA = [
//     [10, 20], [20, 90], [30, 50], [40, 33], [50, 95],
//     [60, 12], [70, 44], [80, 67], [90, 21], [100, 88]
// ];

// margins
var MARGINS = {left: 30, right: 30, bottom: 30, top: 30};
var width = 600 - MARGINS.left - MARGINS.right;
var height = 500 - MARGINS.top - MARGINS.bottom;

var xScale = d3.scaleLinear().domain([1, 6]).range([0, width]);
var yScale = d3.scaleLinear().domain([1, 8]).range([height, 0]);


//create line
var line = d3.line().x(function (d) {
    return xScale(d.x);
}).y(function (d) {
    return yScale(d.y);
});


// generate svg object

var svg = d3.select("body").append("svg")
.attr("width",width + MARGINS.left + MARGINS.right)
.attr("height", height + MARGINS.top + MARGINS.bottom)
.append("g")
.attr("transform","translate(" + MARGINS.left + "," + MARGINS.top + ")");


// append line
svg.append("path").data([DATA]).attr("class","line").attr("d",line);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
// Add the Y Axis
svg.append("g")
    .call(d3.axisLeft(yScale));




/**
 * Created by tillera on 7/04/2017.
 */


// data
var DATA = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
];
// set the margins
var MARGINS = {top: 50, bottom: 50, left: 100, right: 50};


// Create the svg object.

var svg = d3.select("body").append("svg")
    .attr("height", 480)
    .attr("width", 640);

// Generate the scaling factors.
// x - scale

var xScale = d3.scaleLinear().domain(
    [
        d3.min(DATA, function (d) {
            return d[0];
        }),
        d3.max(DATA, function (d) {
            return d[0];
        })
    ]
).range(
    [
        MARGINS.left,
        640 - MARGINS.right
    ]
);


// y scale
var yScale = d3.scaleLinear().domain(
    [
        d3.min(DATA, function (d) {
            return d[1];
        }),
        d3.max(DATA, function (d) {
            return d[1];
        })
    ]
).range(
    [
        640 - MARGINS.top,
        MARGINS.bottom
    ]
);

// Generate the x axis
var xAxis = d3.axisBottom(xScale);
// generate the y axis
var yAxis = d3.axisLeft(yScale);

// Append it to the svg
svg.append('g').attr('class', 'x axis').call(xAxis);
svg.append('g').attr('class', 'y axis').call(yAxis);


// generate a line
var line = d3.line().x(
    function (d) {
        return xScale(d[0]);
    }
)
    .y(
        function (d) {
            return yScale(d[1]);
        }
    );

svg.append("path")
    .data([DATA])
    .attr("class", "line")
    .attr("d", line);
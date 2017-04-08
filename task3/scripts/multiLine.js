/**
 * Created by tillera on 8/04/2017.
 */


var xData = [1, 2, 3, 4, 5, 6];
var yOne = [2, 4, 3, 7, 9, 8];
var yTwo = [1, 5, 3, 2, 6, 1];


var DATA = [];
for (var i = 0; i < xData.length; i++) {
    DATA.push({x: xData[i], y: yOne[i], z: yTwo[i]});
}


// margins
var MARGINS = {left: 30, right: 30, bottom: 30, top: 30};
var width = 600 - MARGINS.left - MARGINS.right;
var height = 500 - MARGINS.top - MARGINS.bottom;


//scales
var xScale = d3.scaleLinear().domain([0, 10]).range([0,600 + MARGINS.left + MARGINS.right]);
var yScale = d3.scaleLinear().domain([0, 10]).range([500 + MARGINS.left + MARGINS.right,0]);


var line1 = d3.line().x(function (d){
    return xScale(d.x);
}).y(function(d){
    return yScale(d.y);
});


var line2 = d3.line().x(function (d){
    return xScale(d.x);
}).y(function(d){
    return yScale(d.z);
});

// set svg
var svg = d3.select("body").append("svg")
    .attr("width",width + MARGINS.left + MARGINS.right)
    .attr("height", height + MARGINS.top + MARGINS.bottom)
    .append("g")
    .attr("transform","translate(" + MARGINS.left + "," + MARGINS.top + ")");

// append axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
// Add the Y Axis
svg.append("g")
    .call(d3.axisLeft(yScale));

svg.append("path").data([DATA]).attr("class","line").attr("d",line1);
svg.append("path").data([DATA]).attr("class","line").attr("d",line2);
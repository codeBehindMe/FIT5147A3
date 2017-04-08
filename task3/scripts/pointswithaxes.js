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








// append the svg and set properties.
var svg = d3.select("body").append("svg");
svg.attr("height",480).attr("width",640);

// Make the scaling parameters
yScale = d3.scaleLinear().domain([d3.min(DATA, function (d) {
    return d[1];
}), d3.max(DATA, function (d) {
    return d[1];
})]).range([590,0]);

xScale = d3.scaleLinear().domain([d3.min(DATA,function(d){
    return d[0];
}),d3.max(DATA,function(d){
    return d[0];
})]).range([MARGINS.left, 480 - MARGINS.right]);

// Make the x axis
xAxis = d3.axisBottom(xScale);
// Make the y axis
yAxis = d3.axisRight(yScale);


// Append the axis to the svg
svg.append("g").attr("class","x axis").call(xAxis);
svg.append("g").attr("class","y axis").call(yAxis);


svg.selectAll("circles").data(DATA).enter().append("circle")
    .attr("r",10)
    .attr("cx",function(d){
        return xScale(d[0]);
})
    .attr("cy",function(d){
        return yScale(d[1]);
    });






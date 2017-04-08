/**
 * Created by tillera on 8/04/2017.
 */


// Index javascript


    // Hardcoding the data because its against my moral being to read files with javascript.
    // Yep, you heard me, moral being.
    // You may ask, but Aaron, oh but oh how will you ever upload a file from the front end.
    // well let me say since .NET MVC 3.0 we can just Request.Files object to get them. Boom !
    // Join the rebellian, stop javascript from reading files.
var months = ["Jan", "Mar", "Feb", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    mrf = [47, 46, 44, 53, 68, 43, 49, 57, 53, 65, 57, 58],
    mrd = [8, 7, 9, 12, 15, 15, 16, 16, 15, 14, 12, 10],
    srf = [131, 126, 164, 133, 101, 140, 56, 99, 65, 88, 116, 85],
    srd = [16, 14, 15, 12, 13, 13, 11, 10, 11, 13, 15, 14],
    crf = [320, 380, 360, 190, 110, 50, 30, 20, 40, 50, 130, 130],
    crd = [19, 19, 19, 19, 16, 12, 11, 10, 9, 10, 12, 16];


var DATA = [];
for (var i = 0; i < months.length; i++) {
    DATA.push({month: months[i], mrf: mrf[i], mrd: mrd[i], srf: srf[i], srd: srd[i], crf: crf[i], crd: crd[i]});
}


var MARGINS = {left: 30, right: 30, bottom: 30, top: 30};
var width = 600 - MARGINS.left - MARGINS.right;
var height = 500 - MARGINS.top - MARGINS.bottom;

// seriously, did this in R; one function call :  max(dataFrame) / min(dataFrame)
var domMax = 380;
var domMin = 7;

// generate scales.
var xScale = d3.scaleBand().domain(months).rangeRound([0, width]);
var yScale = d3.scaleLinear().domain([domMin, domMax]).range([height, 0]);


// Generate lines
var mLine = d3.line().x(function (d) {
    return xScale(d.month);
}).y(function (d) {
    return yScale(d.mrf);
});




// set svg
var svg = d3.select("body").append("svg")
    .attr("width", width + MARGINS.left + MARGINS.right)
    .attr("height", height + MARGINS.top + MARGINS.bottom)
    .append("g")
    .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")");
// Set axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
svg.append("g")
    // .attr("transform", "translate(" + width + ", 0)")
    .call(d3.axisLeft(yScale));


// generate dots
var mDots = svg.selectAll("circles").data(DATA).enter().append("circle").attr("r",5).attr("cx", function(d){
    return xScale(d.month);
}).attr("cy",function(d){
    return yScale(d.mrf);
}).attr("fill","red");


// set line
svg.append("path").data([DATA]).attr("class", "line1").attr("d", mLine).attr('stroke', function (d) {
    return 'red'
}).attr('fill', function (d) {
    return 'none'
})

//     .attr("data-legend", function (d) {
//         return "melbourne"
//     });
//
// legend = svg.append("g")
//     .attr("class", "legend")
//     .attr("transform", "translate(50,30)")
//     .style("font-size", "12px")
//     .call(d3.legend)


// Set text
svg.append('text')
    .attr("transform", "translate(" + (xScale(DATA[11].month)) + "," + yScale(DATA[1].mrf) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "red")
    .text("Melbourne");
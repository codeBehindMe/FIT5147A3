/**
 * Created by tillera on 8/04/2017.
 */

// Index javascript


// Hardcoding the data because its against my moral being to read files with javascript.
// Yep, that's right, against my moral being.
    // You may ask, but Aaron, oh but oh, how will you ever upload a file from the front end.
// well let me tell you, since .NET MVC 3.0 we can just Request.Files object to get them. Boom !
// Join the rebellion, stop javascript from reading files.
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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


var MARGINS = {left: 100, right: 100, bottom: 50, top: 30};
var width = 1080 - MARGINS.left - MARGINS.right;
var height = 500 - MARGINS.top - MARGINS.bottom;

// seriously, did this in R; one function call :  max(dataFrame) / min(dataFrame)
var domMax = 380;
var domMin = 7;

// generate scales.
var xScale = d3.scalePoint().domain(months).rangeRound([0, width]);
var yScale = d3.scaleLinear().domain([domMin, domMax]).range([height, 0]);

var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);


// Generate lines
var mLine = d3.line().x(function (d) {
    return xScale(d.month);
}).y(function (d) {
    return yScale(d.mrf);
});

var sLine = d3.line().x(function (d) {
    return xScale(d.month);
}).y(function (d) {
    return yScale(d.srf);
});

var cLine = d3.line().x(function (d) {
    return xScale(d.month);
}).y(function (d) {
    return yScale(d.crf);
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
    .call(d3.axisLeft(yScale));


// generate dots
var mDots = svg.selectAll("circles").data(DATA).enter().append("circle").attr("r", 5).attr("cx", function (d) {
    return xScale(d.month);
}).attr("cy", function (d) {
    return yScale(d.mrf);
}).attr("fill", "DeepPink")
    .on("mouseover", function (d) {
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
        div.html("<strong>Melbourne</strong>" +"<br />" + "Rain Days: " + d.mrd + "<br />" + "Rainfall (mm): " + d.mrf)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 50) + "px")
            .style("background", "DeepPink")
    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });


var sDots = svg.selectAll("circles").data(DATA).enter().append("circle").attr("r", 5).attr("cx", function (d) {
    return xScale(d.month);
}).attr("cy", function (d) {
    return yScale(d.srf);
}).attr("fill", "SpringGreen")
    .on("mouseover", function (d) {
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
        div.html("<strong>Sydney</strong>" +"<br />" +"Rain Days: " + d.srd + "<br />" + "Rainfall (mm): " + d.srf)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 50) + "px")
            .style("background", "SpringGreen")
    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });

var cDots = svg.selectAll("circles").data(DATA).enter().append("circle").attr("r", 5).attr("cx", function (d) {
    return xScale(d.month);
}).attr("cy", function (d) {
    return yScale(d.crf);
}).attr("fill", "RoyalBlue")
    .on("mouseover", function (d) {
        div.transition()
            .duration(200)
            .style("opacity", 0.9);
        div.html("<strong>Cairns</strong>" +"<br />" + "Rain Days: " + d.crd + "<br />" + "Rainfall (mm): " + d.crf)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 50) + "px")
            .style("background", "RoyalBlue")
    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });


// set line
svg.append("path").data([DATA]).attr("class", "mline").attr("d", mLine).attr('stroke', function (d) {
    return 'DeepPink'
}).attr('fill', function (d) {
    return 'none'
});

svg.append("path").data([DATA]).attr("class", "sline").attr("d", sLine).attr('stroke', function (d) {
    return 'SpringGreen'
}).attr('fill', function (d) {
    return 'none'
});

svg.append("path").data([DATA]).attr("class", "cline").attr("d", cLine).attr('stroke', function (d) {
    return 'RoyalBlue'
}).attr('fill', function (d) {
    return 'none'
});


// Set text
svg.append('text')
    .attr("transform", "translate(" + (xScale(DATA[11].month)) + "," + (yScale(DATA[11].mrf) + 15) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "DeepPink")
    .text("Melbourne");


svg.append('text')
    .attr("transform", "translate(" + (xScale(DATA[11].month)) + "," + (yScale(DATA[11].srf) + 15) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "SpringGreen")
    .text("Sydney");

svg.append('text')
    .attr("transform", "translate(" + (xScale(DATA[11].month)) + "," + (yScale(DATA[11].crf) + 15) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "RoyalBlue")
    .text("Cairns");


// Title
svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (MARGINS.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .style("font-family","Sans-serif")
    .text("Average Rainfall by Month");


// Axis labels
svg.append("text")
    .attr("x", (width/2))
    .attr("y", height + 30)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-family","Sans-serif")
    .text("Month");


svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", "-3.75em")
    .attr("transform", "rotate(-90)")
    .style("font-size", "13px")
    .style("font-family","Sans-serif")
    .text("Rainfall (mm)");
/**
 * Created by tillera on 7/04/2017.
 */




// Simple linegraph using d3
var m = [80, 80, 80, 80] //margins
var w = 1000 - m[1] - m[3] // width
var h = 400 - m[0] - m[2] // height

// some simple data
var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7];

// scale x to fit values from 0 to the max data value within the pixels of 0 and width.
var x = d3.scaleLinear().domain([0, data.length]).range([0, w])

// scale values from 0 - 10 to fit within the pixels of height. (note that the inverted domain for height, bigger is up).
var y = d3.scaleLinear().domain([0, 10]).range([h, 0]);


// create a function that converts the arra y into x and y points

var line = d3.line()
    .x(function (d, i) {
    // verbose logging to show what's going on.
        console.log('plotting x value for datapoint: ' + d + ' using index: ' + i + ' to be at L ' + x(i) + ' using our xScale.')
        // return the x coordinate of the datapoint.
        return x(i);
    })
    .y(function(d){
        // verbose logging to show what's going on.
        console.log('plotting y value for data point: ' + d + ' to be at: ' + y(d) + ' using our yScale.');

        return y(d);
    })


    // Add an svg element with the desired dimensions and margin
    var graph = d3.select('#graph').append("svg:svg")
        .attr("width",w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .append("svg:g")
        .attr("transform","translate(" + m[3] + "," + m[0] + ")");


    // create yAxis


    // create yAxis
    var xAxis = d3.axisBottom()
        .scale(x)
    // Add the x-axis.
    graph.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);
    // create left yAxis
    var yAxisLeft = d3.axisLeft()
        .scale(y)
    // Add the y-axis to the left
    graph.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(-25,0)")
        .call(yAxisLeft);

    // Add the line by appending an svg:path element with the data line we created above
    // do this AFTER the axes above so that the line is above the tick-lines
    graph.append("svg:path").attr("d", line(data));

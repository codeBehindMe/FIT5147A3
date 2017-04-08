/**
 * Created by tillera on 7/04/2017.
 */


if (false) {
    // Selecting elements.
    // var circle = d3.selectAll("circle") // this selects all elements into variable circle.

// With selection we can now change the attributes of all the selected circles.

    circle.style("fill", "steelblue");
    circle.attr("r", 30);

// we can also iterate over the selected items and assign values using anonymous functions.

    circle.attr("cx", function () {
        return Math.random() * 720;
    });

//we can bind data to the circles using selection.data method.
//but binding alone will not give it any property, just means its available to the selection.
// The first index item in the data array is bound to the first element in the selection.
    circle.data([32, 52, 112]);


//after the data is bound, it is accessible as teh first argument to attribute and style functions.
// by convention we typically use the name d to refer to the bound data.

    circle.attr("r", function (d) {
        return Math.sqrt(d);
    });

// There is a second optinal argument which you can use once its bound, which is the index of the element within its selecction.
    circle.attr("cx", function (d, i) {
        return i * 100 + 30;
    });

// Lets text plot a scatter plot.
    circle.attr("cx", function (d) {
        return d;
    })
        .attr("cy", function (d) {
            return d;
        });
}


// if we had four numbers to disiplay rather than 3, we would need to generate some additional circles.

// We use the enter method to do so.

if (true) {

    // We are just selecting the svg element (not ricles)
    var svg = d3.select("svg");

    // Next get the circles and bind the data.
    var circle = svg.selectAll("circle").data([32, 57, 112, 293]);

    // first update the ones that are already there
    circle.attr("cy",function(d){
        return 60;
    })
        .attr("cx",function(d,i){
            return i * 100 +30;
        })
        .attr("r",function(d){
            return Math.sqrt(d);
        })

    // Then we can enter into the circles and append any missing from teh data.
    var circleEnter = circle.enter().append("circle");

    // Entering elements are already bound to the data, so we can just hit the attributes as we did with before.

    circleEnter.attr("cy", function (d) {
        return 60;
    });
    circleEnter.attr("cx", function(d, i) { return i * 100 + 30; });
    circleEnter.attr("r", function(d) { return Math.sqrt(d); });

}
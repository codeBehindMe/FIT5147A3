/**
 * Created by tillera on 7/04/2017.
 */

// Some random data
var numbers = [5, 4, 10, 1],
    data = [
        {date: '2014-01-01', amount: 10},
        {date: '2014-02-01', amount: 20},
        {date: '2014-03-01', amount: 40},
        {date: '2014-04-01', amount: 80}
    ];


// scaling the y axis
var y = d3.scaleLinear()
    .domain([0, 80])
    .range([200, 0]);


// scaling the x axis
var x = d3.scaleTime()
    .domain([
        new Date(Date.parse('2014-01-01')),
        new Date(Date.parse('2014-04-01'))
    ])
    .range([0, 300]);

// setting up the x axis
var xAxis = d3.axisBottom(x)
    .ticks(4);


// creatign an svg element in the body and set the dimensions.
var svg = d3.select('body')
    .append('svg')
    .attr('width', 300)
    .attr('height', 150);


svg.append('g') // create a <g> element
    .attr('class','x axis') // specify the class
    .call(xAxis) // let the axis do its thing


// Binding data //
var sales = [
    { product: 'Hoodie',  count: 7 },
    { product: 'Jacket',  count: 6 },
    { product: 'Snuggie', count: 9 },
];


var svg = d3.select('svg');
svg.size();

var rects = svg.selectAll('rect')
.data(sales);

rects.size();


var newRects = rects.enter();


var maxCount = d3.max(sales, function(d,i){
    return d.count;
});

// var x = d3.scaleLinear()
//     .range([0,300])
//     .domain([0,maxCount]);
//
// var y = d3.scaleOrdinal()
//     .rangeRoundBands([0,75])
//     .domain(sales.map(function(d,i){
//         return d.product;
//     }));
//
// newRects.append('rect')
//     .attr('x',x(0))
//     .attr('y',function(d,i){
//         return y(d.product);
//     })
//     .attr('height',y.rangeBand())
//     .attr('width;', function(d,i){
//         return x(d.count);
//     });
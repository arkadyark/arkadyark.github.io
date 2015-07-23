var width = 700,
    height = 500;

var centralities_svg = d3.select("#centrality_histogram").append("svg")
.attr("width", width)
.attr("height", height)

d3.json("centrality_frequencies.json", function(error, data) {
    
});

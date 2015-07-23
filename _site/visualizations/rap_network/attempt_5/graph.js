$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
    });
});

var width = 960,
    height = 610,
    selectedNode = undefined,
    intermediateNodes = [],
    coloredEdges = [],
    dashedEdges = [];

var artistName = $("#autocomplete-second")
var artistNameSuggestion = $("#artist_name_suggestion")
var artistPicture = $("#artist-picture")
var yeezyNumber = $("#yeezy-number")
var yeezyPath = $("#path-to-yeezy")

var artist_names = ["Kanye West", "Jay Z", "Kendrick Lamar", "Diddy", "Drake", "Lil Wayne", "Big Sean", "Jeezy", "Pusha T", "J. Cole", "Common", "2 Chainz", "Nicki Minaj", "Tyler, The Creator", "Ludacris", "Talib Kweli", "Cam'ron", "Nas", "KRS-ONE", "RZA", "T.I.", "Rick Ross", "Lupe Fiasco", "Yasiin Bey", "Eminem", "Raekwon", "Scarface", "Busta Rhymes", "Chief Keef", "E-40", "Jadakiss", "Future", "Ol' Dirty Bastard", "Frank Ocean", "Ghostface Killah", "Twista", "Pete Rock", "Wale", "Ty Dolla $ign", "Dr. Dre", "The Notorious B.I.G.", "Ja Rule", "Outkast", "Killer Mike", "DMX", "50 Cent", "Meek Mill", "Lil Kim", "Kurupt", "YG", "Nipsey Hu$$le", "Birdman", "ScHoolboy Q", "Wiz Khalifa", "2Pac", "Young Thug", "Juicy J", "Master P", "Boosie Badazz", "Rich Homie Quan", "A$AP Rocky", "Royce Da 5'9\"", "Yelawolf", "Big KRIT", "Danny Brown", "Action Bronson", "Joey BADA$$", "Ab-Soul", "Ace Hood", "Jay Rock", "Tech N9ne", "B.o.B", "Mac Miller", "Snoop Dogg", "Childish Gambino", "Curren$y", "Murs", "The Roots", "Gucci Mane", "Logic", "Fat Joe", "LL Cool J", "Nelly", "Bone Thugs-n-Harmony", "Waka Flocka Flame", "Trey Songz", "Mystikal", "Bun B", "Soulja Boy", "Krizz Kaliko", "Lil B", "Wyclef Jean", "Chance The Rapper", "Kevin Gates", "Hodgy Beats", "Prodigy (Mobb Deep)", "Asher Roth", "Ice Cube", "Nate Dogg", "El-P", "AZ", "Mobb Deep", "Havoc", "De La Soul", "Beastie Boys", "Xzibit", "Kool G. Rap", "Inspectah Deck", "MC Guru", "Freddie Gibbs", "Killah Priest", "Method Man", "MF DOOM", "Cappadonna", "Madlib", "RiFF RAFF", "Masta Ace", "Krayzie Bone", "Brother Ali", "Redman", "Outlawz", "Ice-T", "Three 6 Mafia", "Ras Kass", "Aesop Rock", "Cunninlynguists", "Prince Paul", "Erick Sermon", "E.P.M.D.", "Atmosphere", "Rakim", "A Tribe Called Quest", "Run-D.M.C.", "Eyedea", "Cannibal Ox", "UGK", "Pimp C", "GZA", "Kool Keith", "Das EFX", "Gang Starr", "Goodie Mob", "Cypress Hill", "Clipse", "Biz Markie", "Jungle Brothers", "Jay Electronica", "Jeru the Damaja", "Canibus", "Earl Sweatshirt", "U-God", "Masta Killa", "Eazy-E", "Big L", "Lauryn Hill", "Big Punisher", "Slick Rick", "Public Enemy", "Chuck D", "Big Boi", "Andre 3000", "Black Thought", "The Underachievers", "Flatbush Zombies", "Capital STEEZ", "CJ Fly", "Casey Veggies", "Big Daddy Kane", "Immortal Technique", "Pharoahe Monch", "MC Lyte", "Kool Moe Dee", "Queen Latifah", "Beanie Sigel", "Domo Genesis", "Game", "Rae Sremmurd"];

$(document).ready(function ()
        {  
            $("#autocomplete").focus()
        });

var color = d3.scale.category20();

// rescale g
function rescale() {
    trans=d3.event.translate;
    scale=d3.event.scale;

    vis.attr("transform",
            "translate(" + trans + ")"
            + " scale(" + scale + ")");
}

    var zoom = d3.behavior.zoom()
.scaleExtent([0.5, 10])
    .on("zoom", rescale);

    function mousedown() {
        vis.call(zoom);
        return;
    }


previousSelection = undefined

function highlightNode(d, d3Selection) {
    if (previousSelection != undefined) {
        clearHighlight(previousSelection.d, previousSelection.d3Selection)
    }
    previousSelection = {d : d, d3Selection : d3Selection}
    clearHighlight(d, d3Selection)
        svg.attr("class", "pointer-cursor")
        d3Selection.attr("r", 9)
        artistName.val(d.name)
        artistPicture.attr("src", d.image)

        if (d.name == artist_name) {
            d3.select("#artist-number-label").style("display", "none")
                var sentence = "<p>"
                sentence += d.name
                sentence += " doesn't need a "
                sentence += d.name
                sentence += " number, bitch."
                sentence += "</p>"
                d3.select("#bitch").html(sentence).style("display", "block");

        } else {
            d3.select("#artist-number-label").style("display", "inline")
                yeezyNumber.html(d.yeezy_number[artist_name])
                if (yeezy_only) {
                    d.yeezy_path = {"Kanye West": d.yeezy_path};
                }
            $.each(d.yeezy_path[artist_name], function(key, value) {
                // Color edges on the way to the centre
                var edge = d3.select("#a" + CryptoJS.SHA1(value.to) + CryptoJS.SHA1(value.from))
                    if (edge[0][0]) {
                        // Look for the edge from a to b
                        edge.attr("class", "path-to-centre")
                            .attr("stroke-width", function(d) {
                                return Math.sqrt(d[3])
                            })
                        coloredEdges.push(edge)
                    } else {
                        // Look for the edge from b to a
                        var edge = d3.select("#a" + CryptoJS.SHA1(value.from) + CryptoJS.SHA1(value.to))
                            if (edge[0][0]) {
                                edge.attr("class", "path-to-centre")
                                    .attr("stroke-width", function(d) {
                                        return Math.sqrt(d[3])
                                    })
                                coloredEdges.push(edge)
                            } else {
                                // Edge not found (threshold too high)
                                dashedEdges.push({"source" : d3.select("#a" + CryptoJS.SHA1(value.from)), "target" : d3.select("#a" + CryptoJS.SHA1(value.to))})

                                    dashedLink = vis.selectAll(".dashed-link")
                                    .data(dashedEdges)
                                    .enter().insert("path", ":first-child")
                                    .attr("class", "dashed-link")
                                    .attr("stroke-dasharray", "3,6")
                                    .attr("stroke-width", "2")
                                    .attr("d", function(d) {
                                        var sourceX = d.source.attr("transform").split('(')[1].split(',')[0]
                                            var sourceY = d.source.attr("transform").split('(')[1].split(',')[1].replace(')', '')
                                            var targetX = d.target.attr("transform").split('(')[1].split(',')[0]
                                            var targetY = d.target.attr("transform").split('(')[1].split(',')[1].replace(')', '')
                                            return "M" + sourceX + "," + sourceY
                                            + "L" + targetX + "," + targetY;
                                    });
                            }
                    }

                // Color nodes on the way to the centre
                var intermediateNode = d3.select("#a" + CryptoJS.SHA1(value.to))
                    intermediateNode.style("fill", function(d) {
                        if (d.name != artist_name) {
                            return d3.rgb(255, 106, 71);
                        } else {
                            return d3.rgb(255, 0, 0);
                        }
                    })
                intermediateNodes.push(intermediateNode)

                    // Write out the path
                    var sentence = "<p>"
                    sentence += value.from
                    sentence += " and "
                    sentence += value.to
                    sentence += " collaborated on "
                    sentence += "<em>" + value.song + "</em>"
                    sentence += "</p>"
                    yeezyPath.append($(sentence))
            })
        }
}

function clearHighlight(d, d3Selection) {
    d3.select("#bitch").html("").style("display", "none");
    d3.select("#artist-number-label").style("display", "none")
        svg.attr("class", "open-hand-cursor")
        d3Selection.attr("r", 5)
        artistName.blur();
    artistName.val("");
    artistPicture.attr("src", "http://a5.mzstatic.com/us/r30/Purple1/v4/bc/8e/81/bc8e8110-9b14-5e5f-a6b7-9a6d18adac6f/icon320x320.jpeg")
        yeezyNumber.html("")
        yeezyPath.html("")

        // Uncolor edges
        $.each(coloredEdges, function(key, value) {
            // Color edges on the way to the centre
            value.attr("class", "link")
                .attr("stroke-width", function(d) {
                    return Math.sqrt(d[3])/5
                })
        })
    coloredEdges = []

        // Uncolor nodes 
        $.each(intermediateNodes, function(key, value) {
            // Color edges on the way to the centre
            value.style("fill", function(d) { 
                if (d.name == artist_name) {
                    return d3.rgb(255, 0, 0);
                } else {
                    return d3.rgb(30, 119, 180); 
                }
            })
        })
    intermediateNodes = []

        d3.selectAll('.dashed-link').remove()
        dashedEdges = []
}


var force = d3.layout.force().size([width, height]);

var svg = d3.select("#graph-svg-wrapper").append("svg")
.attr("width", width)
.attr("height", height)
.attr("class", "open-hand-cursor");

svg.on("mousedown.drag", function() {
    svg.attr("class", "closed-hand-cursor");
}).on("mouseup.drag", function() {
    svg.attr("class", "open-hand-cursor");
})

var vis = svg.append('svg:g')

// Set initial zoom/position
vis.attr("transform",
        "translate(100,150)"
        + " scale(.75)");

svg.call(zoom)
    .on("dblclick.zoom", null)

    d3.json("yeezy_network.json", function(error, graph) {
        yeezy_only = true;
        console.log("Loaded yeezied");
        thresholdValue = 10;
        artist_name = "Kanye West";
        makeGraph(graph, thresholdValue, artist_name);
    });

d3.json("yeezified_network.json", function(error, graph) {
    yeezy_only = false;
    console.log("Loaded yeezified")

        thresholdValue = 10;
    artist_name = "Kanye West";

    $('#autocomplete').autocomplete({
        source: function(request, response) {
            var results = $.ui.autocomplete.filter(artist_names, request.term);
            response(results.slice(0, 4));
        },
        select : function(event, ui) {
            artist_name = ui.item.value;
            makeGraph(graph, thresholdValue, artist_name);
            artistName.focus();
        }
    });

    $('#autocomplete-second').autocomplete({
        source: function(request, response) {
            var results = $.ui.autocomplete.filter(artist_names, request.term);
            response(results.slice(0, 4));
        },
        select: function(event, ui) {
            second_artist_name = ui.item.value;
            for (var nodeIndex = 0, l = graph.nodes.length; nodeIndex < l; nodeIndex ++) {
                var d = graph.nodes[nodeIndex];
                if (d.name == second_artist_name) {
                    highlightNode(d, d3.select("#a" + CryptoJS.SHA1(second_artist_name)))
                }
            }
        }
    });

    d3.select('#threshold-slider').call(d3.slider()
            .value(thresholdValue)
            .on("slide", function(evt, value) {
                thresholdValue = value;
                makeGraph(graph, value, artist_name);
            }))

    makeGraph(graph, thresholdValue, artist_name);
})

function makeGraph(graph, value, artist_name) {
    vis.selectAll('*').remove();
    var nodes = graph.nodes.slice(),
    links = [],
        bilinks = [];
    // Label artist/threshold
    d3.select("#artist-label").html(artist_name);
    d3.select("#threshold-label").html(Math.ceil(Math.pow(value/10, 2)) + 1);
    var slider_threshold = Math.pow(value/10, 2);
    // Create intermediate nodes for bezier curves
    graph.links.forEach(function(link) {
        if (link.value > slider_threshold) {
            var s = nodes[link.source],
                t = nodes[link.target],
            i = {}; // intermediate node
            nodes.push(i);
            var firstHalf = {source : s, target : i, weight : link.value}
            var secondHalf = {source : i, target : t, weight : link.value}
            var bilink = [s, i, t, link.value, link.songs];
            links.push(firstHalf, secondHalf);
            bilinks.push(bilink);
        }
    });

    force.linkStrength(function(d) {
        return (1/d.weight^2);
    })

    force
        .nodes(nodes)
        .links(links)
        .start();

    var link = vis.selectAll(".link")
        .data(bilinks)
        .enter().append("path")
        .attr("class", "link")
        .attr("id", function(d) {
            return 'a' + CryptoJS.SHA1(d[0].name) + CryptoJS.SHA1(d[2].name)
        })
    .attr("stroke-width", function(d) {
        return Math.sqrt(d[3])/5
    })
    var node = vis.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("id", function(d) {
            return "a" + CryptoJS.SHA1(d.name)
        })
    .attr("r", 5)
        .style("fill", function(d) { 
            if (d.name == artist_name) {
                return d3.rgb(255, 0, 0);
            } else {
                return d3.rgb(30, 119, 180); 
            }
        })
    .call(force.drag);

    dashedLink = vis.selectAll(".dashed-link")
        .data(dashedEdges)
        .enter().append("path")

        node.append("title")
        .text(function(d) { return d.name; });

    node.on("mouseover", function(d) {
        highlightNode(d, d3.select(this))

    }).on("mouseout", function(d) {
        clearHighlight(d, d3.select(this));
    });

    force.on("tick", function() {
        link.attr("d", function(d) {
            return "M" + d[0].x + "," + d[0].y
                + "S" + d[1].x + "," + d[1].y
                + " " + d[2].x + "," + d[2].y;
        });
        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
        dashedLink.attr("d", function(d) {
            var sourceX = d.source.attr("transform").split('(')[1].split(',')[0]
                var sourceY = d.source.attr("transform").split('(')[1].split(',')[1].replace(')', '')
                var targetX = d.target.attr("transform").split('(')[1].split(',')[0]
                var targetY = d.target.attr("transform").split('(')[1].split(',')[1].replace(')', '')
                return "M" + sourceX + "," + sourceY
                + "L" + targetX + "," + targetY;
        });
    });
}

var fs = require('fs')

/**
 * Basic priority queue implementation. If a better priority queue is wanted/needed,
 * this code works with the implementation in google's closure library (https://code.google.com/p/closure-library/).
 * Use goog.require('goog.structs.PriorityQueue'); and new goog.structs.PriorityQueue()
 */
function PriorityQueue () {
    this._nodes = [];

    this.enqueue = function (priority, key) {
        this._nodes.push({key: key, priority: priority });
        this.sort();
    }
    this.dequeue = function () {
        return this._nodes.shift().key;
    }
    this.sort = function () {
        this._nodes.sort(function (a, b) {
            return a.priority - b.priority;
        });
    }
    this.isEmpty = function () {
        return !this._nodes.length;
    }
}

/**
 * Pathfinding starts here
 */
function Graph(){
    var INFINITY = 1/0;
    this.vertices = {};

    this.addVertex = function(name, edges){
        this.vertices[name] = edges;
    }

    this.shortestPath = function (start, finish) {
        var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
            path = [],
            smallest, vertex, neighbor, alt;

        for(vertex in this.vertices) {
            if(vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(0, vertex);
            }
            else {
                distances[vertex] = INFINITY;
                nodes.enqueue(INFINITY, vertex);
            }

            previous[vertex] = null;
        }

        while(!nodes.isEmpty()) {
            smallest = nodes.dequeue();

            if(smallest === finish) {
                path;

                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }

                break;
            }

            if(!smallest || distances[smallest] === INFINITY){
                continue;
            }

            for(neighbor in this.vertices[smallest]) {
                alt = distances[smallest] + this.vertices[smallest][neighbor];

                if(alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = smallest;

                    nodes.enqueue(alt, neighbor);
                }
            }
        }

        return path;
    }
}


fs.readFile('network_handpicked.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    data = JSON.parse(data)
    var g = new Graph();
    nodes = data.nodes
    links = data.links

    paths = {}

    edges = {}
    collabs = {}
    for (var i = 0, l = nodes.length; i < l; i ++) {
        var v = nodes[i];
        v["yeezy_number"] = {};
        v["yeezy_path"] = {};
        edges[v.name] = {}
        collabs[v.name] = {}
    }

    for (var i = 0, l = links.length; i < l; i ++) {
        if (links[i].target != null) {
            source = nodes[links[i].source].name
            target = nodes[links[i].target].name
            edges[source][target] = 1
            collabs[source][target] = links[i].songs
            edges[target][source] = 1
            collabs[target][source] = links[i].songs
        }
    }

    for (var artist in edges) {
        g.addVertex(artist, edges[artist])
    }

    artist_centralities = {};
    centralities_frequency = {};

    for (var i = 0, l = nodes.length; i < l; i ++) {
        // Centre the graph at each artist
        var central_artist = nodes[i].name;
        for (var j = 0, l = nodes.length; j < l; j ++) {
            // Find length of path to another artist
            var artist = nodes[j].name;
            path = g.shortestPath(artist, central_artist).reverse()
            path.unshift(artist)

            // Add all steps to get to centre
            path_to_yeezy = []
            for (var step_number = 0, len = path.length - 1; step_number < len; step_number ++) {
                var from = path[step_number];
                var to = path[step_number + 1];
                path_to_yeezy.push({"from":from, "to":to, "song":collabs[from][to][0]})
            }
            nodes[j]["yeezy_number"][central_artist] = path.length - 1
            nodes[j]["yeezy_path"][central_artist] = path_to_yeezy
        }
        sum = 0;
        nodes_included = 0;
        for (var j = 0, l = nodes.length; j < l; j ++) {
            var artist = nodes[j];
            sum += artist["yeezy_number"][central_artist]
            if (artist["yeezy_number"][central_artist] > 0) {
                nodes_included += 1;
            }
        }
        sum = sum/nodes_included;
        artist_centralities[central_artist] = sum;
        if (centralities_frequency[Math.floor(sum*10)/10] == null) {
            centralities_frequency[Math.floor(sum*10)/10] = [central_artist]
        } else {
            centralities_frequency[Math.floor(sum*10)/10].push(central_artist)
        }
        //console.log(central_artist + ": " + sum);
    }
    //console.log(JSON.stringify(artist_centralities));
    console.log(JSON.stringify(centralities_frequency));
    //console.log(JSON.stringify({"nodes":nodes, "links":links}))
});


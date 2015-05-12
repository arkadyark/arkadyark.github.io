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

    edges = {}
    collabs = {}
    for (var i = 0, l = nodes.length; i < l; i ++) {
        var v = nodes[i];
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

    for (var i = 0, l = nodes.length; i < l; i ++) {
        var artist = nodes[i].name;
        path = g.shortestPath(artist, "Kanye West").reverse()
        path.unshift(artist)
        path_to_yeezy = []
        for (var step_number = 0, len = path.length - 1; step_number < len; step_number ++) {
            var from = path[step_number];
            var to = path[step_number + 1];
            path_to_yeezy.push({"from":from, "to":to, "song":collabs[from][to][0]})
        }
        nodes[i]["yeezy_number"] = path.length - 1
        nodes[i]["yeezy_path"] = path_to_yeezy
    }
    console.log(JSON.stringify({"nodes":nodes, "links":links}))
});


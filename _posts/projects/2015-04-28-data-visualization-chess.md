---
layout: post
title: "Data Visualization: Opening moves in chess"
category: projects
---

#### Millionbase and d3.js

For quite some time now I've had the idea in my head to do something with the [MillionBase](http://www.top-5000.nl/pgn.htm) database that I found quite some time ago. Basically, it's several million professional games of chess, over several decades, in an easy to parse format, available for free. It seemed a shame to leave it collecting dust, so I made a simple data visualization, which you can check out **[here](http://arkadyark.me/visualizations/chess)**.

This also coincided with me just finishing another class on Treehouse, this time on the wonderful data visualization library [d3.js](http://d3js.org). It is really powerful and has been used to great effect before to create some beautiful work that has gotten a lot of attention. However, to somebody just learning it, like I am, it comes across as having several moving parts and typical commands. If I didn't do something with it quickly, most of what I learned from the class would fall right back out, so this came at a good time.

#### The project itself

I chose to focus on the opening moves because I wanted something relatively simple; I didn't want to go the full distance of making a complete chess engine. The chess games are stored in the PGN format, which appears to be the standard for chess data. One difficulty was the size of the file - since the file was so huge I wanted to parse it as a stream, so that I would only need one pass through the gigabyte of data. This made things a little bit annoying to deal with in the code and required a bit of a hack to deal with. I also had a few strange things coming up, like certain moves that couldn't possibly have occurred in the first move. These are probably from bugs in my code though I haven't quite yet diagnosed where they're coming from.

After this, the d3 work was surprisingly easy, probably the easiest part. Very little was required and in general it was pretty intuitive. One difficult I'm having is getting the mouse coordinates in terms of the SVG of the chess board, rather than having them be absolute in terms of the page. That's part of why I'm linking to it, rather than just showing the damn thing right here.

You can find all of the source for this project, as per usual, on [my Github](https://github.com/arkadyark/arkadyark.github.io/tree/master/visualizations/chess). As you can see I did a bit more work afterwards to extend it a bit, since it really screams out for a full gameplay mode where you can see the probabilities/frequencies for any board state. Stay tuned for that, and another project I'm doing with d3 coming somewhat soon.

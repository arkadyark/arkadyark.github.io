---
layout: post
title : "Reading week review: two hackathons!"
category: projects
---

This past week I went to two hackathons, my second and third. The first was deltaHacks, taking place at McMaster. For the second I made went out all the way to Montreal for McHacks. Both were really awesome experiences, considerably better than my first. HackIllinois this coming weekend should be even awesomer (at least 50% more awesome, since it's 36 hours rather than 24).

**deltaHacks: Android sWear**

I think the idea for this one first entered my head a while back, when I went to a Toastmasters meeting all the way at the beginning of the year. Thinking for my Praxis assignment, I wanted to find something that would help them improve their experiences. One of the most obvious ideas was something which would be able to listen for ums and ahs and the like, and count them for you (rather than what they currently have, which is somebody manually keeping count). The Android wear jumped out to me as the most natural platform for something like that, where it could be coupled also with the timekeeping that they do as well.

Another use case entered my thoughts from a different channel completely, from people telling me their resolutions for 2015\. One thing I heard (I think more than once) was that people wanted to swear less. Subconsciously I blended the two together, and Android sWear was born. For a while I thought it wouldn't be feasible to have something always listening because it would destroy battery, but I was given reassurance before the hackathon that the watch actually could have a pretty impressive battery. That was enough for me to want to try it at deltaHacks.

Together with an EngSci classmate (Grace Kumagai), a friend of hers at McMaster (Matt Leyland), and a friend of _his_ (Jack Ziemba), we made an Android app that accomplished more or less what I was going for. Using [pocketsphinx](http://cmusphinx.sourceforge.net/), a project from Carnegie Mellon, we were able to do this in a way that didn't guzzle battery, since we could define hotwords to listen for rather than just have it constantly doing a more general speech to text. Nice. We couldn't get our hands on a proper Android wear device and so we just stuck to a phone app, but we plan to continue to develop it. To guarantee that we do so, we actually released it on the Play Store! We had to change the name to CensorMe, for 'impersonation reasons' of all things, but everything else checked out and it's now available as a free download [here](https://play.google.com/store/apps/details?id=me.arkadyark.www).

Turns out people liked this idea, in fact enough for us to finish second place! That was pretty awesome, especially given that my three teammates all had really limited programming experience. It seems like the success of this inspired them a bit to want to do more hackathons and get better, so I'm happy as can be.

**McHacks: babystep**

This last weekend was McHacks (looks like they got dibs on the name, forcing McMaster to have to get creative with theirs). I came wanting to do a web thing, since I had done Android the weekend before, but as things turned out I ended up making another Android app.

I showed up for the hackathon alone, with plans to go to the team making session and meet some new people. As change would have it, I reconnected with a guy I had met when I went to shadow a student at Waterloo a year ago. Somehow I recognized him, and was feeling spontaneous so I approached him and asked if he wanted to work together. And so a team was born.

The idea of this week was one I'd had in my head for a week or so. I still like the idea, but somehow it didn't quite click when we put it together. I was thinking that a problem I have (and presumably quite a few others) is that I'm a bit stuck in my comfort zone. One thing that would help me is a tool that suggested things _slightly_ outside of my comfort zone. The rationale was that most suggestions I get are too far out of my comfort zone that I actually get pushed even deeper in.

So we hacked together such a tool, considerably more polished than what we made last week. We haven't published it yet, and I'm not sure I like it enough to want to publish it, but I'll share it [here](/res/babystep.apk) (Android .apk file).

Once again I had lots of fun and learned a metric shit-tonne, so I can't complain. Up next, Hackillinois this weekend where I'm hoping to do anything but Android (maybe some hardware thing would be nice...).

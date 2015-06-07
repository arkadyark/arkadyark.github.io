---
layout: post
title: "Hackillinois: dntbite.me!"
category: projects
---

This weekend was the third hackathon in three, and probably my last for a bit (my body needs a bit of a break). This time we put to life an idea that has been on my mind for a week or so now, since about the reading week. I'm on the bus back now, and I've got another ~12 hours until I'm back in Toronto so I figured this was a good time to write.

I bite my nails, and have been for most of my life. That really sucks, for a whole bunch of reasons - it's unhealthy (lots of germs on my fingers), it's embarrassing, it's just generally unpleasant. This is a habit I've been trying to kick for just about forever, with very limited success. All of the suggested remedies of dipping in lemon juice, applying nail-polish, tracking apps like [this](\"http://www.digitalsirup.com/apps/app_stopbite.html\") or [this](\"https://itunes.apple.com/us/app/stop-nail-biting/id474867877?mt=8\"), have never worked for me (I've tried them all).

![](/res/biting.jpg)

This weekend we made a prototype something that I think can once and for all make me (and hopefully others) stop. Inspired by [a project](\"http://challengepost.com/software/hathack\") I saw back at deltaHacks, we added a pressure sensor to a hat to rest right above the jaw on a muscle called the _masseter_. The masseter is one of the muscles most involved in chewing, so the sensor picks up every time that it flexes. We connected the sensor to a Spark Core (the one that I won earlier at deltaHacks) which connects to the internet. Using Twilio, we send you (future feature: also send to an accountability partner) an SMS every time you're caught biting your nails, telling you to stop. We also made a [website](\"http://dntbiteme.herokuapp.com/\") which will show your progress on a graph, and also keep a ticker of how long you've been bite-free.

![](/res/biting-text.jpg)

So this is able to track nail-biting for you, without any self-accountability needed. We got lots of great feedback (in particular from fellow nailbiters) so I'm thinking of continuing to develop this a bit. It could definitely be made more seamless, and probably would work better on a different hat. This weekend we used the HackIllinois ones we were given, but that was just for coolness effect and not practice. We found these hats to be really loose, which made keeping the sensor pressed to the face difficult.

It was nice to finally get away from Android, which I worked with for the last two weekends, and try out some hardware things for a change.

Big shouts to Neil Parikh of uWaterloo and Hon Kwok of UMich, my teammates this weekend! We clicked really nicely and made something pretty cool.

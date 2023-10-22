# ROYAL FLUSH

## Inspiration
We've all had _that_ moment, _especially_ on road trips. You find yourself needing to #1 (or even the dreaded #2) in a strange place, and you really don't want to take your chances at that sketchy gas station. But...because no app existed to quickly tell you what decent restrooms were nearby, you ended up having to endure the most uncomfortable and unspeakable part of the road trip. And the worst part? If you had waited one more mile, you would have stumbled across a 5 star rated restroom!

Now, if reading this makes you shudder, that's because having to use a crappy bathroom _is_ scary! We collectively agreed that an app or site that had crowdsourced data on high quality restrooms near us would have been super handy in moments like that and beyond. Whether you're in a foreign country, on a road trip, or just even in a different part of town,  calamity can strike, and trust me, you too would want to find the closest royal flush.

## What it does
Royal Flush should be and is a simple service. It's a website that takes your location and informs you of the restrooms that are within a certain radius to you. If you wish to find out more about your options, you can read some quick reviews by tapping on markers on a map! If you're feeling kind, you can also leave a review for a restroom -- perhaps you had a particularly pleasant experience in a public bathroom that you'd like to enlighten your fellow humans about. 

TL;DR: It's like Yelp, except you ought to focus on the rear end, not the front end.

## How we built it
We made a website with an extremely simple and clean UI, built with **React** and **GCP** (Firebase + Google Cloud)! To make the interactive map, we also used the Google Maps API. 

## Challenges we ran into
Trying to make a service that works with Google Maps is pretty tough! We had lots of issues with markers and displaying reviews, yet we did overcome those bugs in the end. It was also a challenge finding a compact and structured way to store all of our restroom review data. We had to use a mix of Cloud Firestore and Cloud Storage to make it work efficiently.

## Accomplishments that we're proud of
Just making a mostly functional website within 24 hours is an achievement in and of itself! We are a pretty novice team, so learning and being able to get our frontend working with the backend was really exciting. Our website solves a tough task and makes it look simple: we're proud of that.

## What we learned
Generally speaking, we learned a lot about design, structure, and storage. 
- We had to make a lot of subtle UI/UX design choices to ensure the site was as user friendly as possible. We realized that it's not always about showing off how fancy the CSS can be: it's about making the app as user friendly as possible. 
- Lack of organization became our biggest challenge by the end of the day. It was convenient when there was not much code written, but it was a logistical nightmare trying to deal with one enormous JavaScript file. Luckily, we broke it down into components and straightened out some of the structure. Planning out what to do before writing any code is a _really_ good first step.
- Storing data is often overlooked, but it's critical! Knowing what to store and how to store presented its own challenges to us, but we appreciated how approachable GCP made it for us. 

## What's next for Royal Flush
With just 24 hours, we didn't have time to flesh out everything we wanted to (or should I say _flush_ out)! We would like to go above and beyond the call of duty and make our app have even more useful features! Going back to our road trip scenario, we think it would be great to combine the Google Maps API with some algorithms to plan out ideal stops along a route. For general features, adding more search functionality and statistics that people can use to make better decisions would be nice.

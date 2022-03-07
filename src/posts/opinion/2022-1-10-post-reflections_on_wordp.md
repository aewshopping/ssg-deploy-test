---
layout: layouts/post.njk
permalink: '/2022/01/10/reflections-on-wordpress-after-8-months/'
tags: [post, website development]

title: Reflections on WordPress – 8 months in
post_author: Anthony Webb
date: 2022-01-10
image: https://res.cloudinary.com/ds2o5ecdw/image/upload/v1646519878/posts/markus-winkler-unsplash.jpg
meta_excerpt: On this post I’m not going to be talking about history books but instead about WordPress.com the web platform behind this website – my thoughts after having used it for 8 months now.
---
On this post I’m not going to be talking about history books but instead about WordPress.com the web platform behind this website – my thoughts after having used it for 8 months now. Tune in or out according to your preference!

<hr>

When I started this blog with my friend and collaborator Andy Salisbury in May 2021 we had three aims:

1. Read a greater number of more interesting history books.
2. Make popular history books more discoverable for everyone. Not just the blockbuster books but the many other excellent books released each year.
3. Find out what this internet thing is all about.

This post is going to be about the third aim – which was more mine that Andy’s I suspect – focussing on the website choices I made in setting up [popularhistorybooks.com](https://popularhistorybooks.com/) and what I have learned along the way.

Maybe it will help someone else who is thinking about setting up a similar blog and who operates at similar level of technical capability / ignorance to me!

### Starting from zero

Before starting up this site I only really knew about three potential places to start up a blog / website: Google’s blogger service, Square Space and WordPress. I only had a vague idea about WordPress at the time: I couldn’t shake the idea that it was some sort of word processing software. So these were the three I looked into most closely.

### Choosing WordPress.com

I quickly dismissed Blogger as not cool enough, and Square Space as too cool so that left me with WordPress, which had generated vaguely positive vibes in my Google trawlings. Although I didn’t entirely trust what I had read given that most website comparison articles didn’t seem very… disinterested. But on the basis that you learn by doing I plunged in.

> I quickly dismissed Blogger as not cool enough, and Square Space as too cool so that left me with WordPress…

Opting for WordPress.com rather than WordPress.org seemed sensible, given that I had no idea what I was doing and the dot com version didn’t require any technical setup knowledge.

I also went for the paid for “Premium” level and registered the popularhistorybooks.com domain name. This set me back about £130 for the year which I considered just about ok for a site which is essentially a hobby site.

A supporting database in Airtable
I then set up an Airtable base to allow different book reviewers to submit books and reviews, and to keep track of all the newly published history books. If you have not come across Airtable before it is like a nice looking online spreadsheet, but it’s actually [a real database that you can do various other fancy things with](http://airtable.com/). It also has a very useable free tier. If you are interested I highly recommend you check it out.

I wanted to have a separate database to the main website content organisation stuff so to make it easier to change website provider in future – should we want to.

**And that’s basically it as far as fundamental infrastructure goes!** Here are my impressions after 8 months.

### WordPress.com – the good stuff

1. 🏃‍♂️ Getting up and running with WordPress.com was really easy. The only thing you have to do is choose a theme that you like and you are off. This is illustrated by the fact that I accidentally clicked “make my site public” before anything was ready. But in a few hours I had published a blog post on [What is Popular History?](https://popularhistorybooks.com/2021/05/21/what-is-popular-history/) that looked pretty nice, and properly sized for mobile, desktop etc with no extra effort.

2. 🏗 The page builder tool is very intuitive and easy to use. The main thing to figure out was that the editor doesn’t look the same as the final webpage, in particular with regard to spacing. After this I was able to create a format for a review page that I was happy with quite quickly. You can also fiddle around with the look of a page at a more granular level, by altering the css file (once you have figured out what css means).

3. 🤼 It is very straight-forward to collaborate with other people. We currently have 5 reviewers and after a review has been published it is very easy for them to log in to WordPress and make changes, without them having the ability to accidentally change other people’s work (which of course I have given myself the power to do 🤨).

4. 😃 The WordPress help team are excellent. I have had a bunch of queries, some of which were about genuine bugs in the platform, but most were just 101 questions on how to style something in a particular way. All were answered quickly, professionally – and successfully! In fact it has one of the best help services that I have ever dealt with – so well deserved kudos here.

5. ⛩ The WordPress platform is a handy gateway to other places whether through the WordPress blog search tools (which uncovered such gems as: [Dave Does History](https://davedoeshistory.com/)), or through allowing you to easily share posts on social media.

### WordPress.com – the frustrating stuff

1. 🍰 Even on the “Premium” tier you can’t do anything interactive in your website. This is because WordPress doesn’t allow any JavaScript until you upgrade to a Business tier and get access to the world of plugins. At double the cost it just isn’t worth it for a zero revenue site. This was a big surprise to me because – not understanding WordPress – I thought JavaScript was a basic service. Even my Yahoo geocities account back in 1999 had it (www.aquillagorilla.geocities.com if I remember correctly). But WordPress “Premium” does not.

2. 👓 This also means you can’t use iframes: a way to embed one website inside another one. This would have been useful a couple of times to improve the functionally of the site… but no. None of this is clear in the description of what Premium is in the WordPress docs (or the comparison sites), you only find out by trying to do it and then realizing that it is restricted.

3. 🔌 There is no way to link the WordPress.com blog dashboard to other data sources. So I can’t make the reviews that are submitted to the Airtable database automatically upload to the WordPress account (at least on a premium tier). There is a kind of workaround you could do using automatic emails but this wouldn’t help with layout formatting (see below). So I upload manually each time.

4. ✂ There is also no blog post template – ie a user defined layout format that I can create and insert variables into. If you are just posting text this doesn’t matter but I want to have pictures and certain info in particular places on the page. My workaround here is to copy and paste the Airtable record into an Excel row. Then use Word mail merge to stick the text and other things into the right place in the html code (previously copied from WordPress). Then copy and paste this html code into a blank WordPress post page ‘code view’. It works but it is not very elegant…

### Concluding thoughts

On balance I am very happy with the choice of WordPress.com. It meant we could get started straight away with writing the history book reviews without dealing with any big technical hurdles. We can take advantage of the very nice out of the box layouts and typography.

> …if WordPress “Premium” was relabelled WordPress “Basic” I would be entirely satisfied with the package 🙂

Although I have a number of grumbles they all boil to down to the fact that the WordPress “Premium” tier is actually pretty basic. So the problem is perhaps less with the service and more with my expectations. As noted above if WordPress Premium was relabelled WordPress Basic I would be an entirely satisfied customer – although I may have felt I was being overcharged!

However… I don’t think we will be using WordPress for that long. There are a few too many manual processes for core things that I would like to do: linking Airtable to the site for example or setting up a custom filter…

As I get more familiar with web world I can see that with a little more technical knowledge and a little more time it is possible to do something as good or better for less money.

Plans for the future
In the near future I will be “announcing” a new history book filtering tool that I have developed – but not on the WordPress site. This allows you to filter all history books published in the UK since January 2019 by period, region, country etc. To make this I had to spent lots of my Xmas holiday evenings struggling with vanilla website building on Glitch.com but I think the functionality it provides is worth it!

The history book filter is already live on the site on the “[All Books](https://popularhistorybooks.glitch.me/)” link, which takes you off the main WordPress website.

In the medium term I will be looking into Static Site Generators (SSGs) such as Eleventy or Hugo as a WordPress alternative. With not too much learning I think generating a site like this is within the realm of the possible. It won’t be quick though as the whole design will effectively need to be redone from scratch – and job + 2 young kids doesn’t provide that much free-time…

If only there were more time…
…and time is the essence of the problem. How much time do you want to spend messing around with this stuff and to what end? For me it is an enjoyable hobby – I am tech-curious – but ultimately it still presents a risk of being a distraction from the key purpose of setting up this site which is to read more and better history books.

With that now said I will now head back to the bookshelf! 📚

---
layout: layouts/post.njk
permalink: https://popularhistorybooks.com/posts/opinion/2022-03-29-post-migrating_from_wordp/
tags: [post, website]

title: Migrating From WordPress to Eleventy - a non-developer's experience
post_author: Anthony Webb
date: 2022-03-29
image: https://res.cloudinary.com/ds2o5ecdw/image/upload/v1648574520/posts/wordpresstoeleventysquare.jpg
meta_excerpt: I recently switched this website / blog from WordPress.com to Eleventy. I'm not a developer. Find out what happened!
---
This post covers upgrades I have made to this website - no history book chat, although more of that coming soon!

<hr>

Cutting to the chase, after moving from WordPress to Eleventy the website stats are now:

- 🚤 3.6x faster
- 🐾 16x lighter footprint
- 🐱‍🚀 3x increased fun level

For the full story read on.

[[toc]]

## WordPress pros and cons (for me)

This website started on WordPress.com last year and there is a lot to like about that platform - super quick to get started, zero technical proficiency required, and a great support team.

However I did encounter some important drawbacks too. The two main ones for me were lack of flexibility and lack of repeatability.

__Flexibility__ - if I wanted to do anything bespoke or involving javascript I would either have to build it off-site and add links. Or I would have to pay full-whack for a business site with plugin capability: for a zero revenue site like this one it didn't seem proportionate.

__Repeatability__ - every review had to be posted manually. This was a pain because even though the page layout was the same every time I had to carefully repeat that layout pattern for each review.

## Eleventy as an alternative

While mulling this over I came across Eleventy on [Glitch](glitch.com). It seemed great: totally flexible and designed around templates (ie repeatable content). [Eleventy is a free static site generator](eleventy.dev) (SSG) which means you give it some logical instructions on how to build your website and then it churns out your html pages just the way you like them!

It turns out that it is also an incredibly speedy way of delivering a website to your visitors. This is because the website pages are pre-built in HTML. By contrast WordPress will build your pages each time you visit them using a database type system.

Although this wasn't my motivation for trying Eleventy it is probably the main benefit for users who I suspect are less interested in the formatting and easter eggs than I am 🙂.

## The results

Let's have a look at the results. (The metrics come from a lighthouse test simulating the experience of loading the homepage of the website from an average mobile phone[^4]).

### 3.6x faster

__WordPress site__ time to interactive → __6.1 seconds__.

__Eleventy site__ time to interactive → __1.7 seconds__.

This is a massive boost and will save you a lot of frustration if you are in an area of poor mobile signal for example. On a desktop the speed improves to 0.7 seconds.

### 16x smaller

__WordPress site__ total download size → __2.2 mb__.

__Eleventy site__ total download size → __0.1 mb__.

An _incredible_ reduction, saving on your data bills and more environmentally friendly to boot 🌱[^1]. I initially thought that this was driven by the WordPress homepage serving larger book cover images whereas the new site uses smaller pictures - ie it was mainly my fault. But even allowing for this the difference is still huge at 13x.

I should add here that it is not my intention to disparage WordPress - the more I understand what goes into building a website the more impressed I am with how WordPress makes it look good and _just work_ for everyone. I guess the larger file sizes are the price you have to pay. Also I am sure that this will improve over time given the dedicated WordPress community.

### More repeatable

__WordPress.com site__ → can't do templating (on a Premium plan)

__Eleventy site__ → built for templating

Applying a new layout to all of my review posts in one go is easy with Eleventy. If I tweak the code in one place every single review will update. By contrast if I wanted to tweak the layout in WordPress I would have to do it for every single post manually 😬. (You can though easily change the website theme in WordPress which will change the font, colours, design flourishes etc.)

### More flexible (and fun...?)

WordPress is actually pretty flexible. But you access that flexibility through plugins. The plugins are available under a relatively expensive (ie a few hundred dollars or pounds per year) WordPress.com business plan, or through self-hosting. I didn't properly investigate this option but it felt like too much baggage for a small site like this one.

Because you directly edit / write the HTML, CSS or Javascript code for an Eleventy website you have as much flexibility as you want... at the cost of as much complexity as you can take! With this in mind I have redesigned the site to be a bit cleaner, and fiddled with the presentation in various ways to get things how I liked them.

I added a bit of fun to the site too in the form of a pop-up Emperor Justinian easter egg (nerdiness acknowledged 😃). See if you can find him on the homepage...

I also tried to improve the reading experience by giving visitors a choice of colour mode (light, dark or Archaic Greek[^2] - click the 🎨 icon), and a choice of text size (normal, big, very big - click the __TT__ icon).

## What am I giving up?

This site always strives for balance therefore I also have to acknowledge the drawbacks:

### If it breaks it is my fault

I can't run crying to WordPress.com support team anymore sadly! If it breaks I will have to figure out how to fix it. And I'm sure there will be the odd problem in the months / years ahead. However all is not lost I hope. There is the friendly and open Eleventy community to turn to in extremis.

### There's a fair amount to learn if you are starting from scratch

I'm not a developer.

I hadn't heard of css a year ago. If you had said npm to me I would have looked at you blankly and changed the subject[^3]. As far as I knew Nunjucks was a bad guy from Lego Ninjago.

If you are starting from scratch like I was, you have to enjoy the process of learning. There is a lot to learn even though Eleventy is built with beginner coders in mind. It is not really _difficult_ because there is so much info out there, but it does take time and some patience.

### A fond farewell to the WordPress community

While only operating for a short time on the shadowy fringes of this vibrant group of bloggers I will miss the sense of being part of a community where people write about things just because they enjoy writing about them.

## Next steps

There are still a few important things to do, such as integrating the history book searcher into the main website, or trying to stop lighthouse complaining about my image pixel ratio.

But after two month or so's hard work I'm very happy with the results - thanks to the amazing Eleventy team 👏!

Anthony Webb, London UK


[^1]: To be really environmentally friendly you should turn off your computer 😉.
[^2]: Based on the colours used in [this ancient Greek pot](https://www.britishmuseum.org/collection/object/G_1837-0609-42). (I'll probably change the third colour theme from time to time...)
[^3]: Okay this would probably still be my reaction.
[^4]: If you want to have a look at the differences or test this independently yourself [here is the WordPress site](https://popularhistorybooks.wordpress.com) and [here is the Eleventy site](https://popularhistorybooks.com).
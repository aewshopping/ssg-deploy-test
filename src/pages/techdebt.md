---
layout: layouts/page.njk
title_content: Tech Acknowledgements
title: Tech Acknowledgements
tags: page
permalink: '/techdebt/'
date: 2023-02-21

---

_Last modified {{ date | htmlDateString }}_

This website was built by me from the ground up. If you are interested in the tools I used keep reading!

All of the sites listed below have generous free tiers to get started. Eleventy is completely free. This website has been built using the free tiers only, which works fine until you need to scale up.

_Disclaimer - I have no affiliation or association with any of these companies. If you click the links below I will get nothing_ 🙂

[[toc]]

## Eleventy

This website is built using Eleventy a fantastic and - dare I say it? - beginner friendly [website coding/building platform](https://www.11ty.dev/). You can set up various website layouts to display your written word in a consistent way, sprinkle in some data if you want, and auto-generate a blog-roll + other website pages. It then builds your website for you in html format - in the lingo it is a Static Site Generator or SSG.

One of the reasons Eleventy is easy to have a go at is because it is available on...

## Glitch

If you sort of know what you would like a website to _do_ but have no idea _how_ to go about it, [Glitch is an amazing place / platform to start](https://glitch.com). It offers a colourful, inviting and above all immensely practical way into web programming with a whole range of carefully chosen languages, frameworks and examples you can adapt. It also allows you to bypass all this Command Line super user do this and that mumbo jumbo which can be a big barrier to just trying things out.

I use Glitch to test and update the code for this website, which I can then export to...

## Github

The code for this website is backed up on Github in my repository (ie folder). [Github is way of storing code or text built around version control](https://github.com). You are welcome to take a look at [the code that creates this website](https://github.com/aewshopping/ssg-deploy-test).

The code for the website isn't the website itself. The actual html website pages need to be _built_ from the code, for which I turn to...

## Netlify

If you want people to see your website you will need to "deploy" it, ie publish it to the world. This is where Netlify comes in. Again it is a beginner friendly way to [deploy your eleventy website](https://netlify.com). It automatically picks up any updates to your Github repository and then rebuilds your website with these changes.

It is fast at building sites (this one takes 20-30 seconds, most of which is the "warming up" part, as each page is built in fractions of a second) and also fast at delivering / serving the website to anywhere in the world.

But not everything on this website comes from Netlify, images come from...

## Cloudinary

An awesome [online platform to store your images](https://cloudinary.com) and to provide them to your website in whatever format you need. Cloudinary handles these image adjustments automatically. Need a low resolution image? Just amend the image url to specify this. Need to serve different image formats to different users? Again you can get Cloudinary to do this for you automatically. Upload is dead easy too and can be done in a variety of time saving ways if you want.

An advantage of using Cloudinary is that the images are stored independently of the website, so if you want to deliver your website in some other way you don't need to worry about re-faffing about with all the images. A disadvantage is that if Cloudinary breaks you will have no images on your website, but I am happy to take that risk.

So images are stored on Cloudinary, but what about the website content, ie the actual words? These are stored on...

## Airtable

Another brilliant service available to us all! Airtable looks and feels [like a spreadsheet but is actually a database](https://airtable.com) you can do all sorts of fancy things with if you want to. I use it to store reviews, and link them up to history book records. My fellow reviewers also submit their reviews to Airtable through an Airtable form - you don't need to login to do this.

I _could_ automatically pull reviews from Airtable directly into Eleventy, but I am nervous about retaining editorial control. Therefore I will manually add them as an Eleventy friendly and appropriately tagged markdown file (created in Airtable) to the website.

One thing that does pull automatically from Airtable using their API is the full list of recent history books in the All Books page. This is a big step forward for me as previously I was creating html divs and manually updating an html page on a linked website!

I also need to make sure I don't forget to mention...

## ListenNotes

This is my pod service of choice. It is the [best way I know of to search podcast episodes](https://listennotes.com) by far. For some reason Google is rubbish at this. So if I want to find out if a history book author has been talking about their book on any podcast _in the world_ I can find this in ListenNotes.

And then (even better) I can add this episode to my [personal ListenNotes podcast playlist](https://lnns.co/F2dxHuM4TNR), which is actually an actual real podcast with an RSS feed and everything. I can then subscribe to my own ListenNotes podcast on Google podcast or Apple ipodcast or wherever and listen to it how I like.

An then (even more better) anyone else _in the world_ can subscribe to this [popular history books podcast]({{ staticdata.links.podcast }}) with whichever podcasting service _they_ like, and use it as another way of discovering great history books 😀. I have a link to the popular history books podcast page in the menu, and links to relevant podcast episodes in all the reviews at the bottom... which are generated automatically by...

## Zapier

[Zapier is an automation service](https://zapier.com) that... does things for you automatically. So if something happens in an app you use, Zapier can make something else happen in a totally unrelated app. There are literally thousands of apps that you can connect together on the Zapier platform.

In my case when my ListenNotes RSS feed for Popular History Books gets a new podcast episode added to it, Zapier "sees" this and pops links and info about the podcast into my Airtable database, and I then link it up to a book review.

But you can link pretty much anything to anything else in Zapier, and they have a [nice blog](https://zapier.com/blog/) too!

Oh yes, I should also acknowledge...

## Google fonts

You don't have to use a special font in your website you can choose from whatever most computers already use. But I really like the cabin font and [Google supplies this font](https://fonts.google.com) - and many many others - for free (or in exchange for your data depending on how you look at it). This website will fetch the cabin font from Google when it loads on your computer.

I have also used [Google icons](https://fonts.google.com/icons) as inline svgs for menu options and such like.

And finally...

## Twemoji!

I also really like the [Twitter emoji designs](https://twemoji.twitter.com) which have kindly been opensourced by Twitter. So if you see a colourful emoji icon this is likely to be a Twemoji design. I am using them as plain png icons mainly but in our "All Books" the book category emojis are swapped out for Twemojis using an over-engineered bit of build time javascript. In particular it is a great way to generate loads of country flags from emoji symbols that otherwise don't show up on most desktops.

<hr>

Thank you to all these services! I highly recommend you check them out if you haven't already.

Anthony Webb, London UK
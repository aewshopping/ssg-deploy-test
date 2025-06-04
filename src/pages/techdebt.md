---
layout: layouts/page.njk
title_content: Tech Acknowledgements
title: Tech Acknowledgements
tags: page
permalink: '/techdebt/'
date: 2024-08-24

---

_Last modified {{ date | htmlDateString }}_

This website was built by me from the ground up. If you are interested in the tools I used keep reading!

All of the sites listed below have generous free tiers to get started. Eleventy is completely free. This website has been built using the free tiers only, which works fine until you need to scale up.

_Disclaimer - I have no affiliation or association with any of these companies. If you click the links below I will get nothing_ 🥲

[[toc]]

## Eleventy

This website is built using Eleventy a fantastic and - dare I say it? - beginner friendly [website coding/building platform](https://www.11ty.dev/). You can set up various website layouts to display your written word in a consistent way, sprinkle in some data if you want, and auto-generate a blog-roll + other website pages. It then builds your website for you in html format - in the lingo it is a Static Site Generator or SSG.

One of the reasons Eleventy is easy to have a go at is because it is available on...

## Glitch

_Glitch is closing down in July 2025, sadly..._

If you sort of know what you would like a website to _do_ but have no idea _how_ to go about it, [Glitch is an amazing place / platform to start](https://glitch.com). It offers a colourful, inviting and above all immensely practical way into web programming with a whole range of carefully chosen languages, frameworks and examples you can adapt. It also allows you to bypass all this Command Line super user do this and that mumbo jumbo which can be a big barrier to just trying things out.

This website started out on Glitch using the eleventy template on that site. However it is _almost_ as easy now for newbies to start on...

## Github

The code for this website is backed up on Github in my repository (ie folder). [Github is way of storing code or text built around version control](https://github.com). You are welcome to take a look at [the code that creates this website](https://github.com/aewshopping/ssg-deploy-test).

I also use Github Codespaces to update the website with new posts, new code and whatnot. It means I can do it in the cloud and don't have to worry about me accidentally bricking my computer.

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

I was previously pulling books data automatically from Airtable using their API to create the full list of recent history books in the All Books page. However as my list of books grew I was no longer able to store all books on Airtable using the free tier. Also my previous method of showing the books was to load the All Books page with _all_ the books and then selectively hiding and showing them based on filters. This was ok while book numbers were small but means a big download if book numbers grow.

I therefore updated my books database approach to...

## Datasette on Vercel

The All Books page is now based on a [Datasette](https://datasette.io/) SQLite database served up by [Vercel](https://vercel.com/). This means that I can use javascript to query the database based on user selected filters (ie published in 2024 _and_ UK history) and bring back only the books you are interested in. Datasette is an open source data sharing program that is brilliant but comes with caveats the main one being it is not yet on v1.0, so things could change or break. I had a few difficulties in setting it up which you can read about on the [GitHub page where my csv data lives](https://github.com/aewshopping/history_books) that builds the database. Vercel have a free tier to serve the data which I am hoping my database is small enough to stay within!

You can have a look at [my history books Datasette database directly](https://history-books-blush.vercel.app/) if you want to. This has more functionality than my All Books front end - such as full text search and sql queries but it is much harder to use for the uninitiated and doesn't look as pretty 🙂. 

## Google Sheets

So the database is build with csv files living on GitHub. I do all the book data entry for those csv files using Google Sheets. Google Sheets is quite good now! But it is a shame to move away from Airtable for data entry because for entering in data by hand this is hard to beat. I have built various thingymajigs in Google Sheets to try to make it less easy to accidentally destroy everything, and found the new Tables feature very helpful. I've got a Google Apps Scripts that pulls in book data from the Google Books API (which often contains errors so needs a quality check), and a Google Apps Script that pushes the data contained in the Google Sheets over to GitHub and triggers the Vercel database build.

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

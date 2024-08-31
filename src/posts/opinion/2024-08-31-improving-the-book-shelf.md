---
layout: layouts/post.njk
permalink: 
tags: [post, website]

title: Improving the bookshelf - database upgrades
post_author: Anthony Webb
date: 2024-08-31
image:
meta_excerpt: In which I talk about moving to a Datasette database style system for storing and showing history books
---
This post discusses the website upgrading work I have done on the [All Books](https://popularhistorybooks.com/allbooks/) page, which shows all recent history books published in the UK and allows you to search them. You might not notice the improvements, but I can assure you that it is now much better 🙂.

I should also caveat that there is nothing history related here in this post, this is more one for the tech curious!

[[toc]]

## The problem I'm trying to solve

When I started this website one of the aims was to make recently published history books easily discoverable, so you don't just have to rely on the best-seller lists or the Amazon algorithm to find them.

One way of doing this is by writing reviews. But, let's face it, we are never going to review _every_ history book published each month and maintain our standards of quality 🙂.

So to show _all_ history books, I would load every single book to the [All Books] page from my hand curated [Airtable](https://airtable.com/) database, then allow the users to show and hide the ones that didn't match the active filters using some messy behind-the-scenes javascript.

## Issues with my current solution

This system works well enough but there are two problems: 

1. If you more than even a relatively small number of books  - over 600 say - you are loading a large web page which most people will only see a fraction of. This is inefficient for the user, who will resent the download size, and for me who has to serve all that wasted data. I therefore capped the number of books to the 600 or so most recent ones. This is still a lot to load.

2. I use Airtable for storing data and there is a tight limit to how much data you can store before you exceed the free tier - currently 1,000 rows[^1].

With the number of history books in my database growing beyond this, I need an upgrade!

## Why don't I just upgrade Airtable?

One solution is just to pay money for someone else to solve the problem. For example I could go onto a higher cost tier at Airtable, get more book storage space, _and_ the ability to do database type searches on the books as many times as I like. 

But the problem then is that I have to pay a certain monthly cost _forever_ and as soon as the cost becomes onerous and I decide I don't want to pay it _everything_ breaks.[^2] It is also deferring the problem. At some point I will likely hit the next set of row limits.

## The database wishlist

So with this in mind I decided to search for alternatives. My wishlist of my database characteristics were: 

1. Low cost - zero if possible.
2. Source data should be viewable / editable through a graphical user interface, including on my phone.
3. Source data should live online, not on my computer.
4. Database should be directly queryable through an API service.
5. Scalable - many more than a thousand rows required!
6. Easily exportable / backupable.
7. Minimal reliance on potentially precarious corporate generosity.

One thing I _don't_ need is privacy because this is all public data that I want to share. 

## Datasette as the database solution 

I have been mulling over this problem for about a year - and in the end I have decided to go for:

- Csv data files, stored on GitHub
- Use Datasette to turn them into a 'proper' (read only) queryable database 
- Hosted on Vercel
- Google sheets for inputting data and creating csv files

### Datasette - the data engine

The most important part of this is the middle bit: [Datasette](https://datasette.io/). This is an open source program from developer and admirably prolific blogger [Simon Willison](https://simonwillison.net/) with the aim of making it easy to analyse and share data. Give it a bunch of files and it will transform them into a fully operational SQlite database.

You can either use the Datasette front end to poke around your data yourself, or you can build the database search results into your own website. This is because Datasette can also provide results in JSON format - i.e. machine language. This second bit is critical for me because I want to format the search results to look pretty, show book covers, and such like, not just use the standard Datasette front end provided.

Datadette is extremely powerful because you can apply any fancy SQL query you like to the data, by adding the query to the URL (ie the website address). And it can cope with large datasets, much bigger than the tiny amount of data needed for a thousand or so books. 

So... chuck it a csv file or two and it will build you an API.

For example, I could ask it to show me all history books in my data covering the modern history of Uzbekistan published by Oxford University Press, and in the twinkling of an eye I will have my response.

One thing to be aware of is that at the time of writing (August 2024) Datasette is still a young project and has not yet reached a stable v1.0. Therefore snags and future breaking changes should be expected.

The other thing to be aware of is that Datasette will not help you to input or update the data - it is 'read only' so it needs a data source that already exists.[^3] 

This is where I need the csv files, stored on GitHub.

### Csv files on GitHub - the data store

By storing csv files on GitHub any changes to the data are easy to see, and in theory I can edit the file directly. In practice I am using a Google sheets spreadsheet and automating the transfer of data using GitHub actions.

This is the most clunky part of the setup. Csv files are just text files where every bit of data is separated by a comma (hence 'comma separated variables' or 'csv'). If I mistype something it is easy to mess up a link between tables. Airtable is brilliant at manual database data entry because it prevents these sorts of errors.[^4] However, though csv files are clunky they do have the virtue of being transparent: it is very easy for anyone to have a look at the underlying data.

The data entry for the csv files themselves is done though Google Sheets - a backward step from Airtable but with no real limits on rows. A Google Apps Script pushes the data contained in the Google Sheets over to GitHub and triggers the Vercel database build.

### Vercel - serving the data 

The final element is getting this data out there in the wild where people with an internet connection can actually see it. 

To do this I need a company that operates computers that will actually run the Datasette program, listen for people sending in questions about the data from the internet, and sending (serving) them their answers. There are a few companies that do this but the obvious choice is Vercel because it is low cost (or potentially free) if traffic is light.

This was much harder to get working than I had expected with lots of gotchas, many of which were due to my inexperience and typos but some were down to bugs.

## Keeping score

Going back to my original objectives:

1. ✅ Low cost - zero if possible.
2. ❓ Source data should be viewable / editable through a graphical user interface, including on my phone.
3. ✅ Source data should live online, not on my computer.
4. ✅ Database should be directly queryable through an API service.
5. ✅ Scalable - many more than a thousand rows required!
6. ✅ Easily exportable / backupable.
7. ❓ Minimal reliance on potentially precarious corporate generosity.

The biggest problem with my solution is the data entry method. I have basically gone to Google Sheets which definitely feels like a retrograde step. I'll ponder ways of improving this over time. 

I'm also still a little at the mercy of corporate generosity, because I am relying on Vercel to serve the data. However because I am using them as a pipe I am not locked in as I was with Airtable. If Vercel shift their pricing dramatically, in theory it is easy to just send my database to another server company with better pricing.

It is also a fairly complicated setup, relying on multiple steps. I have gone from Airtable for everything with some show / hide hacks on the front end (with Netlify serving the website). To Google sheets, csv files in a GitHub repository, GitHub actions, Datasette, and a different front end (with Vercel serving the data and Netlify serving the website). More points of failure, albeit it is all reassuringly low tech.

## Pain points

This project wasn't easy for me and it took a while just to understand the limitations and advantages of the different options. 

### Understanding what Datasette is

For example understanding just what Datasette is and isn't took me a long time. The three penny drops I needed were that Datasette:

1. Automatically builds a database from csv and other file types.
2. Provides a directly queryable database with no need for a proxy server (with the flip side of the coin being that it is read only).
3. Creates an API service because the query results can be requested in JSON form.

There were also some specific [difficulties to overcome in getting Datasette working and deployed](https://github.com/aewshopping/history_books/) which I have noted on GitHub.

### Restructuring the data

I needed to restructure my data. This is because Airtable seems to automatically create (and hide) 'intermediate' or 'join' tables for you. I had to do some of this manually in Google Sheets. Hacking around in spreadsheets is not so bad for me because I do it all the time in my job. So building intermediate tables that populate automatically was ok, although others might find it a pain. 

### Learning (enough) SQL

Learning the SQL I needed to query my data took some time, albeit didn't cause me headaches as the learning curve is shallow and it just seems to behave quite nicely. There are loads of examples splurged all over the web to help too.

### Writing the front end

Finally I needed to rewrite my front end to properly interact with the database. I thought this would be easy but in fact it wasn't and required loads of fiddling and tweaks, because it is such a big change from the prior setup. The All Books page is now a significantly smaller file size, and looks better too with handy book count information as you apply the filters.

## Conclusion 

I am very happy with the result, and can now bring you not only new but also 'not so new' history books... as long as nothing breaks in the meantime.

Anthony Webb, London


[^1]: Airtable can also change the limit and / or pricing whenever they feel like it, which they did not long ago, reducing the number of 'free' rows from 1,200 to 1,000. As a private equity backed commercial organisation they are looking to maximise profit so this is something a user of their (excellent) service should be prepared for.

[^2]: Given this is essentially a hobby website, there is no income to offset expenditure.

[^3]: Being read only is actually a big advantage in other ways because it means I don't need to be as careful with security. Most database solutions don't allow you to interface with the database directly due to the potential for random internet folk deleting / stealing all your data. Instead you need to run everything through a proxy server which safely stores your database security keys / prevents SQL injection. This means more complexity and more cost.

[^4]: Maybe in future I will come across a cloud based solution with Airtable levels of polish that writes data to an SQlite file that automatically backs up to GitHub. This would solve my input problems... But it would make the data source less visible to other people because you need particular software to look inside an SQlite file, you can't just open it and have a look.
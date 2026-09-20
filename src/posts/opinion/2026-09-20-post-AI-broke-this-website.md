---
layout: layouts/post.njk
permalink: 
tags: [post, website]
title: AI ate this website and the solution is... more AI.
post_author: Anthony Webb
date: 2026-09-20
image: https://res.cloudinary.com/ds2o5ecdw/image/upload/v1647984580/pophist_static/justinian_eye_square.jpg
meta_excerpt: In which I talk about the history books database going offline due to anti-social blundering AI scrapers
---

I'm exaggerating a little, you are after all (probably) reading this on the website which therefore can't be totally broken. 

What _has_ been broken is the popular [history books database](/allbooks/) that I have been maintaining for the last three or four years, showing all hardback history book publications (that I can find) in the UK: those books aimed at the general market rather than academia.

With luck it may be up and running at the point in time you are read this.

(What hasn't broken is the reviews and articles that we write. If you want to find out about the small subset of popular history books that we have reviewed, you still can. If you want to find out about any of the other fascinating and valuable history books, you can't. At least, not here!)

### What's happened? 

The short version is that one or more AI companies scraped it to death. 

What does this mean?

- In order to build or maintain the sort of large language AI model which can contain everything that has ever been written down on the internet (or indeed ever published in a book) an AI company has to go to every website in the world and download the content.

- Because this would take a long time to do manually the AI company will write some programs to automatically crawl through the web and suck up what they find, to be later digested by their digital masters.

- Responsibly written crawlers will identify themselves when requesting the data and will only visit occasionally to see what has changed. They _might_ also respect instructions left on a website asking not to be crawled (but probably not).

- Irresponsibly written crawlers will try to obscure who they belong to and will often be extremely aggressive in their attempts to suck up every last morsel of information.

What happened in my case was that an AI crawler landed on my Vercel hosted database and sent over 6,000 data requests an hour to Vercel and kept this up for (I think) days before Vercel froze the service because I had used up my all my limits. So now no-one can use the database.

### Spoiling it for everyone

To put this in context: 6,000 requests per hour is not a huge amount of requests in the grand scheme of things, but it _is_ a large amount of requests from a single party and _is also_ a large amount of requests given there are only 1,200 books in the database... There are however an effectively infinite number of ways to query even a small database which presumably is what this irresponsible AI company has done.[^1]

There is no value for the AI company in this history books database.

But on aggregate across many many websites, if they aggressively hoover up everything they can find, a small percentage of it will be meaningful data that improves their models. Volume is all that matters. In this context any bits of the internet that they break along the way (including this website) are acceptable collateral damage.

> for AI companies, breaking parts of the internet in their quest for masses of data, is perfectly acceptable (and rationally justifiable) collateral damage

By analogy, this website is like a water tap I have installed on the outside of my house - anyone can come and drink from it. The AI company attached a hose to my tap and sucked it dry leaving nothing for anybody else.

Not because they care about my brand of water but because their default behaviour is to suck _all_ taps dry, whenever given the chance.

### What does this mean?

Unfortunately this is now the reality of running a website.

Previously a small hobby website might expect to be relatively safe. Your biggest worry was a malicious actor, but it is not a big worry because there is no financial incentive to take down a hobby website. This would be the equivalent of a nefarious individual blocking up your water tap with their finger and demanding money from you to remove it: why bother do this when there is no chance of me paying up?

Now we have non-malicious but equally destructive organisations blundering around the internet, smashing things as they go, because there _is_ a financial incentive to do so: the geek shall inherit the earth after all, as long as they can just get their hands on enough data.

### Who did it?

So which AI company did it? I don't know. It is probably not one of the big ones as they seem to identify their bots: I have seen Open AI and Anthropic naming their crawlers. Therefore the reason I strongly suspect it is _some sort_ of AI crawler is the pattern of the requests which are consistently cyclical over time - consistent with if you programmed a crawler to hit a website every so many seconds. And currently only an _AI_ crawler would bother.

While the incentive to suck _any_ data source dry won't change any time soon, I am hopeful over the next year or so this will be done with more competence: after all as well as costing money to respond to a data request, it also costs money to _make_ a request to a website.

### Does this mean AI is bad? 

For what its worth I quite like AI, most of the time. I'm not a fanboy as I feel it is both exciting _and_ depressing. I worry less about it than other people. But whatever my opinion we are clearly heading into a different internet now.

### What am I going to do?

Here are my options for this website: 

1. Do nothing. When the month is out my usage resets and by then the irresponsible bot will hopefully have moved on. He will likely be back at some point though, either himself or one of his misbehaving cousins.

2. Another option would be to pay my database host (Vercel) more money to allow them to respond to a greater number of requests. This feels entirely unsatisfactory because I would be paying money to give things away to a robot who doesn't even really want it - and whose thirst is effectively unquenchable. If my pockets have just been picked why would fill them up with more money and try exactly the same thing again? [^2]

3. Or I could run everything on the user's computer (ie 'the client'). When they go to the website they automatically download the whole database and the software to query it. This is very workable but is inelegant and another form of wastefulness - the point of an online database is that you shouldn't need to download all of it to see the bits that you are interested in!

4. A fourth option is to put some sort of authentication on the current database, so that only those with the key can access it. This can be done to varying levels of security: I would probably start with the most easily by-passed security and try to create just enough friction to discourage a crawler.

I will probably go for option 4. The irony is that I will implement the change with the help of an AI agent, otherwise I will waste too much of my time figuring out how to do it. 

So the problem is AI and the solution is... AI. I'm not sure if this is an example of Jevon's Paradox or paying protection money to the AI mafia.

Anthony Webb, London

[^1]: I allow anyone to execute arbitrary sql queries against the database - hey I'm just a nice guy! Also as a small (0.6mb), database containing only read only pubic data, the worst case is only that someone abuses this privelege and hammers the database with too many requests. Which is exactly what happened. As an aside I suspect Vercel is rate limited on my free tier at c.6,000 requests an hour.

[^2]: Full disclosure: I haven't actually lost any money. In fact I am currently on Vercel's free tier. I'm very much incentived not to upgrade from this free tier because then I give them my credit card, with no upper limit on costs incurred. Also for the record I am a big fan of Vercel and would recommend them to others!
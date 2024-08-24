---
layout: layouts/page_wide.njk
permalink: '/allbooks-update/'
title: All books
title_content: All books
image: image link here please
meta_excerpt: some info about this and that
tags: page
script_add: [script_bookfilter_modals.js, script_bookfilter.js]

---

<div class="container">

A comprehensive list of recent {% twemoji "📚" %} popular history books below! Click the covers to see more details on that book, also our review {% twemoji "📝" %} if available.

For more info see <a href="#notes">notes</a>. You can also have a poke around the <a href="https://history-books-blush.vercel.app/data/books">underlying data</a>, which allows you to do a text search, and lets you see a few extra details.
  
</div>
<div class="bg-alternative">
<div class="container pad-top-20">
<div id="myFilterGroup" class="container border-rounded bg-normal pad-top-10 margin-top-20"><button type="button" title="show or hide menu" class="open_modal_bookfilter btn btn-color-accent ft-size-small" onclick="toggle_showdetails(id, 'filtercat1')">Filter by....</button>
</div>
</div>
</div>


<dialog class="modal_bookfilter">
<div class="container pad-top-20"> {# this will be start of modal #}


<p class="color-white">Filter by...</p>
<button class="modal_bookfilter_close">&#10005;</button>
<div class="tag-form bg-alternative border-rounded"> <!-- wrapper for accordian -->
<form id="form_filter">
<div id="output">
<p style="padding:20px">Filter options loading. Please refresh the page if they don't appear shortly!</p>
</div>
</form>
</div> <!-- end wrapper for accordian -->

</div> {# this will be end of modal #}
</dialog>

{% set max_intial_books=100 %} {# prevents user seeing all books at once. After filter applied there is no max, this is just for initial render #}

{%- from "sections/macros.njk" import book_covers_all_api with context -%}

<div class="bg-alternative pad-top-20">
<div class="container max-width-1300">
<p id="bookCount" class="ft-size-small">Showing the {{ max_intial_books }} most recently published history books</p>
{{ book_covers_all_api( booksall ) }}

<p id="moreBooks" class="ft-size-small">...use the filter above to show more books.</p>

</div>  
</div>

<div class="container">

<p id="notes">Notes (<a href="#my-body">return to top ↑</a>)</p>

- The purpose of this list is to give you a good feel for all the history books published recently in hardback in the UK, ordered by publication date with the newest at the top. When you first load the page it will show the first {{ max_intial_books }} most recently published books, but you can see many more less recent books if you use the filter. It is a reasonably exhaustive list but…
  - I have excluded military history books which I see as a category all on its own (and would if included have swamped the non-military history books).
  - I have excluded history books that I see as too “local” eg the many books on particular aspects of the US Civil War, or the many books focussing on relatives of medieval English kings.
- The filter is an OR filter within categories and an AND filter between categories. For example if you select '{% twemoji "🗓️" %}  2021' and '{% twemoji "🗓️" %} 2022' books from both years will be shown - 2021 OR 2022...
- ...but if you select '{% twemoji "🗓️" %} 2021' and '{% twemoji "👑" %} Political' then only books that have both attributes will be shown - 2021 AND Political. I think this is intuitively what most people expect to happen.
- (As an aside when applying a filter, for example `{% twemoji "🗓️" %} 2023`, the labels of the other filter buttons will update to show you how many other filters _also_ have `{% twemoji "🗓️" %} 2023` as a filter for a given book. A given edition of a book can only be published once, so this means that the other `publish year` options are greyed out. However you can still click on the other `publish year` filters and the formatting now show you which other filters for a given book include `{% twemoji "🗓️" %} 2023` OR `{% twemoji "🗓️" %} 2023` say... just click around and see what happens!)
- This history book database is hand-curated - the categories for the books are chosen by me when I do my monthly roundup. This means they can't be manipulated to boost sales (“hey my book is in *all* the categories...”) but also that you may or may not agree with my judgement 🙂.
- Links are provided to Amazon UK and US for convenience only, with no affiliation on my part. Please ignore them if you want to shop elsewhere.
- Finally for the more technicially minded among you: this book filter is the front end of a Datasette read-only SQLite database using the API that is generated automatically when you pass SQL queries through a Datasette URL.</div>
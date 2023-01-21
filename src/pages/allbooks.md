---
layout: layouts/page_wide.njk
permalink: '/allbooks/'
title: All books
title_content: All books
image: image link here please
meta_excerpt: some info about this and that
tags: page

---

<div class="container">
  
Comprehensive list of recent {{ "📚" | twemoji | safe }} popular history books below! 👇 Click the covers to see more details on that book, also our review {{ "📝" | twemoji | safe }} if available.

Shopping links are to Amazon for your convenience only. For more info see <a href="#notes">notes</a>.
</div>
<div class="bg-alternative">
<div class="container pad-top-20">
<div id="myFilterGroup" class="container border-rounded bg-normal pad-top-10 margin-top-20"><button type="button" title="show or hide menu" class="open_modal_bookfilter btn btn-color-accent ft-size-small" onclick="toggle_showdetails(id, 'filtercat1')">Filter by....</button>
</div>
</div>
</div>


<dialog class="modal_bookfilter">
<div class="container"> {# this will be start of modal #}
<button class="modal_bookfilter_close">&#10005;</button>

<p class="color-white">Filter by...</p>

<div class="bg-alternative border-rounded"> {# wrapper for accordian #}
{%- set catlooplast = "" -%}
{%- for item in book_categories -%}
{%- set catloop=loop.index0 -%}
{%- set catlooplast=loop.length -%}  
<div  class="container pad-none {% if not loop.last %}border-simple-bottom{% endif %}">
<div tabindex="0" id="expand{{ loop.index }}" class="expander arrow-right" onclick="toggle_showdetails(id, 'cat{{ loop.index }}')">
<p><span class="arrow"></span>{{ item.fields.category }}</p>
</div>

<div id="cat{{ loop.index }}" class="collapse-div">
<div class="container pad-inline-10 bg-normal {% if loop.last %}border-rounded-bottom{% endif %}">
{% set filternames = item.fields.tag_name -%}
{%- set filterunicodes = item.fields.emoji_unicode -%}
{%- for thing in item.fields.tag_emoji -%}
{%- set filterimage = "https://res.cloudinary.com/ds2o5ecdw/image/upload/f_auto/v1673646580/twemoji/" + filterunicodes[loop.index0] + ".png" -%}
<button type="button" id="{{thing}}" class="catbtn{{catloop}} btn btn-color-light ft-size-small margin-top-20 filter-btn">{% if item.fields.icon_type=="emoji" %}{{ thing }} {% elif item.fields.icon_type=="image" %}<img class="img-emoji" loading="lazy" src="{{ filterimage }}" alt="{{ thing }}"> {% endif %}{{ filternames[loop.index0] }}</button>
{% endfor %}
</div>
</div>
</div>
{% endfor %}
<div id="catcounter" data-counter="{{catlooplast}}"></div> {# this is to pass to javascript so it knows how many iterations for loop #}
</div> {# end wrapper for accordian #}

</div> {# this will be end of modal #}
</dialog>

{% set max_intial_books=100 %} {# prevents user seeing all books at once. After filter applied there is no max, this is just for initial render #}

{%- from "sections/macros.njk" import book_covers_all_api with context -%}

<div class="bg-alternative pad-top-20">
<div class="container max-width-1300">
<p id="bookCount" class="ft-size-small">Showing the {{ max_intial_books }} most recently published history books</p>
{{ book_covers_all_api( booksall ) }}

...use the filter above to show more books.

</div>  
</div>

<div class="container">

<p id="notes">Notes (<a href="#my-body">return to top ↑</a>)</p>

- The purpose of this list is to give you a good feel for all the history books published recently in hardback in the UK, ordered by publication date with the newest at the top. When you first load the page it will show the first {{ max_intial_books }} most recently published books, but you can see many more less recent books if you use the filter. It is a reasonably exhaustive list but…
  - I have excluded military history books which I see as a category all on its own (and would if included have swamped the non-military history books).
  - I have excluded history books that I see as too “local” eg the many books on particular aspects of the US Civil War, or the many books focussing on relatives of medieval English kings.
- The filter is an OR filter within categories and an AND filter between categories. For example if you select '{{ "🗓️" | twemoji | safe }}  2021' and '{{ "🗓️" | twemoji | safe }} 2022' books from both years will be shown - 2021 OR 2022...
- ...but if you select '{{ "🗓️" | twemoji | safe }} 2021' and '{{ "👑" | twemoji | safe }} Political' then only books that have both attributes will be shown - 2021 AND Political. I think this is intuitively what most people expect to happen!
- This history book database is hand-curated - the categories for the books are chosen by me when I do my monthly roundup. This means they can't be manipulated to boost sales (“hey my book is in *all* the categories!”) but also that you may or may not agree with my judgement 🙂.
- Finally for the more technicially minded among you: this is not a _proper_ database because all books are loaded when the page loads and are then selectively hidden or shown by the filter. On the negative side this is not a scalable solution, on the positive side it works well enough for now!</div>
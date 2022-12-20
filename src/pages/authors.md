---
layout: layouts/page.njk
permalink: '/authors/'
title: Authors we have reviewed
image: link here
title_content: Authors we have reviewed
tags: page

---
Sorted by surname...

{% set things = collections.all) %}

<ul>
{% for letter, thing in things | groupby("data.book_author_1stletter") %}
{% if letter!=="undefined" %}<li class="pad-bottom-20 nobullet"><h2>{{ letter }}</h2>
{# so if you _do_ have a letter then format nicely #}
  
<ul>
{% for item in thing|sort(attribute="data.review_book_author_surname") %}
{% if author_name_check==item.data.review_book_author %}
{# checking to see if current loop name is same as previous, author_name_check is set below on previous loop. If it is the same then just show name of book and don't repeat author name #}
<p class="margin-top-10"><a href="{{ item.url}}">{{ item.data.review_book_main_title }}</a>, published {{item.data.review_publication_date | myDateString }}.</p>
{% else %}
<li><p class="margin-top-40 margin-bottom-none"><strong>{{item.data.review_book_author_surname}}</strong> ({{item.data.review_book_author}})</p><p class="margin-top-10 margin-bottom-none"><a href="{{ item.url}}">{{ item.data.review_book_main_title }}</a>, published {{item.data.review_publication_date | myDateString }}.</p></li>
{% endif %}
{% set author_name_check=item.data.review_book_author %}
{% endfor %}
{% endif %}</ul>
</li>
{% endfor %}
</ul>
---
layout: layouts/page.njk
permalink: '/authors/'
title: Authors we have reviewed
image: link here
title_content: Authors we have reviewed
tags: page
---
Sorted by surname...

{% set things = collections.all | sort(attribute="data.review_book_author_surname") %}

<ul>
{% for letter, thing in things | groupby("data.book_author_1stletter")  %}
{% if letter!=="undefined" %}<li class="pad-bottom-20 nobullet"><h2>{{ letter }}</h2>
<ul>
{% for item in thing %}
<li><p><strong>{{item.data.review_book_author_surname}}</strong> ({{item.data.review_book_author}})<br> <a href="{{ item.url}}">{{ item.data.review_book_main_title }}</a>, published {{item.data.review_publication_date | myDateString }}.</p></li>
{% endfor %}{% endif %}</ul>
</li>
{% endfor %}
</ul>
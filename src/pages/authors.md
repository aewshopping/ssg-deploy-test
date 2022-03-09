---
layout: layouts/page.njk
permalink: '/authors/'
title: Authors we have reviewed
image: link here
title_content: Authors we have reviewed
tags: page
---
Sorted by most recently reviewed author first.
<br>
<br>

{% set things = collections.all | reverse %}
<ul>
{% for author, things in things | groupby("data.review_book_author") %}
{% if author!=="undefined" %}<li><p>{{ author }}</p>
{% for item in things %}
<p class="ft-size-small"><a href="{{ item.url}}">{{ item.data.review_book_main_title }}</a>, published {{item.data.review_publication_date | myDateString }}.</p>
{% endfor %}{% endif %}</li>
{% endfor %}
</ul>
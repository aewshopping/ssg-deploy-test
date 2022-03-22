---
layout: layouts/page.njk
permalink: '/categories/'
title: Post categories
image: link here
title_content: Categories
tags: page

---
<p>Links to all post categories, with the number of posts in brackets</p>

{%- for tag, posts in collections %}
{% if (tag !="post") and (tag !="posts") and (tag !="page") and (tag !="all")  %}<a href="/tags/{{ tag }}" class="tagpill">{{ tag }} ({{ posts | length }})</a>{% endif %}{%- endfor %}

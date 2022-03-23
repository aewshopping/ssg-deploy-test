---
layout: layouts/page.njk
title_content: Posts with the tag...
pagination:
  data: collections
  size: 1
  alias: tag
permalink: /tags/{{ tag }}/

---

{# from https://github.com/11ty/eleventy/issues/927 #}
{%- for atag, posts in collections %}
{% if (atag !="post") and (atag !="posts") and (atag !="page") and (atag !="all")  %}<a href="/tags/{{ atag }}" class="tagpill ft-size-normal {% if atag==tag %}tagpill_selected{% endif %}">{{ atag }} ({{ posts | length }})</a>{% endif %}{%- endfor %}



<div class="grid_posts">
{% set taglist = collections[ tag ] %}

{% for post in taglist | reverse %}

<div class="fix-children grid_post_container grid_post_taglist summary_text">
<p class=" undecorate_link">{{loop.index}}. <a class="main_link" href="{{ post.url | url }}">{{ post.data.title }}</a><br>
<p class="ft-size-small">{% if tag=="review" %}{{post.data.review_rating}} - {% endif %}Posted on {{post.data.date | htmlDateString }}</p>

</div>
{% endfor %}
  
</div>
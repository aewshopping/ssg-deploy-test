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
{% if (atag !="post") and (atag !="posts") and (atag !="page") and (atag !="all") and (atag !="allReviewCats") %}<button type="button" onclick="location.href='/tags/{{ atag }}'" class="btn tagpill ft-size-small {% if atag==tag %}tagpill_selected{% endif %}">{{ atag }}&nbsp;({{ posts | length }})</button>{% endif %}{%- endfor %}

{% if tag=="review" %}(Hint: if you want to browse for just 5 star reviews go to the [all history books page]({{ staticdata.links.books_all }}), click the __Filter by...__ button and select the __Prizes__ option __⭐ PHB 5 stars award__.){% endif %}

<div class="grid_posts">
{% set taglist = collections[ tag ] %}

{% for post in taglist | reverse %}

<div class="fix-children grid_post_container grid_post_taglist summary_text {% if tag=="review" %}grid_post_taglist_review{% endif %}">

  <p class=" undecorate_link">{{loop.index}}. <a class="main_link" href="{{ post.url | url }}">{{ post.data.title }}</a><br></p>
  <p class="ft-size-small">{% if tag=="review" %}{{post.data.review_rating}} - {% endif %}Posted on {{post.data.date | htmlDateString }}</p>
  {% if tag=="review" %}<img loading="lazy" class="grid_post_bookimage" src="{{post.data.review_book_image_small_url | replace("upload/","upload/f_auto/")}}" alt="Book cover for {{post.data.review_book_main_title}}">{% endif %}

</div>
{% endfor %}
  
</div>
---
layout: layouts/post.njk
permalink: '/posts/best-history-books-reviewed-by-us/'
tags: [post, best books]
title: Best history books of all time (reviewed by us)
post_author: Anthony Webb
date: 2024-01-02
image: https://res.cloudinary.com/ds2o5ecdw/image/upload/v1716235618/posts/ThirdAnniversary.jpg
meta_excerpt: What were the best popular history books of all time (that have been reviewed by us)? Here are our favourites.
---

These are the best popular history books that we have read and reviewed on this site, each one receiving a coveted 5x⭐ rating. Bear in mind we probably review about 5% of all popular history books published in the UK, so there are others... (and you can find them here, on the [all history books page]({{ staticdata.links.books_all }})). But the ones below won't let you down.

So here they are, listed in order of date reviewed with most recently reviewed first! The links take you to more details on each book below.

{% set taglist = collections["review"] | reverse %}

<ol>
{% for post in taglist %}
{% if (post.data.review_rating == "★★★★★") %}
<li><a href="#{{ post.data.review_book_main_title }}">{{ post.data.review_book_main_title }}</a>: {{ post.data.review_book_sub_title }}</li>
{% endif %}
{% endfor %}
</ol>

<hr>

{% for post in taglist %}
{% if (post.data.review_rating == "★★★★★") %}

<div class="grid_post_container grid_post_review summary_text fix-children pad-top-10" id="{{ post.data.review_book_main_title }}">
<img loading="lazy" class="grid_post_bookimage" src="{{post.data.review_book_image_small_url | replace("upload/","upload/f_auto/")}}" alt="Book cover for {{post.data.review_book_main_title}}">
<h3 class="grid_post_title">{{ post.data.review_book_main_title }}: {{ post.data.review_book_sub_title }}</h3>
<p class="pad-top-20"> {{ post.data.review_summary | safe}}</p>
<p> {{ post.data.review_rating }}</p>
<p> <a href="{{ post.url }}">Link to full review</a> | <a href="#booklist">Back to top</a></p>
</div>
<br>
<br>

{% endif %}
{% endfor %}

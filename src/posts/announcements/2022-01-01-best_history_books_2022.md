---
layout: layouts/post.njk
permalink: ''
tags: [post, best books]

title: Best history books of 2022 
post_author: Anthony Webb
date: 2023-01-01
image: 
meta_excerpt: What are the best popular history books of 2022? Here are our favourites so far.
---

What are the best popular history books published in 2022 in the UK?

These are the best popular history books that we have read and reviewed on this site. The links take you to more details on each book below.

If you want to see __all__ history books published in 2022 you can search our [history books mini database]({{ staticdata.links.books_all }}). There are many more history books published than we are able to review!

{% set YearRoundUp = "2022" %}
{% set taglist = collections["review"] | reverse %}

<h4 id="booklist">Our highest rated history books of {{YearRoundUp}}</h4>
<ul>
{% for post in taglist %}
{% if (post.data.review_publication_date | myDateYear==YearRoundUp) and (post.data.review_rating == "★★★★★") %}
<li><a href="#{{ post.data.review_book_main_title }}">{{ post.data.review_book_main_title }}</a>: {{ post.data.review_book_sub_title }}</li>
{% endif %}
{% endfor %}
</ul>

<h4>Highly recommended {{YearRoundUp}} history books</h4>
<ul>
{% for post in taglist %}
{% if (post.data.review_publication_date | myDateYear==YearRoundUp) and (post.data.review_rating == "★★★★☆") %}
<li><a href="#{{ post.data.review_book_main_title }}">{{ post.data.review_book_main_title }}</a>: {{ post.data.review_book_sub_title }}</li>
{% endif %}
{% endfor %}
</ul>

<hr>

{% for post in taglist %}
{% if post.data.review_publication_date | myDateYear==YearRoundUp %}
{% if (post.data.review_rating == "★★★★☆") or (post.data.review_rating == "★★★★★") %}

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
{% endif %}
{% endfor %}

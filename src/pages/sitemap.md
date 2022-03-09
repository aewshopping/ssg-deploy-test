---
layout: layouts/page.njk
permalink: '/sitemap/'
image: link here
title: A human readable sitemap
title_content: Sitemap of pages and posts
---

## Pages

{% set taglist = collections["page"] %}

<ol>
{% for post in taglist %}
  <li>
    <p><a href="{{post.url}}">{{ post.data.title }}</a></p>
{% endfor %}
  </li>
</ol>

## Posts
  
{% set taglist = collections["post"] | reverse %}

<ol>
{% for post in taglist %}
  <li>
    <p><a href="{{post.url}}">{{ post.data.title }}</a>
• <span class="ft-size-small">posted on
{{post.data.date | htmlDateString }}</span></p>
  <p class="ft-size-small">{{ post.data.meta_excerpt }}</p>
{% endfor %}
  </li>
</ol>
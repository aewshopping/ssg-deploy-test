const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
	    const sql = `with books_all as (
-- get 600 most recent books but make all reviewed and prize books included 
  select
    books.isbn_10,
    hb_publish_date,
    review_url,
    group_concat(tags.tag_emoji, ' ') as 'css filter classes',
    CASE
      WHEN group_concat(cats.pk_cat_id) LIKE '%cat-07%' THEN 'true'
      /* test to see if a prize book */
      ELSE null
    END as prize_check
  from
    books
    join books_tags on books.isbn_10 = books_tags.isbn_10
    join tags on books_tags.tag_id = tags.pk_tag_id
    join cats on tags.fk_cat_id = cats.pk_cat_id
  group by
    books.isbn_10
  order by
    review_url desc,
    prize_check desc,
    hb_publish_date desc
  limit
    600
),
books_all_isbn_10 as (
-- just get the isbns from most recent books
  select
    isbn_10
  from
    books_all
),
tags_count as (
  /* find out which tags are used by those books */
  select
    tag,
    cast(count(tag) as text) as tag_count,
    tag_emoji,
    tag_text,
    emoji_unicode,
    tag_sort,
    fk_cat_id,
    cat_text as category
  from
    books_tags
    join tags on books_tags.tag_id = tags.pk_tag_id
    join cats on tags.fk_cat_id = cats.pk_cat_id
  where
    books_tags.isbn_10 in books_all_isbn_10
  group by
    tag
)
select
-- finally build the table in the shape required!
  cat_text as category,
  cat_sort as sort_order,
  cat_display_type as icon_type,
  json_group_array(tags_count.tag_emoji order by tag_sort asc, tag_text asc) as tag_emoji,
  json_group_array(tags_count.tag_text order by tag_sort asc, tag_text asc) as tag_name,
  json_group_array(tags_count.emoji_unicode order by tag_sort asc, tag_text asc) as emoji_unicode,
  json_group_array(tags_count.tag_count order by tag_sort asc, tag_text asc) as tag_count
from
  cats
  join tags_count on cats.pk_cat_id = tags_count.fk_cat_id
group by
  cat_text
order by
  cat_sort asc`;

const url = ("https://history-books-blush.vercel.app/data.json?sql=" + encodeURIComponent(sql) + "&_shape=array&_json=tag_emoji&_json=tag_name&_json=emoji_unicode&_json=tag_count");

	/* This returns a promise */
	return EleventyFetch(url, {
		duration: "1d", // save for 1 day
		type: "json", // we’ll parse JSON for you
	});
};
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
	    const sql = `with books_all as (
  select
    books.isbn_10 as 'ASIN (HB)',
    title as Title,
    author as Author,
    hb_publish_date as 'HB Publish date',
    review_url as 'Review url',
    concat(
      'https://res.cloudinary.com/ds2o5ecdw/image/upload/acovers/',
      books.isbn_10,
      '.02._SCM_.jpg'
    ) as 'URL Cldnry img small',
    concat(
      'https://res.cloudinary.com/ds2o5ecdw/image/upload/acovers/',
      books.isbn_10,
      '.02._SCL_.jpg'
    ) as 'URL Cldnry img large',
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
  where
    hb_publish_date like '' || '%'
    /* for ease of filtering by date eg 2024-06 in the quotes */
  group by
    books.isbn_10
  order by
    review_url desc,
    prize_check desc,
    hb_publish_date desc
  limit
    600
)
select
  *
from
  books_all
order by
  "HB Publish date" desc`;

const url = ("https://history-books-blush.vercel.app/data.json?sql=" + encodeURIComponent(sql) + "&_shape=array");

	/* This returns a promise */
	return EleventyFetch(url, {
		duration: "1d", // save for 1 day
		type: "json", // we’ll parse JSON for you
	});
};
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
	    const sql = `with books_all as (
  select
    books.isbn_10 as 'isbn_10',
    title,
    author,
    hb_publish_date,
    review_url,
    concat(
      'https://res.cloudinary.com/ds2o5ecdw/image/upload/acovers/',
      books.isbn_10,
      '.02._SCM_.jpg'
    ) as 'url_cldnry_img_small',
    concat(
      'https://res.cloudinary.com/ds2o5ecdw/image/upload/acovers/',
      books.isbn_10,
      '.02._SCL_.jpg'
    ) as 'url_cldnry_img_large',
    group_concat(tags.tag_emoji, ' ') as 'css_filter_classes'
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
    hb_publish_date desc
  limit
    100
)
select
  *
from
  books_all
order by
  hb_publish_date desc`;

const url = ("https://datasette-for-history-books.glitch.me/data.json?sql=" + encodeURIComponent(sql) + "&_shape=array");
  // https://datasette-for-history-books.glitch.me/data is a backup but needs manually updated csv files. https://history-books-blush.vercel.app/data
  

	/* This returns a promise */
	return EleventyFetch(url, {
		duration: "1d", // save for 1 day
		type: "json", // we’ll parse JSON for you
	});
};
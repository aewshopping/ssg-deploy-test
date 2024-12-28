const cldnry_url = "https://res.cloudinary.com/ds2o5ecdw/image/upload/acovers/";
const cldnry_url_stem = "https://res.cloudinary.com/ds2o5ecdw/image/upload/";
const vercel_url = "https://datasette-for-history-books.glitch.me/data.json?sql="; // had been using https://history-books-blush.vercel.app/data but unfortunately github actions vercel login stopped working for me.
const datasette_options_book = "&_shape=array";
const datasette_options_cats =
  "&_shape=array&_json=tag_emoji&_json=tag_name&_json=emoji_unicode&_json=tag_count&_json=pk_tag_id";
const sql_limit_initial = "100";
let sql_limit = "100";
const book_load_limit = 300;
let sql_top_100 = `select
    books.isbn_10 as 'isbn_10',
    title,
    author,
    hb_publish_date,
    review_url,
    concat(
      '${cldnry_url}',
      books.isbn_10,
      '.02._SCM_.jpg'
    ) as 'url_cldnry_img_small',
    concat(
      '${cldnry_url}',
      books.isbn_10,
      '.02._SCL_.jpg'
    ) as 'url_cldnry_img_large',
    group_concat(tags.tag_emoji, ' ') as 'css_filter_classes'
  from
    books
    join books_tags on books.isbn_10 = books_tags.isbn_10
    join tags on books_tags.tag_id = tags.pk_tag_id
    join cats on tags.fk_cat_id = cats.pk_cat_id
  group by
    books.isbn_10
  order by
    hb_publish_date desc
  limit ${sql_limit}`;
const sql_first_section_AND = `with temp_table as (
  select
    books.isbn_10 as 'isbn_10',
    title,
    author,
    hb_publish_date,
    review_url,
    concat(
      '${cldnry_url}',
      books.isbn_10,
      '.02._SCM_.jpg'
    ) as 'url_cldnry_img_small',
    concat(
      '${cldnry_url}',
      books.isbn_10,
      '.02._SCL_.jpg'
    ) as 'url_cldnry_img_large',
    group_concat(books_tags.tag_id, ' ') as tag_id_all,
    group_concat(tags.tag_emoji, ' ') as 'css_filter_classes'
  from
    books
    join books_tags on books.isbn_10 = books_tags.isbn_10
    join tags on books_tags.tag_id = tags.pk_tag_id
  group by
    books.isbn_10
  order by
    hb_publish_date desc
)
select
  *
from
  temp_table
where`;
const cat_sql = `with tags_count as (
  select
    tag,
    pk_tag_id,
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
  group by
    tag
)
select
-- build the table in the shape required!
  cat_text as category,
  pk_cat_id,
  cat_sort as sort_order,
  cat_display_type as icon_type,
  json_group_array(tags_count.pk_tag_id order by tag_sort asc, tag_text asc) as pk_tag_id,
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
const sql_tag_counter_all = `with books_count as (
-- returns a one row table with all books count
  select
    isbn_10,
    count(isbn_10) as book_count
  from
    books
),
tags_count as (
-- find out which tags are used by all books
  select
    books_tags.isbn_10 as isbn_10,
    tag_id,
    count(tag_id) as tag_count,
    book_count
  from
    books_tags full
    outer join books_count on books_tags.isbn_10 = books_count.isbn_10
  group by
    tag_id
)
select
  tags.pk_tag_id as tag_id,
  tags.tag_emoji,
  tags.tag_text,
  ifnull(tags_count.tag_count, 0) as tag_count,
  (select max(book_count) from tags_count) as book_count
from
  tags full
  outer join tags_count on tags.pk_tag_id = tags_count.tag_id`;

const sql_tag_counter_filter_first_section = `with books_with_tag_ids as (
  -- books table with all tag_ids shown
  select
    books.isbn_10 as 'isbn_10',
    group_concat(books_tags.tag_id, ' ') as tag_id_all
  from
    books
    join books_tags on books.isbn_10 = books_tags.isbn_10
  group by
    books.isbn_10
),
tags_filtered as (
  -- books table filtered by desired tags
  select
    *
  from
    books_with_tag_ids
  where`

const sql_tag_counter_filter_last_section = `),
bookcount_table as (
  -- table to count all books with that filter
  select
    isbn_10,
    count(isbn_10) as book_count
  from
    tags_filtered
)
-- table to count for each tag how many books with that tag ALSO have the tags currently selected
select
  pk_tag_id as tag_id,
  count(tag_id) as tag_count,
  (select max(book_count) from bookcount_table) as book_count
from
  books_tags
  join tags_filtered on books_tags.isbn_10 = tags_filtered.isbn_10 full
  outer join bookcount_table on books_tags.isbn_10 = bookcount_table.isbn_10 full
  outer join tags on books_tags.tag_id = tags.pk_tag_id
group by
  pk_tag_id`;

var cat_id_arr = []; // used to construct json from select tags
var bookcounter;
var numBooks;
var categories_url =
  vercel_url + encodeURIComponent(cat_sql) + datasette_options_cats; // url to bring back json of categories

document.addEventListener("DOMContentLoaded", function () {
  renderCategories(categories_url).catch((error) => {
    console.log("Error " + error);
  });
  console.log(categories_url);
});

function handleFormSubmit(event) {
  // thanks to https://www.learnwithjason.dev/blog/get-form-values-as-json/
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  // for multi-selects (on the same input 'name'), we need special handling
  for (let i = 0; i < cat_id_arr.length; i++) {
    let myarray = data.getAll(cat_id_arr[i]);
    if (myarray.length > 0) {
      // check some category is ticked
      formJSON[cat_id_arr[i]] = myarray; // if it is, add it to the formJSON object
    }
  }

  //  const mykeys = Object.keys(formJSON); // not interested in keys right now
  const myvalues = Object.values(formJSON); // get the values

  let mysql_books = create_sql_books_query(myvalues);
  console.log(mysql_books)
  let mysql_tags = create_sql_tag_count_query(myvalues);

  let tag_count_url =
    vercel_url + encodeURIComponent(mysql_tags) + datasette_options_book;
  let books_url =
    vercel_url + encodeURIComponent(mysql_books) + datasette_options_book;

  renderTagCounts(tag_count_url, books_url).catch((error) => {
    console.log("Error " + error);
  });
  // FYI I am now calling renderBooks within renderTagCounts so that both the total number of books matching the filter (from renderTagCounts) and the total number of books returned in this query (with limit - from renderBooks) can be calculated before updating the text to show how many books. Hence two urls, one gets passed through to renderBooks.
}

const myform = document.getElementById("form_filter");
myform.addEventListener("submit", handleFormSubmit); // not used directly but needed to stop functions calling submit form from reloading the page
const results = document.querySelector(".results pre");
const book_grid = document.querySelector(".books_output");

//////// FUNCTIONS BELOW HERE ////////

async function renderBooks(url) {
  const response = await fetch(url);
  const bookJson = await response.json();
  let html = "";
  numBooks = bookJson.length;
  bookJson.forEach(function (book, index) {
    const bookid = "cover" + book.isbn_10;
    let img_container_class;
    if (book.review_url.length > 0) {
      img_container_class = "image_cover_container_fit_reviewed";
    } else {
      img_container_class = "image_cover_container_fit";
    }

    html += `<div class="fix-children">
  <div class="image_cover_container">
    <img
      loading="lazy"
      class="image_book_cover"
      src="${book.url_cldnry_img_small}"
      alt="${book.title}"
      title="${book.title}"
    />
    <div class="${img_container_class}">
      <div
        id="${bookid}"
        onclick="open_modal_bookzoom('${bookid}')"
        class="image_book_overlay open_modal_bookzoom"
        data-title="${book.title}"
        data-author="${book.author}"
        data-publishdate="${book.hb_publish_date}"
        data-cover_large="${book.url_cldnry_img_large}"
        data-amazon_uk_link="https://amazon.co.uk/dp/${book.isbn_10}"
        data-amazon_us_link="https://amazon.com/dp/${book.isbn_10}"
        data-review="${book.review_url}"
        data-emojis="${book.css_filter_classes}"
      >
        <div class="center_item">
          <svg
            class="svg-icon-zoom"
            height="30px"
            width="30px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              d="M39.8 41.95 26.65 28.8Q25.15 30.1 23.15 30.825Q21.15 31.55 18.9 31.55Q13.5 31.55 9.75 27.8Q6 24.05 6 18.75Q6 13.45 9.75 9.7Q13.5 5.95 18.85 5.95Q24.15 5.95 27.875 9.7Q31.6 13.45 31.6 18.75Q31.6 20.9 30.9 22.9Q30.2 24.9 28.8 26.65L42 39.75ZM18.85 28.55Q22.9 28.55 25.75 25.675Q28.6 22.8 28.6 18.75Q28.6 14.7 25.75 11.825Q22.9 8.95 18.85 8.95Q14.75 8.95 11.875 11.825Q9 14.7 9 18.75Q9 22.8 11.875 25.675Q14.75 28.55 18.85 28.55ZM20.3 24.3H17.3V20.2H13.2V17.2H17.3V13.15H20.3V17.2H24.35V20.2H20.3Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  });
  book_grid.innerHTML = html;

  count_books();
}

function count_books() {
  // doesn't actually count books but takes the numbers calculated elsewhere and renders on page, with some logic to load more books if not all are shown
  let book_msg_start = `Showing ${numBooks} of ${bookcounter} books`;
  let book_msg_end = `${book_msg_start}`;
  if (numBooks == book_load_limit) {
    book_msg_end = `Showing ${book_load_limit} of ${bookcounter} books, this is the maximum you can load at one time!`;
  } else if (numBooks < bookcounter) {
    book_msg_end += `, click <span  onclick="change_sql_limit(100)" style="cursor:pointer;font-style:normal"><img class="img-emoji" alt="➕" loading="lazy" src="https://res.cloudinary.com/ds2o5ecdw/image/upload/twemoji/2795.png"></span> for more`;
  }

  document.getElementById("bookCount").innerHTML = book_msg_start;
  document.getElementById("moreBooks").innerHTML = book_msg_end;
}

function change_sql_limit(change) {
  // allows you to change the max number of books returned in a search, subject to overall max and mins. Note sql limits get reset to sql_limit_initial when running a fresh filter
  console.log(change);
  sql_limit = Number(sql_limit);
  let sql_limit_old = sql_limit;
  sql_limit += Number(change);
  sql_limit = Math.min(sql_limit, book_load_limit);
  sql_limit = Math.max(sql_limit, 50);
  sql_limit_replace(sql_limit_old, sql_limit);
  myform.requestSubmit();
}

function sql_limit_replace(sql_limit_old, sql_limit_new) {
  sql_top_100 = sql_top_100.replace(
    `limit ${sql_limit_old}`,
    `limit ${sql_limit_new}`
  );
  sql_limit = sql_limit_new;
}

function create_sql_books_query(arrays) {
  let sql_query;
  if (arrays.length == 0) {
    sql_query = sql_top_100;
  } else {
    arrays.flat().forEach(function (tag, index) {
      if (index == 0) {
        sql_query = sql_first_section_AND;
      } else {
        sql_query += " AND ";
      }
      sql_query += ` tag_id_all like '%${tag}%' `;
    });

    sql_query += `limit ${sql_limit}`;
    console.log(sql_query);
  }

  return sql_query;
}

function create_sql_tag_count_query(arrays) {
  let sql_query;
  if (arrays.length == 0) {
    sql_query = sql_tag_counter_all;
  } else {
    arrays.flat().forEach(function (tag, index) {
      if (index == 0) {
        sql_query = sql_tag_counter_filter_first_section;
      } else {
        sql_query += " AND ";
      }
      sql_query += ` tag_id_all like '%${tag}%' `;
      
    });
    sql_query += sql_tag_counter_filter_last_section
  }
  return sql_query;
}

async function renderCategories(url) {
  let result = "";
  const response = await fetch(url);
  const catdata = await response.json();

  catdata.forEach(function (category, index) {
    cat_id_arr.push(category["pk_cat_id"]); // this helps build the json object later in the form submit function
    let cat_id = category["pk_cat_id"];
    let cat_name = category["category"];
    let icon_type = category["icon_type"];
    let cat_border, cat_border_bottom;
    if (index != catdata.length - 1) {
      cat_border = "border-simple-bottom";
    } else {
      cat_border = "";
    }
    if (index == catdata.length - 1) {
      cat_border_bottom = "border-rounded-bottom";
    } else {
      cat_border_bottom = "";
    }

    result += `<div  class="container pad-none ${cat_border}"><div class="input-group"><div tabindex="0" id="expand${index}" class="expander arrow-right" onclick="toggle_showdetails(id, 'cat${index}')">
<p><span class="arrow"></span>${cat_name}</p>
</div>
<div id="cat${index}" class="collapse-div">
<div class="container pad-inline-10 bg-normal ${cat_border_bottom}">`;

    for (let i = 0; i < category["tag_emoji"].length; i++) {
      let tag_id = category["pk_tag_id"][i];
      let tag_name = category["tag_name"][i];
      let tag_emoji = category["tag_emoji"][i];
      let tag_count = category["tag_count"][i];
      let tag_emoji_unicode = category["emoji_unicode"][i];
      let tag_emoji_render;
      if (icon_type == "emoji") {
        tag_emoji_render = tag_emoji;
      } else if (icon_type == "image") {
        tag_emoji_render = `<img class='img-emoji' alt='${tag_emoji}' loading='lazy' src='${cldnry_url_stem}twemoji/${tag_emoji_unicode}.png'>`;
      }
      let tag_count_width = tag_count.toString().length + 0.8;

      result += `<label id="${tag_id}label" class="tag_label margin-top-20 ft-size-small" for="${tag_name}"><input id="${tag_name}" class="tag_check" data-labelname="${tag_emoji_render} ${tag_name}" name="${cat_id}" type="checkbox" value="${tag_id}"/>
      ${tag_emoji_render} ${tag_name} &nbsp<span style="min-width:${tag_count_width}ch" id="${tag_id}count" class="ft-size-verysmall">(${tag_count})</span></label>`;
    } // loop on checkbox creation ends here

    result += `</div></div></div></div>`; // close off divs on all checkbox groups
  }); // loop on categories ends here

  document.getElementById("output").innerHTML = `${result}`; // pop the created HTML into the modal

  // add click event function to all filter labels
  const filterchecks_all = document.querySelectorAll(".tag_check");
  filterchecks_all.forEach((filterchk) => {
    filterchk.addEventListener("click", function (btnID) {
      sql_limit_replace(sql_limit, sql_limit_initial);
      myform.requestSubmit(); // call API on btn click to save time. Use submitRequest not submit because prevents page refresh
      addRemoveFilterBtn(this.id); // if label exists then remove otherwise create
    });
  });
}

async function renderTagCounts(url, books_url) {
  // function to update the little counters next to the filter check boxes

  const response = await fetch(url);
  const tagsdata = await response.json();
  bookcounter = tagsdata[0]["book_count"];
  //  console.log(bookcounter);

  tagsdata.forEach(function (tag, index) {
    let countid = tag["tag_id"] + "count";
    let labelid = tag["tag_id"] + "label";
    let tagcount = tag["tag_count"];

    let countelem = document.getElementById(countid);
    let labelelem = document.getElementById(labelid);

    if (countelem != null) {
      countelem.innerText = `(${tagcount})`;
      if (tagcount == 0) {
        labelelem.classList.add("txt-subtle-color", "bg-normal");
      } else {
        labelelem.classList.remove("txt-subtle-color", "bg-normal");
      }
    }
  });
  renderBooks(books_url).catch((error) => {
    console.log("Error " + error);
  });
}

function addRemoveFilterBtn(id) {
  // if filter label / button thing exists then remove, otherwise create
  let idCheck = document.getElementById(id + "f");
  if (idCheck != null) {
    idCheck.remove(0);
  } else {
    myShowFilterLabel2(id);
  }
}

function myShowFilterLabel2(id) {
  //  creates a button to match the filter that has just been applied, puts the button above the books so you can see which filters are active, then attaches a function to the button to allow you to remove the filter.

  let xbtn = document.createElement("button");
  let location = document.getElementById("myFilterGroup");
  let btnText = document.getElementById(id).dataset.labelname;

  let xbtnHtml = `<button type="submit" id="${id}f" class="btn btn-color-bg btn-rounded ft-size-small my-close">${btnText}</button>`;

  location.insertAdjacentHTML("beforeend", xbtnHtml);

  let ybtn = document.getElementById(`${id}f`);
  ybtn.onclick = function () {
    sql_limit_replace(sql_limit, sql_limit_initial);
    document.getElementById(id).checked = false;
    myform.requestSubmit();
    ybtn.remove();
  };
}

const $page = $(".page");
const $pageHead = $(".page-header");
const $stuList = $(".student-list");
const $stuItem = $(".student-item");
const stuSearch = `
  <div class="student-search">
    <input placeholder="Search for students...">
    <button>Search</button>
  </div>`;
const pagina = `<div class="pagination"></div>`;
const zeroMsg = `<div class="zeroMsg"></div>`;

// add search area to page-header
$pageHead.append(stuSearch);
// add zero results area to page start
$stuList.prepend(zeroMsg);
// add pagination area to page end
$page.append(pagina);
// add match class to all student items
$stuItem.addClass("match");

const $pagina = $(".pagination");
const $zeroMsg = $(".zeroMsg");
const $button = $("button");
const $input = $("input");

// calculate search results
let $matchCount = $(".match").length;
// calculate number of pages returned
let $matchSplit = $matchCount / 10;
// round the number up
let $matchSection = Math.ceil($matchSplit);

let slicePage = (start, stop) => {
  // hide all results by default
  $(".match").hide();
  // display initial selection
  $(".match").slice(start, stop).show();
};

// display results 1-10 onLoad
slicePage(0, 10);

let createLinks = (num) => {
  // create pagination html
  var linkHTML = `
  <ul>
    <li>
      <a class="active" href="#1">1</a>
    </li>`;
  // create parameter for number of links
  for (var i = 2; i <= num; i++) {
    linkHTML += `
    <li>
      <a href="#${i}">${i}</a>
    </li>`;
  }
  linkHTML += `</ul>`;

  // output html to pagination area
  $pagina.html(linkHTML);
};

// create page links onLoad
createLinks($matchSection);

let searchStu = () => {
  // loop through each list item
  $stuItem.each(function () {
    // monitor search input
    var $inputVal = $input.val();
    // check if list item matches search input & respond
    if ($(this).text().match($inputVal)) {
      $(this).addClass("match").show();
    } else {
      $(this).removeClass("match").hide();
    }
  });
};

$("button").on("click", () => {
  // empty zero message contents by default
  $zeroMsg.html("");

  // search all list items
  searchStu();

  // update match variables
  let $matchCount = $(".match").length;
  let $matchSplit = $matchCount / 10;
  let $matchSection = Math.ceil($matchSplit);

  // check variables update correctly
  console.log($matchCount);

  if ($matchCount == 0) {
    // if no matches, display fallback message
    const noMatches = `Sorry, no matches this time`;
    $zeroMsg.html(noMatches);
    // & clear page links
    $pagina.html("");
  }

  if ($matchCount > 0) {
    // if matched, create pagination
    createLinks($matchSection);
  }

  if ($matchCount >= 10) {
    // display results 1-10 only
    slicePage(0, 10);
  }
});

// monitor page links & respond on click
$(".pagination").on("click", "ul li a", function () {
  const $this = $(this);
  const $num = $this.html();
  const $others = $this.parents().siblings().children("a");

  // create page slice from link number
  let start = ($num - 1) * 10;
  let stop = $num * 10;

  // check slice calculation
  console.log(start);
  console.log(stop);

  // remove active style by default
  $others.removeClass("active");
  // add to current selection
  $this.addClass("active");

  // only add functionality, if 10+ results returned
  if ($matchCount >= 10) {
    slicePage(start, stop);
  }
});

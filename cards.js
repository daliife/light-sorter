const NUM_ROWS = 10;
const NUM_COLUMS = 33;
const multipleSource = `
{{#each this}}
  <div class="element-item {{this.type}} clickable" data-category="{{this.type}}" onclick="updateDescription(this);">
    <div class="inner-square {{this.type}}"></div>
    <p class="title">{{this.title}}</p>
    <p class="description">{{this.description}}</p>
    <p class="imageUrl">{{this.imageUrl}}</p>
    <p class="url">{{this.url}}</p>
    <p class="date">{{this.date}}</p>
  </div>
{{/each}}
`;
const emptyObject = {
  title: "Z",
  date: 0,
  type: "empty",
};
const uniqueSource = `
<div class="element-item {{type}}" data-category="{{type}}" onclick="updateDescription(this); style="pointer-events>
  <div class="inner-square {{type}}"></div>
  <p class="title">{{title}}</p>
  {{#if description}}
  <p class="description">{{description}}</p>
  {{/if}}
  {{#if imageUrl}}
  <p class="imageUrl">{{imageUrl}}</p>
  {{/if}}
  {{#if url}}
  <p class="url">{{url}}</p>
  {{/if}}
  <p class="date">{{date}}</p>
</div>
`;
var NUM_EMPTY_ELEMENTS;
var inputData;
var firstLoad = true;

function updateDescription(newCardInfo) {
  $(".card-value").text(
    jQuery(newCardInfo).children(".title")[0].innerText +
      " - " +
      jQuery(newCardInfo).children(".date")[0].innerText
  );
  $(".card-description").text(
    jQuery(newCardInfo).children(".description")[0].innerText
  );
  $(".card-link").attr(
    "href",
    jQuery(newCardInfo).children(".url")[0].innerText
  );
  $(".card-image").attr(
    "src",
    jQuery(newCardInfo).children(".imageUrl")[0].innerText
  );
}

function showCard() {
  if (firstLoad) {
    firstLoad = false;
    return;
  }
  $("#card-container").removeClass("hidden");
}

function initGrid() {
  // add more rows if json elements are higher than
  if (inputData.length >= NUM_ROWS * NUM_COLUMS) {
    NUM_EMPTY_ELEMENTS = inputData.length + 30;
  } else {
    NUM_EMPTY_ELEMENTS = NUM_ROWS * NUM_COLUMS - inputData.length;
  }

  // fill elements from data mock/json
  var template = Handlebars.compile(multipleSource);
  var result = template(inputData);
  $(".grid").append(result);

  // fill remaining elements with empty
  template = Handlebars.compile(uniqueSource);
  for (let i = 0; i < NUM_EMPTY_ELEMENTS; i++) {
    result = template(emptyObject);
    $(".grid").append(result);
  }

  // init Isotope
  var $grid = $(".grid").isotope({
    itemSelector: ".element-item",
    layoutMode: "masonry",
    sortBy: "date",
    sortAscending: false,
    getSortData: {
      title: ".title",
      description: ".description",
      date: ".date parseInt",
      category: "[data-category]",
    },
  });

  // bind sort button click
  $("#sorts").on("click", "button", function () {
    var sortByValue = $(this).attr("data-sort-by");
    $grid.isotope({ sortBy: sortByValue });
  });

  // change is-checked class on buttons
  $(".button-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function () {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
    $buttonGroup.on("click", "order-option", function () {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });

  // bind mobile select
  $("#order-option").change(function () {
    var sortByValue = $(this).find("option:selected").attr("value");
    $grid.isotope({ sortBy: sortByValue });
  });

  // Logic to hide or show the card info
  const target = document.querySelector("#card-container");
  document.addEventListener("click", (event) => {
    const withinBoundaries = event.composedPath().includes(target);
    if (
      (!withinBoundaries &&
        event.toElement.className.includes("inner-square") &&
        event.toElement.className.includes("trust")) ||
      event.toElement.className.includes("responsibility") ||
      event.toElement.className.includes("innovation") ||
      event.toElement.className.includes("proactivity")
    ) {
      //$("#card-container").removeClass("hidden");
    } else {
      $("#card-container").addClass("hidden");
    }
  });
}

$(document).ready(function () {
  const JSON_URL_PATH = "http://localhost:3000/behaviours";
  const JSON_URL_PATH_ALT = "./input.json";
  fetch(JSON_URL_PATH)
    .then((response) => response.json())
    .then((obj) => {
      inputData = obj;
      initGrid();
    });
});

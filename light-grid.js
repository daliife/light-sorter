const multipleSource = `
{{#each this}}
  <div class="element-item {{this.type}} clickable" data-category="{{this.type}}" onclick="onSelectedElement(this);">
    <div class="inner-square {{this.type}}"></div>
    <p class="title">{{this.title}}</p>
    <p class="imageUrl">{{this.imageUrl}}</p>
    <p class="url">{{this.url}}</p>
    <p class="date">{{this.date}}</p>
  </div>
{{/each}}
`;
const emptyObject = {
  title: "Z",
  date: 0,
  type: "vacio",
};
const uniqueSource = `
<div class="element-item {{type}}" data-category="{{type}}">
  <div class="inner-square {{type}}"></div>
  <p class="title">{{title}}</p>
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

function onSelectedElement(newCardInfo) {
  $(".card-value").text(jQuery(newCardInfo).data("category"));
  $(".card-title").text(jQuery(newCardInfo).children(".title")[0].innerText);
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
  $("#card-container").removeClass("hidden");
}

function initGrid() {
  // add more rows if json elements are higher than 33 x 10
  if (inputData.length >= 330) {
    NUM_EMPTY_ELEMENTS = inputData.length + 30;
  } else {
    NUM_EMPTY_ELEMENTS = 330 - inputData.length;
  }

  // fill elements from data mock/json
  var template = Handlebars.compile(multipleSource);
  var result = template(inputData);
  $(".grid").append(result);

  // fill remaining elements with empty
  template = Handlebars.compile(uniqueSource);
  for (let i = 0; i < NUM_EMPTY_ELEMENTS; i++) {
    emptyObject.date = 19900100 + i;
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
    isDate = sortByValue == "category";
    $grid.isotope({ sortBy: sortByValue, sortAscending: isDate });
  });

  // bind mobile select
  $("#order-option").change(function () {
    var sortByValue = $(this).find("option:selected").attr("value");
    isDate = sortByValue == "category";
    $grid.isotope({ sortBy: sortByValue, sortAscending: isDate });
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

  // add event listener for image reload
  document.getElementById("card-image").addEventListener("load", showCard);

  // logic to hide or show the card info
  const target = document.querySelector("#card-container");
  document.addEventListener("click", (event) => {
    const withinBoundaries = event.composedPath().includes(target);
    if (!withinBoundaries) {
      $("#card-container").addClass("hidden");
    }
  });
}

$(document).ready(function () {
  const JSON_URL_PATH =
    "https://raw.githubusercontent.com/daliife/light-sorter/develop/input.json";
  fetch(JSON_URL_PATH)
    .then((response) => response.json())
    .then((obj) => {
      inputData = obj;
    })
    .catch((err) => {
      console.log("URL NOT FOUND - LOAD DEFAULT EXAMPLE");
      inputData = [
        {
          title: "Destacado a modo titular del testimonio a mostrar",
          imageUrl: "https://picsum.photos/220/164",
          url: "https://isotope.metafizzy.co/sorting.html",
          date: 20200104,
          type: "confianza",
        },
        {
          title: "Destacado a modo titular del testimonio a mostrar",
          imageUrl: "https://picsum.photos/220/165",
          url: "https://isotope.metafizzy.co/sorting.html",
          date: 20200105,
          type: "innovacion",
        },
        {
          title: "Destacado a modo titular del testimonio a mostrar",
          imageUrl: "https://picsum.photos/220/166",
          url: "https://isotope.metafizzy.co/sorting.html",
          date: 20200106,
          type: "responsabilidad",
        },
        {
          title: "Destacado a modo titular del testimonio a mostrar",
          imageUrl: "https://picsum.photos/220/167",
          url: "https://isotope.metafizzy.co/sorting.html",
          date: 20200107,
          type: "proactividad",
        },
      ];
    })
    .then(() => {
      initGrid();
    });
});

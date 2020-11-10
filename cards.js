var behaviours = {
  behaviours: [
    {
      title: "A title text",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id.",
      imageUrl: "https://picsum.photos/220/161",
      url: "https://isotope.metafizzy.co/sorting.html",
      date: 20202001,
      type: "innovation",
    },
    {
      title: "E title text",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id.",
      imageUrl: "https://picsum.photos/220/162",
      url: "https://isotope.metafizzy.co/sorting.html",
      date: 20202005,
      type: "trust",
    },
    {
      title: "D title text",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id.",
      imageUrl: "https://picsum.photos/220/163",
      url: "https://isotope.metafizzy.co/sorting.html",
      date: 20202002,
      type: "proactivity",
    },
    {
      title: "T title text",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id.",
      imageUrl: "https://picsum.photos/220/164",
      url: "https://isotope.metafizzy.co/sorting.html",
      date: 20202003,
      type: "trust",
    },
    {
      title: "T title text",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id.",
      imageUrl: "https://picsum.photos/220/165",
      url: "https://isotope.metafizzy.co/sorting.html",
      date: 20202003,
      type: "innovation",
    },
    {
      title: "T title text",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id.",
      imageUrl: "https://picsum.photos/220/166",
      url: "https://isotope.metafizzy.co/sorting.html",
      date: 20202003,
      type: "responsibility",
    },
    {
      title: "T title text",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id.",
      imageUrl: "https://picsum.photos/220/167",
      url: "https://isotope.metafizzy.co/sorting.html",
      date: 20202003,
      type: "proactivity",
    },
  ],
};
var emptyObject = {
  title: "Z",
  description: "Empty object",
  imageUrl: "https://via.placeholder.com/220x163",
  url: "https://google.es",
  date: 0,
  type: "empty",
};
var multipleSource = `
{{#each behaviours}}
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
var uniqueSource = `
<div class="element-item {{type}}" data-category="{{type}}" onclick="updateDescription(this); style="pointer-events>
  <div class="inner-square {{type}}"></div>
  <p class="title">{{title}}</p>
  <p class="description">{{description}}</p>
  <p class="imageUrl">{{imageUrl}}</p>
  <p class="url">{{url}}</p>
  <p class="date">{{date}}</p>
</div>
`;

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
  $("#myTarget").removeClass("hidden");
}

$(document).ready(function () {
  const NUM_ROWS = 10;
  const NUM_COLUMS = 33;
  var NUM_EMPTY_ELEMENTS;

  // add more rows if json elements are higher than
  if (behaviours.behaviours.length >= NUM_ROWS * NUM_COLUMS) {
    NUM_EMPTY_ELEMENTS = behaviours.behaviours.length + 30;
  } else {
    NUM_EMPTY_ELEMENTS = NUM_ROWS * NUM_COLUMS - behaviours.behaviours.length;
  }

  // fill elements from data mock/json
  // TODO: Load json from server url (CORS PROBLEM)
  var template = Handlebars.compile(multipleSource);
  var result = template(behaviours);
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
  $("#mobile-sort").change(function () {
    var sortByValue = $(this).find("option:selected").attr("value");
    $grid.isotope({ sortBy: sortByValue });
  });

  // Logic to hide or show the card info
  const target = document.querySelector("#myTarget");
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
      //$("#myTarget").removeClass("hidden");
    } else {
      $("#myTarget").addClass("hidden");
    }
  });
});

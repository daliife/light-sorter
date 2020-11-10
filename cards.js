var behaviours = {
  behaviours: [
    {
      title: "A title text",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id.",
      imageUrl: "https://picsum.photos/220/163",
      url: "https://isotope.metafizzy.co/sorting.html",
      date: 20202001,
      type: "innovation",
    },
    {
      title: "E title text",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id.",
      imageUrl: "https://picsum.photos/220/163",
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
      imageUrl: "https://picsum.photos/220/163",
      url: "https://isotope.metafizzy.co/sorting.html",
      date: 20202003,
      type: "responsibility",
    },
  ],
};

var emptyObject = {
  title: "ZZZZZ",
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

  //TODO: Appear on next on click element
}

$(document).ready(function () {
  const numRows = 30;
  const numColumns = 11;
  var NUM_EL;
  if (behaviours.behaviours.length >= numRows * numColumns) {
    NUM_EL = behaviours.behaviours.length + 30;
  } else {
    NUM_EL = numRows * numColumns - behaviours.behaviours.length;
  }

  // TODO: Load json from server url (CORS PROBLEM)

  // Fill from json
  var template = Handlebars.compile(multipleSource);
  var result = template(behaviours);
  $(".grid").append(result);

  // Fill remaining to empty
  template = Handlebars.compile(uniqueSource);
  for (let i = 0; i < NUM_EL; i++) {
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

  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function () {
      var number = $(this).find(".number").text();
      return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function () {
      var name = $(this).find(".name").text();
      return name.match(/ium$/);
    },
  };

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
      console.log("show");
      $("#myTarget").removeClass("hidden");
    } else {
      console.log("hide");
      $("#myTarget").addClass("hidden");
    }
  });

  // bind filter button click
  $("#filters").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
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
});

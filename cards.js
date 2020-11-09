var behaviours = {
  behaviours: [
    {
      type: "innovation",
      title: "A",
      date: 20202001,
      url: "https://google.com",
      description: "lorem ipsum sit amet...",
    },
    {
      type: "trust",
      title: "E",
      date: 20202005,
      url: "https://google.com",
      description: "lorem ipsum sit amet...",
    },
    {
      type: "innovation",
      title: "D",
      date: 20202002,
      url: "https://google.com",
      description: "lorem ipsum sit amet...",
    },
    {
      type: "responsability",
      title: "T",
      date: 20202003,
      url: "https://google.com",
      description: "lorem ipsum sit amet...",
    },

    {
      type: "proactivity",
      title: "B",
      date: 20202010,
      url: "https://google.com",
      description: "lorem ipsum sit amet...",
    },
    {
      type: "responsability",
      title: "G",
      date: 20202020,
      url: "https://google.com",
      description: "lorem ipsum sit amet...",
    },
  ],
};

var emptyObject = {
  type: "empty",
  title: "Empty",
  date: null,
  url: "https://google.com",
  description: "Empty description...",
};

var multipleSource = `
{{#each behaviours}}
  <div class="element-item {{this.type}}" data-category="{{this.type}}" onclick="updateDescription(this);">
    <div class="inner-square {{this.type}}"></div>
    <p class="title">{{this.title}}</p>
    <p class="date">{{this.date}}</p>
    <p class="url">{{this.url}}</p>
    <p class="description">{{this.description}}</p>
  </div>
{{/each}}
`;

var uniqueSource = `
<div class="element-item {{type}}" data-category="{{type}}" onclick="updateDescription(this);">
  <div class="inner-square {{type}}"></div>
  <p class="title">{{title}}</p>
  <p class="description">{{description}}</p>
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
}

$(document).ready(function () {
  const numRows = 30;
  const numColumns = 11;
  const NUM_EL = numRows * numColumns - behaviours.behaviours.length;

  // TODO: Load json from server url (CORS PROBLEM)
  // $.ajax("input.json").done(function(cast){
  //   console.log('finish', cast);
  // });
  // fetch('data.json')
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data);
  // });

  // Fill from json
  var template = Handlebars.compile(multipleSource);
  var result = template(behaviours);
  $(".demo-grid").append(result);

  for (let i = 0; i < 10; i++) {
    $(".demo-grid").append(result);
  }
  // Fill remaining to empty
  template = Handlebars.compile(uniqueSource);
  for (let i = 0; i < NUM_EL; i++) {
    result = template(emptyObject);
    $(".demo-grid").append(result);
  }

  // init Isotope
  var $grid = $(".demo-grid").isotope({
    itemSelector: ".element-item",
    layoutMode: "masonry",
    sortBy: "random",
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

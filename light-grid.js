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
  var isMobile = false;
  // device detection
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    isMobile = true;
  }
  if (!isMobile) {
    const heightGrid = parseInt($(".grid").css("height").slice(0, -2));
    const widthGrid = parseInt($(".grid").css("width").slice(0, -2));
    const heightCard = parseInt(
      $(".card-container").css("height").slice(0, -2)
    );
    const widthCard = parseInt($(".card-container").css("width").slice(0, -2));
    const margin = 8; // in px
    const elementSize = 32; //in px
    const marginY = margin / 2; // in px
    const yPos = parseInt(jQuery(newCardInfo).css("top").slice(0, -2));
    const xPos = parseInt(jQuery(newCardInfo).css("left").slice(0, -2));
    var newY;
    if (yPos + heightCard <= heightGrid) {
      newY = yPos + marginY + "px";
    } else {
      newY = yPos - margin - marginY - heightCard + "px";
      if (yPos + heightCard > heightGrid) newY = yPos + marginY + "px";
    }
    $(".card-container").css("top", newY);
    var newX;
    if (xPos + widthCard <= widthGrid) {
      newX = xPos + elementSize + margin + "px";
    } else {
      newX = xPos - elementSize * 2 + marginY - widthCard + "px";
    }
    $(".card-container").css("left", newX);
  }

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
  showCard();
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
  for (let i = 0; i < 1; i++) {
    $(".grid").append(result);
  }
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
    sortBy: "random",
    sortAscending: false,
    getSortData: {
      title: ".title",
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

var behaviours = {
  "behaviours": [
    {
      "type": "innovation",
      "title": "Title",
      "date": 20202001,
      "url": "https://google.com",
      "description": "lorem ipsum sit amet..."
    },
    {
      "type": "trust",
      "title": "Title",
      "date": 20202005,
      "url": "https://google.com",
      "description": "lorem ipsum sit amet..."
    },
    {
      "type": "innovation",
      "title": "Title",
      "date": 20202002,
      "url": "https://google.com",
      "description": "lorem ipsum sit amet..."
    },
    {
      "type": "responsability",
      "title": "Title",
      "date": 20202003,
      "url": "https://google.com",
      "description": "lorem ipsum sit amet..."
    },

    {
      "type": "proactivity",
      "title": "Title",
      "date": 20202010,
      "url": "https://google.com",
      "description": "lorem ipsum sit amet..."
    },
    {
      "type": "responsability",
      "title": "Title",
      "date": 20202020,
      "url": "https://google.com",
      "description": "lorem ipsum sit amet..."
    },
  ]
};

var emptyObject = 
{
  "type": "empty",
  "title": "Title",
  "date": 20202020,
  "url": "https://google.com",
  "description": "lorem ipsum sit amet..."
};

var multipleSource = `
{{#each behaviours}}
  <a href="{{this.url}}" target="_blank"">
    <div class="element-item {{this.type}}" data-category="{{this.type}}">
      <div class="inner-square {{this.type}}"></div>
      <p class="name">{{this.date}}</p>
      <p class="value">{{this.date}}</p>
      <p class="date">{{this.date}}</p>
      <p class="weight">2{{this.date}}</p>
    </div>
  </a>
{{/each}}
`

var uniqueSource = `
<a href="{{url}}" target="_blank"">
  <div class="element-item {{type}}" data-category="{{type}}">
    <div class="inner-square {{type}}"></div>
    <p class="name">{{date}}</p>
    <p class="value">{{date}}</p>
    <p class="date">{{date}}</p>
    <p class="weight">2{{date}}</p>
  </div>
</a>
`

$(document).ready(function(){

  const numRows = 30;
  const numColumns = 11;
  const NUM_EL = numRows * numColumns - behaviours.behaviours.length;
  
  $.ajax("input.json").done(function(cast){
    console.log(cast);
  });

  // Fill from json
  var template = Handlebars.compile(multipleSource);
  var result = template(behaviours);
  $('.demo-grid').append(result);
  
  // Fill remaining to empty
  template = Handlebars.compile(uniqueSource);
  for(let i = 0; i < NUM_EL; i++){
    result = template(emptyObject);
    $('.demo-grid').append(result);
  }
  
  
  // init Isotope
  var $grid = $('.demo-grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    getSortData: {
      name: '.name',
      value: '.value',
      date: '.date parseInt',
      category: '[data-category]',
      weight: function( itemElem ) {
        var weight = $( itemElem ).find('.weight').text();
        return parseFloat( weight.replace( /[\(\)]/g, '') );
      }
    }
  });
  
  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };
  
  // bind filter button click
  $('#filters').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $grid.isotope({ filter: filterValue });
  });
  
  // bind sort button click
  $('#sorts').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $grid.isotope({ sortBy: sortByValue });
  });
  
  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });


})

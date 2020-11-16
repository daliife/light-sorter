# Light Sorter

## Description

Small project of element sorting and selection for the client Endesa. It consists of an array of bulbs/lights with comments and values that users will have placed using a form.

You can found it [here](https://daliife.github.io/light-sorter/).

## Used libraries

- [Jquery](https://jquery.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Isotope](https://isotope.metafizzy.co/)

## JSON Data Structure

The variable **JSON_URL_PATH** will be the url that we will be fetching to retrieve the json info and load it to the handlebars and isotope libraries. You will find it in the **light-grid.js, line 166**.

Here we can see an example of that json structure:

```json
[
  {
    "value": "Innovación",
    "title": "Destacado a modo titular del testimonio a mostrar",
    "imageUrl": "https://picsum.photos/220/161",
    "url": "https://isotope.metafizzy.co/sorting.html",
    "date": 20200101,
    "type": "innovacion"
  },
  {
    "value": "Confianza",
    "title": "Destacado a modo titular del testimonio a mostrar",
    "imageUrl": "https://picsum.photos/220/162",
    "url": "https://isotope.metafizzy.co/sorting.html",
    "date": 20200102,
    "type": "confianza"
  },
  {
    "value": "Proactividad",
    "title": "Destacado a modo titular del testimonio a mostrar",
    "imageUrl": "https://picsum.photos/220/163",
    "url": "https://isotope.metafizzy.co/sorting.html",
    "date": 20200103,
    "type": "proactividad"
  },
  {
    "value": "Confianza",
    "title": "Destacado a modo titular del testimonio a mostrar",
    "imageUrl": "https://picsum.photos/220/164",
    "url": "https://isotope.metafizzy.co/sorting.html",
    "date": 20200104,
    "type": "confianza"
  },
  {
    "value": "Innovación",
    "title": "Destacado a modo titular del testimonio a mostrar",
    "imageUrl": "https://picsum.photos/220/165",
    "url": "https://isotope.metafizzy.co/sorting.html",
    "date": 20200105,
    "type": "innovacion"
  },
  {
    "value": "Responsabilidad",
    "title": "Destacado a modo titular del testimonio a mostrar",
    "imageUrl": "https://picsum.photos/220/166",
    "url": "https://isotope.metafizzy.co/sorting.html",
    "date": 20200106,
    "type": "responsabilidad"
  },
  {
    "value": "Proactividad",
    "title": "Destacado a modo titular del testimonio a mostrar",
    "imageUrl": "https://picsum.photos/220/167",
    "url": "https://isotope.metafizzy.co/sorting.html",
    "date": 20200107,
    "type": "proactividad"
  }
]
```

## Screenshots

### Desktop Version

![Desktop Version](https://imgur.com/OnphlCH.png)

### Mobile Version

![Mobile Version](https://imgur.com/87LeZo6.png)

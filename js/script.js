/*jshint esversion: 6 */


var months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

var body = document.getElementById('news');

var url =
  "https://script.google.com/macros/s/AKfycbwjc7Tzm7xAGKusV4L5vqArR2LXIfBQnNjv3ZX9MQEK5OCRSQc/exec";

var request = new XMLHttpRequest();
request.open("GET", url, true);

request.onload = function() {
  var data = JSON.parse(this.response);
  console.log("got the data!");

  for (var i = 0; i < Object.keys(data).length; i++) {

    const monthContainer = document.createElement('section');
    monthContainer.setAttribute('class', 'month');
    monthContainer.setAttribute('id', months[i]);

    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    console.log(months[i]);
    const monthName = document.createElement('h2');
    monthName.setAttribute('class', 'month-name');
    monthName.innerText = capitalize(months[i]);

    for (var j = 0; j < Object.keys(data[months[i]]).length; j++) {

      const anchor = document.createElement('a');
      anchor.setAttribute('href', data[months[i]][j].newsLink);
      anchor.setAttribute('class', 'noSelect');

      const card = document.createElement('div');
      card.setAttribute('class', 'card-container');

      // const image = document.createElement('div');
      // image.setAttribute('style', 'background-image: url(' + data[months[i]][j].imageLink + ')');
      const image = document.createElement('img');
      if (data[months[i]][j].imageLink) {
        image.setAttribute('src', data[months[i]][j].imageLink);
      }
      image.setAttribute('loading', 'lazy');
      image.setAttribute('class', 'image');

      // console.log(data[months[i]][j].imageLink);

      const headLineContainer = document.createElement('div');
      headLineContainer.setAttribute('class', 'headline-container');

      const headLine = document.createElement('p');
      headLine.setAttribute('class', 'headline');
      headLine.innerText = data[months[i]][j].event;

      headLineContainer.appendChild(headLine);

      const timing = document.createElement('p');
      timing.setAttribute('class', 'timing');
      timing.innerText = capitalize(months[i]) + " " + data[months[i]][j].date;
      headLineContainer.appendChild(timing);

      // console.log("date: " + capitalize(months[i]) + " " + data[months[i]][j].date);

      card.appendChild(image);
      card.appendChild(headLineContainer);

      anchor.appendChild(card);

      container.appendChild(anchor);
    }

    monthContainer.appendChild(monthName);
    monthContainer.appendChild(container);

    body.appendChild(monthContainer);

  }
};

request.send();

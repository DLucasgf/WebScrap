var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


app.get('/scrap', function(req, res) {
  //All the web scraping magic will happen here

  //url = 'http://www.imdb.com/title/tt1229340/';
  url = 'http://www.scielo.br/scielo.php?script=sci_arttext&pid=S1415-98482016000200281&lang=pt';
  var nameTest = '';

  request(url, function(error, response, html) {
    console.log('inicio');
    if(!error) {
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : "" };

      //$('.title_wrapper').filter(function() {
      $('.title').filter(function() {
        var data = $(this);

        //title = data.children().first().text().trim();
        title = data.text().trim();
        console.log('log: ' + title);

        //release = data.children().last().children().last().text().trim();

        json.title = title;
        //json.title = 'lol';
        nameTest = json.title;
        //json.release = release;
        json.release = 'release';
      })
/*
      $('.ratingValue').filter(function() {
        var data = $(this);

        rating = data.text().trim();

        json.rating = rating;
      })*/
      json.rating = 'rating';
    }
    else {
      console.log('else');
    }

    fs.writeFile('output_' + nameTest + '.json', JSON.stringify(json, null, 4), function(err) {
      console.log('Arquivo salvo');
    })

    res.send('Name test: ' + nameTest);

  })
})


app.get('/gate', function(req, res) {
  //All the web scraping magic will happen here

  //url = 'http://www.imdb.com/title/tt1229340/';
  url = 'https://www.researchgate.net/profile/Jose_Frias';
  var nameTest = '';

  request(url, function(error, response, html) {
    console.log('Research Gate');
    if(!error) {
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : "" };

      //$('.title_wrapper').filter(function() {
      $('.ga-profile-header-name').filter(function() {
        var data = $(this);

        //title = data.children().first().text().trim();
        title = data.text().trim();
        console.log('log: ' + title);

        //release = data.children().last().children().last().text().trim();

        json.title = title;
        //json.title = 'lol';
        nameTest = json.title;
        //json.release = release;
        json.release = 'release';
      })
/*
      $('.ratingValue').filter(function() {
        var data = $(this);

        rating = data.text().trim();

        json.rating = rating;
      })*/
      json.rating = 'rating';
    }
    else {
      console.log('else');
    }

    fs.writeFile('out/output_r3_' + nameTest + '.json', JSON.stringify(json, null, 4), function(err) {
      console.log('Arquivo salvo');
    })

    res.send('Name test: ' + nameTest);

  })
})



app.get('/research', function(req, res) {
  //All the web scraping magic will happen here
  url = 'https://www.researchgate.net/search/authors?q=bruno';
  var nameTest = '';

  request(url, function(error, response, html) {
    console.log('inicio');
    if(!error) {
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { profileUrl : "", image : "", name : "", institution : "", rating : "" };

      //$('.title_wrapper').filter(function() {
      $('.account-container').filter(function( index, element ) {
        var data = $(this);

        //title = data.children().first().text().trim();
        title = data.text().trim();
        base = element.children[0].children[0];

        profileUrl = element.children[0].children[0].next.children[0].attribs['href'];
        image = element.children[0].children[0].children[0].children[0].attribs.src;
        name = element.children[0].children[0].next.children[0].children[0].data;

        console.log('log: ' + title);
        console.log('objeto');
        console.log(element);

        console.log('base');
        console.log(base);

        console.log('name *****************************************************************************************');
        console.log(image);




        //release = data.children().last().children().last().text().trim();

        json.profileUrl = "t " + profileUrl;
        json.image = image;
        json.name = name;
        //json.title = 'lol';
        nameTest = name;
        json.institution = "insti";
        json.rating = "rating";
        //json.release = release;
        //json.release = 'release';
      })

      fs.writeFile('research/output_' + nameTest + '.json', JSON.stringify(json, null, 4), function(err) {
        console.log('Arquivo salvo');
      })

      res.send('Name test: ' + nameTest);

    }
    else {
      console.log('else');
    }


  })
})





app.listen('8081');

console.log('Mágica acontece na porta 8081');
console.log('Research Gate');

exports = module.exports = app;

const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromAPI => {
      res.render('beers', { beersFromAPI });
      // console.log('This is the list of beers', beersFromAPI);
    })
    .catch(error => {
      console.log('I could not get the beers', error);
    });
});
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromAPI => {
      res.render('random-beer', { beersFromAPI });
      console.log('Getting a response', beersFromAPI);
    })
    .catch(error => {
      console.log('I could not gt a random beer', error);
    });
});

app.get('/beers/:id', (req, res) => {
  const id = req.params.id;
  punkAPI
    .getBeer(id)
    .then(beer => {
      console.log(beer);
      res.render('beer', { beer });
    })
    .catch(error => {
      console.log(' Could not open that unique beer page', error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

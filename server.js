var express = require('express'),
    _ = require('lodash'),
    app = express();

var data = {
    products: [
        { id: "1", name: "Long Dress", colour: "Red", season: "SS15", designer: "Alice" },
        { id: "2", name: "Medium-Length Dress", colour: "Red", season: "SS15", designer: "Alice" },
        { id: "3", name: "Short Dress", colour: "Blue", season: "SS15", designer: "Alice" },
        { id: "4", name: "Shiny Dress", colour: "Black", season: "SS15", designer: "Bob" },
        { id: "5", name: "Normal Sunglasses", colour: "Black", season: "SS14", designer: "Charlie" },
        { id: "6", name: "Aviator Sunglasses", colour: "Black", season: "SS14", designer: "Charlie" },
        { id: "7", name: "Scarf", colour: "Black", season: "AW14", designer: "Bob" },
        { id: "8", name: "Another Scarf", colour: "Brown", season: "AW14", designer: "Alice" }
    ]
}

app.get('/', function(req, res){
    res.json({ paths: [
        {
            name: "listings by season",
            template: "/listings/season/:seasonName",
            example: "/listings/season/SS15",
            note: "Seasons available are " + _.uniq(_.pluck(data.products, 'season'))
        },
        {
            name: "product by id",
            template: "/products/:id",
            example: "/products/1"
        }
    ]})
});

app.get('/listings/season/:season', function(req, res){    
    var products = _.filter(data.products, function(x){
        return x.season && x.season.toLowerCase() == req.params.season.toLowerCase();
    });
    var response = _.pluck(products, 'id');

    res.set('Cache-Control', 'max-age=60');
    return res.json({ total: response.length, data: response });
});

app.get('/products/:id', function(req, res){
    var response = _.find(data.products, { id: req.params.id });

    res.set('Cache-Control', 'max-age=10');
    return res.json(response);
});

app.listen(3000);


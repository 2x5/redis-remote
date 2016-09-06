var express = require('express');
var router = express.Router();

var faker = require("faker");
var redis = require("redis");

var options = {
    host: '67.205.152.156'
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    client = redis.createClient(options);

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    locals = {};
    locals.people = [];
    for (var i = 0; i < 10; i++) {
       var person = {username: faker.internet.userName(), name: faker.name.findName()};
       locals.people.push(person);
       client.set(person.username, person.name);
    }
    client.info('keyspace', redis.print);
    client.quit();

    res.json(locals);
});

module.exports = router;

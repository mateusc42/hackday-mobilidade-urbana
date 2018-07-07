var amqp = require('amqplib/callback_api');
var request = require("request");

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
        console.log("sending post request");
        request.post("http://localhost:4000/data", {form: {key: msg.content.toString()}});
    }, {noAck: true});
  });
});
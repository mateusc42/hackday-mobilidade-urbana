var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(err, conn) {
    conn.createChannel(function(err, ch) {

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('normalizado.csv')
        });
        
        //Nomear fila e conectar        
        var q = 'hello';
        ch.assertQueue(q, {durable: false});

        for (i = 1; i <= 1; i++) {
            n = 3;
            k = 1;
            lineReader.on('line', function (line) {
                if (k == n) {
                    console.log("Send line: " + n + " to queue");                
                    ch.sendToQueue(q, new Buffer(line.toString()));
                    n += 50;
                }
                k += 1;
            });
        }
    });
});
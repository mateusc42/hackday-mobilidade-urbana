var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(err, conn) {
    conn.createChannel(function(err, ch) {

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('data.csv')
        });
        
        //Nomear fila e conectar        
        var q = 'hello';
        ch.assertQueue(q, {durable: false});

        for (i = 1; i <= 1; i++) {
            n = 1;
            k = 1;
            lineReader.on('line', function (line) {
                if (k == n) {
                    console.log("Sent line: " + n + " to queue");                
                    ch.sendToQueue(q, new Buffer(n.toString()));
                    n += 50;
                }
                k += 1;
                setTimeout(function() { conn.close(); process.exit(0) }, 1000);            
            });
        }
    });
});
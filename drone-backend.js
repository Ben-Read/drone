var Cylon = require('cylon');
var ws = require('nodejs-websocket');
var bot;

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",
        connection: "ardrone"
    })
    .on("ready", fly);
    
// Fly the bot

function fly(robot) {
    bot = robot;
    bot.drone.disableEmergency();
    bot.nav.on("navdata", function(data) {
        bot.drone.config('general:navdata_demo', 'TRUE');
        console.log(data);
    });
    bot.drone.ftrim();
    bot.drone.takeoff();
    after(10*1000, function() {
        bot.drone.front(0.1);
        after(2*1000, function() {
            bot.drone.front(0);
            after(1*1000, function(){
                bot.drone.right(0.1);
                after(2*1000, function() {
                    bot.drone.right(0);
                    after(1*1000, function() {
                        bot.drone.front(0.1);
                        after(2*1000, function() {
                            bot.drone.front(0);
                            after(1*1000, function() {
                                bot.drone.left(0.1);
                                after(2*1000, function() {
                                    bot.drone.left(0);
                                })
                            })
                        })
                    })
                })
            })
        })

    });
    after(25*1000, function() {
        bot.drone.land();
    });
    after(30*1000, function() {
        bot.drone.stop();
    });
}

/*var server = ws
    .createServer(receiveConnection)
    .listen(8001);

function receiveConnection(connection) {
    console.log("New connection");
    connection.on("close", function(message) {
        console.log("Connection closed", message);
    });
    connection.on("error", function(error) {
        console.log("Connection error", error);
    });
}*/




Cylon.start();
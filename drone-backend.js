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
        bot.drone.front(0.25);
        after(2*1000, function() {
            bot.drone.front(0);
            after(1*1000, function(){
                bot.drone.left(0.25);
                after(2*1000, function() {
                    bot.drone.left(0);
                    after(1*1000, function() {
                        bot.drone.back(0.25);
                        after(2*1000, function() {
                            bot.drone.back(0);
                            after(1*1000, function() {
                                bot.drone.right(0.25);
                                after(2*1000, function() {
                                    bot.drone.right(0);
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


Cylon.start();
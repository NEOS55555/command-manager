/**
 * Created by nuintun on 2015/12/2.
 */

'use strict';

importScripts('../../terminal/index.js');

var xterm;

onconnect = function (event){
  var port = event.ports[0];

  port.onmessage = function (event){
    var message = event.data;

    function send(name, xterm){
      var data = {
        name: name,
        screen: xterm.toString('html')
      };

      port.postMessage(data);
    }

    switch (message.action) {
      case 'open':
        if (!xterm) {
          xterm = new AnsiTerminal(120, 60, 0);
          xterm.newline_mode = true;
          xterm.beep = function (){
            port.postMessage({
              exec: 'beep',
              name: message.name
            });
          };
        }

        send(message.name, xterm);
        break;
      case 'close':
        delete xterm.reset();
        break;
      case 'write':
        xterm.write(message.data);
        send(message.name, xterm);
        break;
    }
  };

  //function send(name, xterm){
  //  postMessage({
  //    name: name,
  //    screen: xterm.toString('html')
  //  });
  //}
  //
  //switch (message.action) {
  //  case 'open':
  //    xterm = RUNTIMECACHE[message.name];
  //
  //    if (!xterm) {
  //      xterm = new AnsiTerminal(120, 60, 0);
  //      xterm.newline_mode = true;
  //      SCREENCACHE[message.name] = '';
  //      RUNTIMECACHE[message.name] = xterm;
  //    }
  //
  //    ACTIVE = message.name;
  //
  //    if (SCREENCACHE[message.name]) {
  //      xterm.write(SCREENCACHE[message.name]);
  //      SCREENCACHE[message.name] = '';
  //    }
  //
  //    send(message.name, xterm);
  //    break;
  //  case 'close':
  //    delete RUNTIMECACHE[message.name];
  //    break;
  //  case 'write':
  //    xterm = RUNTIMECACHE[message.name];
  //
  //    if (ACTIVE === message.name) {
  //      xterm.write(message.data);
  //      send(message.name, xterm);
  //    } else {
  //      SCREENCACHE[message.name] += message.data;
  //    }
  //    break;
  //}
};

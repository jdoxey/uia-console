var UIAConsole = {

  breakpoint: function () {
    UIALogger.logMessage("[UIAConsole] Hit breakpoint, opening browser...");
    UIATarget.localTarget().host().performTaskWithPathArgumentsTimeout('/bin/sh',
        [ '-c', 'open http://localhost:4567/console.html &' ], 1);
    while (true) {
      var result = UIATarget.localTarget().host().performTaskWithPathArgumentsTimeout('/usr/bin/env',
          [ 'curl', 'http://localhost:4567/next-command' ], 5);
      if (result.stdout == "continue") {
        UIALogger.logMessage("[UIAConsole] ...continuing execution");
        break;
      }
      if (result.stdout != "") {
        UIALogger.logMessage("[UIAConsole] Running: " + result.stdout);
        try {
          eval(result.stdout);
        }
        catch (e) {
          UIALogger.logMessage("[UIAConsole] " + e);
        }
      }
      UIATarget.localTarget().delay(1);
    }
  },

  startServer: function () {
    UIALogger.logMessage("[UIAConsole] Starting server");
    var envCommand = UIATarget.localTarget().host().performTaskWithPathArgumentsTimeout("/usr/bin/env", [], 10);
    var pwd = envCommand.stdout.match(/^PWD=(.*)$/m)[1];
    var findCommand = UIATarget.localTarget().host().performTaskWithPathArgumentsTimeout("/usr/bin/find", [ pwd, "-name", "start_server.rb" ], 10);
    var serverScript = findCommand.stdout;
    UIATarget.localTarget().host().performTaskWithPathArgumentsTimeout("/bin/launchctl",
        [ 'submit', '-l', 'uiaconsole-server', '-o', '/tmp/uiaconsole-server.out', '-e', '/tmp/uiaconsole-server.err', '--', 'bash', '-c', serverScript ], 30);
  },

  stopServer: function () {
      UIATarget.localTarget().host().performTaskWithPathArgumentsTimeout("/bin/launchctl", [ 'remove', 'uiaconsole-server' ], 30);
  }

};

// Start server
UIAConsole.startServer();

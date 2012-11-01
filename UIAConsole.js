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
  }

};

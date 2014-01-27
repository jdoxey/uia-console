var UIAConsole = {
    breakpoint: function () {
        UIALogger.logMessage("[UIAConsole] Hit breakpoint, opening browser...");
        this._openBrowser();
        for (var command = this._readCommand(); command != "continue"; command = this._readCommand()) {
            if (command !== null) {
                eval(command);
            }
        }
        UIALogger.logMessage("[UIAConsole] ...continuing execution");
    },
    _openBrowser: function () {
        var envCommand = UIATarget.localTarget().host().performTaskWithPathArgumentsTimeout("/usr/bin/env", [], 10);
        var pwd = envCommand.stdout.match(/^PWD=(.*)$/m)[1];
        var findCommand = UIATarget.localTarget().host().performTaskWithPathArgumentsTimeout("/usr/bin/find", [ pwd, "-name", "uia-console.html" ], 10);
        UIATarget.localTarget().host().performTaskWithPathArgumentsTimeout('/bin/sh', [ '-c', "open file://" + findCommand.stdout + " &" ], 10);
    },
    _readCommand: function () {
        var okResponse = '"HTTP/1.1 200 OK\\nContent-Length: 2\\nConnection: close\\n\\nOK"';
        var ncShellCommand = this._shellCommand('echo ' + okResponse + ' | nc -l 4567', 10);
        if (ncShellCommand.stdout === "") {
            return null;
        }
        var command = ncShellCommand.stdout.match(/\r\n\r\n([^$]*)$/m)[1];
        return command;
    },
    _shellCommand: function (command, timeout) {
        return UIATarget.localTarget().host().performTaskWithPathArgumentsTimeout('/bin/sh', [ '-c', command ], timeout);
    }
};


UIAConsole
===========

Simple tool to add a real-time console to Apple's UI Automation scripting


Quickstart
----------
1. Clone this repo into your project directory: `git clone git://github.com/jdoxey/uia-console.git`
2. Create a UIAutomation script which imports UIAConsole: `#import "uia-console/UIAConsole.js"`
3. Where you want your script to break, add: `UIAConsole.breakpoint();`
4. Start the server: `uia-console/start_server.rb` (This requires Ruby and Sinatra to be installed)
5. Run your script from Instruments (`command-i`) and wait for the browser to pop up.
6. Submit script you'd normally see in a UIAutomation script (check for output in Instruments)
7. Hit "Continue" to keep running your script

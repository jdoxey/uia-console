UIAConsole
===========

Simple tool to add a real-time console to Apple's UI Automation scripting


Quickstart
----------
1. Clone this repo into your project directory: `git clone git://github.com/jdoxey/uia-console.git`
1. Create a UIAutomation script which imports UIAConsole: `#import "uia-console/UIAConsole.js"`
1. Where you want your script to break, add: `UIAConsole.breakpoint();`
1. Run your script from Instruments (`command-i`) and wait for the browser to pop up.
1. Submit script you'd normally see in a UIAutomation script (check for output in the Instruments console)
1. Hit "Continue" to run the rest of your script


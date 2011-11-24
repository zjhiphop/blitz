@echo off
set p=../../Lib/csslint
java -jar %p%/js.jar %p%/csslint-rhino.js %*
java -jar %p%/js.jar %p%/csslint-rhino.js --format=text ../mystery/*.css >mystery_debug.txt
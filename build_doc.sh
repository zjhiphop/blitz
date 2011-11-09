::run.bat
::jsdoc_toolkit path
set jsdoc=%cd%\Lib\jsdoc_toolkit-2.4.0\
::js filepath
set jspath=%cd%\
echo start...

java -jar %jsdoc%jsrun.jar %jsdoc%app\run.js -a -e=GBK -t=%jsdoc%templates\jsdoc -d=%jspath%docs %jspath%

echo finished.
pause
@ECHO OFF
ECHO Building prod artifacts...
ng build --prod --output-path docs --base-href="https://daemon025.github.io/gw-stats/"
ECHO Making fallback 404.html file...
cd docs
xcopy /Y /I index.html 404.html
ECHO Done!
PAUSE
publish a nodejs application steps:
/*
a.Use module.exports to write modules
b.Provide package.json and index.js
c.npm publish (use npm adduser for the first time)
*/
1.package json notion
  
{
    "name": "your node application name",
    "description": "your node application description",
    "homepage": "your node application homepage",
    "version": "your node application version",
    "author": {
        "name": "author name",
        "email": "author mail address",
        "web": "author blog or other address"
    },
    "dependencies": {
        "depandencies name":"version"
        //eg: "jquery": ">=1.4.2"
    },
    "repositories": [
        {
            //eg: 
            //"type": "git",
            //"url": "git@github.com:zjhiphop/blitz.git"
        }
    ]
}

2.index.js notion
	const yourModulerName = require('./yourjsname');
	module.exports = yourModulerName;

3.npm adduser and npm publish

4.use cload servive to test your service
  eg:  use heroku 
  http://devcenter.heroku.com/articles/node-js

reference:https://github.com/isaacs/npm/blob/master/doc/developers.md#readme
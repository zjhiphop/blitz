var read = require('read');
var Seq = require('seq');
/*
 prompt  - What to write to stdout before reading input.
silent  - Don't echo the output as the user types it.
num     - Max number of chars to read from terminal.
delim   - The char that means we're done. Default: "\n"
timeout - Number of ms to wait for user input before giving up.
*/
Seq()
  .seq(function () {
    read({ prompt : 'Username: ' }, this.into('user'));
  })
  .seq(function () {
    read({ prompt : 'Password: ', silent : true }, this.into('pass'));
  })
  .seq(function (pass) {
    console.log(this.vars.user, this.vars.pass);
  });
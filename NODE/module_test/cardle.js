 var cradle = require('cradle');
  var db =  new(cradle.Connection)('http://living-room.couch', 5984, {
      cache: true,
      raw: false
  });

  db.get('vader', function (err, doc) {
      doc.name; // 'Darth Vader'
      assert.equal(doc.force, 'dark');
  });

  db.save('skywalker', {
      force: 'light',
      name: 'Luke Skywalker'
  }, function (err, res) {
      if (err) {
          // Handle error
      } else {
          // Handle success
      }
  });
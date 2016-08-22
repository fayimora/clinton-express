exports.list = function(req, res, next, pgPool) {
  pgPool.connect(function (err, client, done) {
    if(err) return console.error('error fetching client from pool', err);

    var query = client.query('SELECT * FROM customers');
    query.on('row', function (row) {
      console.log('Username is %s', row.username);
    });
  });
  res.send("Done");
}

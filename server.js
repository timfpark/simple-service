const express = require('express'),
      app = express();

let instanceId = Math.floor(Math.random() * 100000);

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send(`Hello from instance id ${instanceId} at ${new Date()}`);
});

app.listen(app.get('port'), function() {
  console.log("App is running at localhost:" + app.get('port'))
});
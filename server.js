const express = require('express'),
    app = express(),
    initTracer = require('jaeger-client').initTracer,
    instanceId = Math.floor(Math.random() * 100000),
    promClient = require('prom-client');

var tracer = initTracer(
    {
        serviceName: 'simple-service'
    },
    {}
);

// report back request spans by wrapping each request
app.use((req, res, next) => {
    const span = tracer.startSpan(req.path);
    req.on('end', function() {
        span.finish();
    });
    next();
});

app.set('port', process.env.PORT || 5000);

app.get('/', function(request, response) {
    let luckyNumber = Math.ceil(Math.random() * 100);
    response.send(
        `Your lucky number is ${luckyNumber} (instance id ${instanceId} at ${new Date()})`
    );
});

app.get('/metrics', (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(promClient.register.metrics());
});

app.listen(app.get('port'), function() {
    console.log('server is running on port ' + app.get('port'));
});

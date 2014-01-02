curl(cfg, ['when']).then(function(when) {

    //
    // This is an example of how to to simple, asynchronous map-reduce using when.js
    // The inputs, the map step, the reduce step, and even the initial value can
    // all be promises (or values, or a mix, that's all good).
    //

    var urls, count, expected;

    // Feel free to set count to something else, but big numbers might be really slow
    // due to jsfiddle overhead + setTimeout (used to simulate asynchrony)
    count = 10;

    // We'll precompute an expected result
    expected = 0;

    // Setup some jsfiddle echo urls that we'll fetch in the map step
    urls = [];
    for (var i = 0; i < count; ++i) {
        expected += i;
        urls.push('/echo/json/');
    }

    expected = 2 * expected;

    // Simulate a lengthy asynchronous computation, i.e. sending data to
    // remote big iron

    function lengthyAsynchronousComputation(accumulated, input, i) {
        var d = when.defer();
        setTimeout(function() {
            d.resolve(accumulated + (i * input.length));
        }, 0);

        return d.promise;
    }

    // Mapper function to map a url to its content.
    // Use $.ajax to fetch url content and return a non-Promises/A
    // $.Deferred which when.js will assimilate

    function mapUrlToContext(url) {
        return $.ajax({
            url: url,
            dataType: 'html'
        });
    }

    // Simple, composeable, asynchronous map-reduce with when.reduce
    // Inputs are urls (jsfiddle JSON echo urls)
    // Output will be a single number
    when.reduce(
    // Use when.map to map urls to their content asynchronously
    // Note that when.js assimilates the $.Deferreds returned
    // by $.ajax to make them Promises/A compliant.
    when.map(urls, mapUrlToContext),
    // Then perform some lengthy reduce computation on the
    // urls as they become available from the map step
    lengthyAsynchronousComputation,
    // initial reduce value (this can also be a promise if you want)
    0).then(function(result) {
        // when.reduce is done, result is a number, show it.
        document.getElementById('output').innerHTML = result;
        document.body.className = 'done';
    });

    // You'll see this first, since the map-reduce happens asynchronously
    document.getElementById('info').innerHTML = 'The result will be ' + expected + ', i.e. 2*sum(0..' + (count - 1) + ') === ' + expected;

});
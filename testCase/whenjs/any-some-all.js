curl(cfg, ['when']).then(function(when) {

    var SlowProvider = function(id, minDelay, maxDelay) {
        this.id = id;
        this.delay = Math.floor(Math.random() * maxDelay) + minDelay;
        this.deferred = null; // Will be set for slow operations...
    };

    SlowProvider.prototype._slowness = function() {
        // This thing simulates the end of our slow code...
        console.log(this.id + ' ready in ' + this.delay + ' ms.');
        this.deferred.resolve(this.id);
    };

    SlowProvider.prototype.doSlowStuff = function() {
        this.deferred = when.defer(); // Get the defer!
        window.setTimeout(this._slowness.bind(this), this.delay);
        return this.deferred.promise;
    };

    // My innocent code!
    var ProviderHandler = function(numProviders, minDelay, maxDelay) {
        this.promises = [];
        this.numProviders = numProviders;
        this.minDelay = minDelay;
        this.maxDelay = maxDelay;
    };

    ProviderHandler.prototype._createPromises = function() {
        var promises = [];
        for (var i = 0; i < this.numProviders; i++) {
            var slowProvider = new SlowProvider(i, this.minDelay, this.maxDelay);
            promises.push(slowProvider.doSlowStuff());
        }
        return promises;
    };

    ProviderHandler.prototype.testPromises = function() {
        var promises = this._createPromises(); // Enqueue a bunch of async operations
        when.any(promises).then(function(id) {
            console.log('First request done!', id);
        });
        when.some(promises, 7).then(function(ids) {
            console.log('First 7 promises done!', ids);
        });
        when.all(promises).then(function() {
            console.log('All done!!');
        });
    };

   // var myApp = new ProviderHandler(100, 500, 2000);
   // myApp.testPromises();


    // Enqueue our first job!
    var slowProvider = new SlowProvider("Stuff ", 1000, 2000);
    var promise = slowProvider.doSlowStuff();
    promise.then(function(id) {
        console.log('Promise resolved for provider:', id);
    });

    // Meanwhile, in England...
    var futureSubscription = function() {
        promise.then(function(id) {
            console.log('I got late to the party, but', id, 'is done');
        });
    };
    window.setTimeout(futureSubscription, 7500);

});
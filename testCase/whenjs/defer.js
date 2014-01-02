curl(cfg, ['when']).then(function(when) {


    function loadImage(src) {
        var deferred = when.defer(),
            img = document.createElement('img');
        img.onload = function() {
            deferred.resolve(img);
        };
        img.onerror = function() {
            deferred.reject(new Error('Image not found: ' + src));
        };
        img.src = src;

        // Return only the promise, so that the caller cannot
        // resolve, reject, or otherwise muck with the original deferred.
        return deferred.promise;
    }

    // example usage:
    loadImage('http://google.com/favicon.ico').then(function gotIt(img) {
        document.body.appendChild(img);
        return img;
    }, function doh(err) {
        document.body.appendChild(document.createTextNode(err));
    }).then(function shout(img) {
        console('see my new ' + img.src + '?');
    });


    function loadImages(srcs) {
        // srcs = array of image src urls

        // Array to hold deferred for each image being loaded
        var deferreds = [];

        // Call loadImage for each src, and push the returned deferred
        // onto the deferreds array
        for (var i = 0, len = srcs.length; i < len; i++) {
            deferreds.push(loadImage(srcs[i]));

            // NOTE: We could push only the promise, but since this array never
            // leaves the loadImages function, it's ok to push the whole
            // deferred.  No one can gain access to them.
            // However, if this array were exposed (e.g. via return value),
            // it would be better to push only the promise.
        }

        // Return a new promise that will resolve only when all the
        // promises in deferreds have resolved.
        // NOTE: when.all returns only a promise, not a deferred, so
        // this is safe to expose to the caller.
        return when.all(deferreds);
    }

    var imageSrcArray = ["1.jpg", "2.jpg"];
    loadImages(imageSrcArray).then(function gotEm(imageArray) {
        doFancyStuffWithImages(imageArray);
        return imageArray.length;
    }, function doh(err) {
        handleError(err);
    }).then(function shout(count) {
        // This will happen after gotEm() and count is the value
        // returned by gotEm()
        alert('see my new ' + count + ' images?');
    });

    when.any(loadImages(imageSrcArray), function(firstAvailableImage) {
        // In when.js >= 0.10.0
        //   firstAvailableImage will be the actual Image that caused
        //   when.any() to complete
        imageRotator.showImage(firstAvailableImage);

        // NOTE: In when.js <= 0.9.4:
        //   firstAvailableImage will be an array with 1 Image in it 
        // imageRotator.showImage(firstAvailableImage[0]);      
    });


    // Load a bunch of images that we will display in an image rotator.
    // Only care about the first 3, so we can show them to the user ASAP.
    // Again, this will also pre-load and allow the browser to cache the
    // remaining images.
    when.some(loadImages(imageSrcArray), 3, function(initialImageSet) {
        // initialImageSet will be an array of the first 3 (or 
        // imageSrcArray.length, if < 3) Images that loaded
        imageRotator.showImages(initialImageSet);

    });

    when.map(imageSrcArray, loadImage).then(function gotEm(imageArray) {
        doFancyStuffWithImages(imageArray);
        return imageArray.length;
    }, function doh(err) {
        handleError(err);
    }).then(function shout(count) {
        // This will happen after gotEm() and count is the value
        // returned by gotEm()
        alert('see my new ' + count + ' images?');
    });



});
var MovieAppController = {
    init : function(spec) {
        // default config
        this.config = {
            connect : true
        };

        // extend our default config with passed in object attributes
        _.extend(this.config, spec);

        this.model = new MovieAppModel({
            nick : this.config.nick
        });
        this.view = new MovieAppView({
            model : this.model
        });
        
        var coll=[{
            title : 'jade2',
            format : 'hi'
        }, {
            title : 'jades',
            format : 'his'
        }];
        this.model.movies.add(coll);
        //this.model.movies.add([this.config.nick]);
        // standalone modules that respond to document events
        //this.sm = new SoundMachine();

        return this;
    },
    // any other functions here should be events handlers that respond to
    // document level events. In my case I was using this to respond to incoming
    // XMPP
    // events. So the logic for knowing what those meant and creating or updating
    // our
    // models and collections lived here.
    handlePubSubUpdate : function() {
    }
};

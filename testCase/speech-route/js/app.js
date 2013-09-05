//Method 3: 
function openwin(url) {
    window.location.href = url;
}

window.onload = function() {
    var router = new SpeechRouter({
        routes: {
            "study plan": "studyplan",
            "wiki": "confluence",
            "bug": "jira",
            "trouble": "asrTroubleShoot",
            "search :engine for *query": "search"
        },
        studyplan: function () {
            openwin("http://socialtest.englishtown.com/spr/index.html");
        },
        asrTroubleShoot: function () {
            openwin("https://confluence.englishtown.com/display/SCHUX/Troubleshooting+ASR");
        },
        confluence: function () {
            openwin("https://confluence.englishtown.com");  
        },
        jira: function () {
            openwin("https://jira.englishtown.com");  
        },
        search: function (engine, query) {
            openwin("http://" + engine + ".com/search?q=" + query);
        }
    });

    router.start();
};
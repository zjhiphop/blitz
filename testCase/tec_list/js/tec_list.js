$(document).ready(function() {
    try {
        var parsed = false;
        YAML.fromURL("data.yml", function(data) {
            var errors = YAML.getErrors();
            if(errors.length !== 0) {
                $.util$.log(errors);
                return;
            }
            if(!data["tec_data"])
                return;
            if(!parsed) {
                parsed = true;
                var options = {
                    item : 'tec-item'
                };
                $.each(data["tec_html"], function(i, v) {
                    $("#tec-item").append(v);
                });
                $.each(data["tec_type"], function(i, v) {
                    $("#sort-by").append(" <span class='sort btn' data-sort='" + v + "'>Sort by " + v + "</span>");
                });
                var teclist = new List("tec-list", options, data["tec_data"]);
                $.each(data["tec_filter"], function(i, v) {
                    $("<li class='btn' id='filter-" + v + "'>Show only " + v + "</li>").appendTo($("#filter")).click(function() {
                        teclist.filter(function(values) {
                            if(values["type"] === v) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                        return false;
                    });
                });
                $("#filter-none").click(function() {
                    teclist.filter(false);
                    return false;
                });
                $("#tec-list .list li").each(function() {
                    $(this).find("img").attr("src", "images/" + $(this).find(".type").text() + ".jpg");
                    $('<div><a href="' + $(this).find(".url").text() + '" target="_blank">view now</a></div>').appendTo($(this));
                });
            }
        });
    }
    catch(e) {

    }
});

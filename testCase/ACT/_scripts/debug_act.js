(function(w, a, u) {
    $("#act_debug").remove();
    if(!window.console) {
        $.getScript("http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js", function() {
            try {
                firebug.init();
                void (firebug);
            }
            catch(e) {
                if(!window.console) {
                    var names = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
                    window.console = {};
                    for(var i = 0; i < names.length; ++i) {
                        window.console[names[i]] = function() {
                        };
                    }
                }
            }
        });
    }
    //@off
	if(!a){
		console.log('act is not exists in current page!');
	}else{
		var list_act="<li class='{$T.type$key} {$T.modes$key}'><span>{$T.act}</span></li>",
        	commbox="<div><p></p></div><ul>{#foreach $T as type}{#foreach $T.type as modes}{#foreach $T.modes as act}"+list_act+"{#/for}{#/for}{#/for}</ul>",
            list="<div><p></p></div><ul>{#foreach $T as record}<li><span>{$T.record}</span></li>{#/for}</ul>",
            act_type=$("<div id='act_type'></div>"),
            act=$("<div id='act_id'></div>"),
            act_mode=$("<div id='act_mode'></div>"),
            act_cont=$("<div class='act_cont'></div>"),
        	sub_t ="<li class='{$T.record.name}'>"+
        			"<a href='{$T.record.href}' style='{$T.record.style}' target='{$T.record.target}'>{$T.record.name} {$T.record.content}</a>"+
        			"</li>";
        			
        act_type.setTemplate(list);
        act_mode.setTemplate(list);
        act.setTemplate(commbox);
	    window.loadCss("http://cns-812:8111/blitz/testCase/ACT/_css/act_test.css");
        $('body').append("<div id='act_debug'></div>");
        $('#act_debug').setTemplate( "<ul>{#foreach $T as record}"+sub_t+"{#/for}</ul>"+
        "<fieldset><legend>Activity</legend><div id='act_check'><input id='change_activity' type='button' value='GO!'/></div></fieldset>"+
        "<fieldset><legend>Console</legend><ul class='act_console_msg'></ul></fieldset>");
		//@on
        var log = function(msg) {
        	if(msg.indexOf("<li")===-1){
        	  msg="<li>"+msg+"</li>";
        	}
            $(".act_console_msg").append(msg);
        }, data = [
	         {
	            name : 'enable_random',
	            href : '',
	            handler : function() {
	               var _text = $(this).text();
	               if(_text==='enable_random'){
	               	$(this).text('disable_random');
	               	ET.School.UI.Common.Const.config.itemRandom=true;
	               	log("enable random logic!");
	               }else{
	               	$(this).text('enable_random');
	               	ET.School.UI.Common.Const.config.itemRandom=false;
	               	log("disable random logic!");
	               }
	            }
	        }
        ], _activity = {
        	'VideoTimeline':{
        		grade:[4327,9760,6719,6721,6722,6723,6724,6725,6937,6938,6939,6940,6941,6942,6943,6944,6726,6728,6729,6730,7078,9765,7146],
        		nongrade:[]
        	},
        	'Grouping':{
        		grade:[2035,2055,2097,2447,2783,2480,3736,3820,3892,4004,4013,3777,3819,3893,3950,],
        		nongrade:[4015,7139,4396,4427,4474,4429,4472,4184,4225,4155,5856,6421,6498,6709,3809,3704,5275,4094,4275,4110,7693,7891]
        	},
        	'MatchingText':{
        		grade:[4129,2107,2974,2093,4896,4017,3827,3968,5278,7623,4406,3360,3379],
        		nongrade:[7235,2990,2698,6879,7529]
        	},
        	'TextSequencing':{
        		grade:[4127,3864,8944,2103,2113,2195,,4920,7756,2261,2723,2177],
        		nongrade:[1036,1403,1412]
        	},
        	'Typing':{
        		grade:[3993,4185,3774,2335,2108,2511,,2033,2063,2121,2204,2099],
        		nongrade:[3532,3625,4377,4510,4514,3699,4199,7093,4579,4475]
        	},
        	'MultipleChoiceText':{
        		grade:[3690,3867,8431,2045,2057,2064,2072,,2116,2188,2198,2139,2141],
        		nongrade:[7154,8352,8385,8107,8109,9724,8140,8938,9660,2344] 
        	},
        	'MultipleChoiceMedia':{
        		grade:[2515,3391],
        		nongrade:[3497,4103,4106,9539,0265,6032,1459]
        	},
        	'MultipleSelectText':{
        		grade:[4731,4733,4789,6578,7989,8412,9132,9816,12999,13037],
        		nongrade:[]
        	},
        	'MultipleSelectMedia':{
        		grade:[3688,3647,3641,3661,3662,3663,3676,3680,5342],
        		nongrade:[5845,6527,3182,2578,2930,2936,3334,5772,5907,0101,9797]
        	},
        	'MatchingLongText':{
        		grade:[4091,3500,3524,3617,4592,4628,4292,5324,5343,7137],
        		nongrade:[5687]
        	},
        	'WordsVertical':{
        		grade:[3479,3489,3512,3470,4851,4861,3689,4118,6622,7067,9643,2401],
        		nongrade:[5370,4179,4868,4099,,6426,6761,6782,7110,9538,8333,7889]
        	},
        	'MatchingPicture':{
        		grade:[3398,3518,3513,3696,0315,3605,3611,3615,3626,3627,3630,3631,3632],
        		nongrade:[4805,2031,2897]
        	},
        	'MatchingAudio':{
        		grade:[13386,22264,23485,23883,23884,36800,986,1072,1306,1765],
        		nongrade:[1054,7056,10327,17163]
        	},
        	'Classification':{
        		grade:[4957,4051,7743,4587,5047,4284,9038,2752,3274,9545,],
        		nongrade:[8379,8133,8245,8248,8444,8450,2327,2905,2500,3910,8239]
        	},
        	'Dictagloss':{
        		grade:[3400,4382,3629,3636,3715,3656,3659,3664,3667,3673,3475],
	       		nongrade:[3535,9820,8967,8572,4322,4478,4216,6720,3918,6559,9716,6807,7781,8405,8141,8459,9818]
        	},
            'RolePlaySingle' : {
                grade : [3499, 3505, 3514, 3756, 4610, 5346, 4194, 6765, 6773, 7887, 2391, 2123],
                nongrade : [3399, 9682, 3712, 3721, 9725, 3558, 9665, 4661, 9689]
            },
            'RolePlayMutiple' : {
                grade : [3528, 3537, 3539, 3523, 3674, 3557, 3559, 3585, 3586, 3587, 4600, 7138, 4258, 4242],
                nongrade : [6618, 4854, 2513, 2558, 4005, 4036, 3972, 5489, 4481, 6324, 6833, 6119]
            },
            'SpeakingChallenge' : {
                grade : [],
                nongrade : [3403, 3507, 3520, 3703, 3705, 3728, 3730, 4348, 4464, 4547, 4612, 3665, 3707]
            },
            'FlashCard_Presentation' : {
                grade : [3350, 3522, 3599, 3476, 4350, 4583, 7148, 6402, 6483, 6549],
                nongrade : [4335, 3491, 3498, 9683, 3732, 4378, 4549, 9696, 7176, 4181, 4212, 8969, 8852]
            },
            'FlashCard_excise' : {
                grade : [3578, 9726, 3600, 3502, 4069, 4392, 4521, 4530, 4595, 4615],
                nongrade : []
            },
            'FlashCard_Mix' : {
                grade : [3351, 3352, 3576, 3579, 2521, 2029, 3137, 2088, 3056, 3109],
                nongrade : []
            },
            'FlashCard_ModelSentence' : {
                grade : [9698, 3549, 4523, 7170, 7173, 6510, 7703, 7804, 8403, 7899, 8108],
                nongrade : [4539, 4443, 3794, 3816, 55479, 4659, 6634, 6752, 6323, 8698]
            },
            'LanguageComparation' : {
                grade : [3354, 3503, 3504, 3508, 5236, 3582, 3710, 9797, 9707, 3484, 7156, 7158],
                nongrade : [3361, 3406, 6881, 19]
            },
            'VedioRoleplay' : {
                grade : [30095, 30096, 31059, 31092, 31125, 31126, 34305, 34306, 34308, 34309, 34304, 34307, 34310, 31092],
                nongrade : []
            }
        }, _ua = navigator.userAgent;
        $('#act_debug').processTemplate(data, {
            filter_data : false
        }).hover(function() {
            $(this).width("650px");
        }, function() {
            $(this).width("20px");
        });
        $.each(data, function(index, item) {
            $("." + item.name + ' a').click(function(e) {
                if(!item.useDefault){
                    e.preventDefault();
                }
                try {
                    item.handler.apply(this);
                }
                catch(e) {
                    log(e.toString());
                }
                if(!item.useDefault) {
                    return false;
                }
            });
        });
        var _act_type = [];
        $.each(_activity, function(index, item) {
            _act_type.push(index);
        }); 
        act_type.processTemplate(_act_type).appendTo(act_cont);
        act_mode.processTemplate(["grade", "nongrade"]).appendTo(act_cont);
        act.processTemplate(_activity).appendTo(act_cont);
        act_cont.appendTo($("#act_check"));

        if(!$.fn.jDropDown) {
            function render() {
                var _mode = $("#act_mode p"), _type = $("#act_type p"), act_id = $("#act_id"), act_id_li = act_id.find("li");
                act_id_li.addClass("act-hide");
                $("." + _mode.text() + "." + _type.text()).removeClass("act-hide");
                act_id.find("p").text(act_id_li.not(".act-hide").eq(0).text());
            };

            function go() {
                var _text = $("#act_id p").text();
                if(_text !== "") {
                    deepLinking("activity", _text);
                    log("LOG: load activity "+$("#act_type p").text()+"--"+_text);
                    setTimeout(function() {
                        if($(".load_container").is(":visible")) {
                            log("<li style='color:red;'>Request Time out...,please try another activity!</li>");
                        }
                    }, 3000);
                }
            };


            $.getScript("http://cns-812:8111/blitz/Lib/jDropDown.jquery.0.1.js", function() {
                $("#act_type,#act_mode").jDropDown({
                    selected : 0,
                    callback : function() {
                        render();
                    }
                });
                $("#act_id").jDropDown({
                    selected : 0,
                    callback : function() {
                        try {
                            go();
                        }
                        catch(e) {
                            log(e.toString());
                        }
                    }
                });
                $("#change_activity").click(go);
                render();
            });
            window.loadCss("http://cns-812:8111/blitz/testCase/act/_css/plugin/jdropdown.css");
        }

    }
})(window, a = eval("ET.School.UI.Activity"), undefined);
void (0);

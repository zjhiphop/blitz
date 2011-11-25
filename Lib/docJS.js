function docJS(d, n,deep, container) {
    var keys = Object.keys(d).sort().reverse(), _o_content, i = keys.length;
    keys.forEach(function(v) {
        docJS[v + "_deep"] =parseInt(deep)||3;
    });
    while(i--) {
        if(d[keys[i]]&&(d[keys[i]] + "") !== "null") {
            docJS["cur"] = keys[i];
            loop(d[keys[i]], String(keys[i]));
        }
    }
    _o_content = '<div id="sidebar"><h3 id="o">' + n + '</h3><ul id="links">' + docJS.sidebar + '</ul></div><ul id="a">' + docJS.content + '</ul>';
    if(container) {
        container.innerHTML = _o_content;
    }
    return _o_content;
};
docJS.sidebar="",docJS.content="";
function loop(d, n) {
	if(typeof d!=="object"){
		return String(d);
	}
	
    var _p=(n===""?"":n),parent="-  ParentNode: <a href='#" + _p + "'>" + _p + "</a><br/>", list = "", keys = Object.keys(d).sort().reverse(), i = keys.length, _content, list1 = "", numOfLines = "", numOfCharacters = "", numOfArguments = 0, x = 0, pp = ( typeof prettyPrintOne === 'function'), _result;
    while(i--) {
        if(d[keys[i]]&&(d[keys[i]] + "") !== "null") {
            if( typeof d[keys[i]] === "object") {
                x += 0;
                numOfLines = "undefined";
                numOfCharacters = "undefined";
                numOfArguments = 0;
                _content=(docJS[docJS["cur"] + "_deep"] > 0 ? loop(d[keys[i]], keys[i]) : String(d[keys[i]]))||"";
                docJS.sidebar += "<li><a href='#" + keys[i] + "'>- " + keys[i] + "</a></li>";
                docJS.content += "<li class='l' id=" + keys[i] + "><h3>"+parent+ keys[i] + ":<i> ( lines: " + numOfLines + " characters: " + numOfCharacters + " arguments: " + numOfArguments + " )</i></h3><br><pre>  " +    (pp ? prettyPrintOne(_content.replace(/\n/g, '<br/>'), 'js', false) : d[keys[i]]) + "</pre></li>";
                docJS[docJS["cur"] + "_deep"]--;
            }
            else {
                if( typeof d[keys[i]] === "function") {
                    x += d[keys[i]].toString().length;
                    numOfLines = d[keys[i]].toString().split('\n').length;
                    numOfCharacters = d[keys[i]].toString().length;
                    numOfArguments = d[keys[i]].length;
                }
                else {
                    x += d[keys[i]].toString().length;
                    numOfLines = d[keys[i]].toString().split('\n').length;
                    numOfCharacters = d[keys[i]].toString().length;
                    numOfArguments = 0;
                }
                docJS.sidebar += "<li><a href='#" + keys[i] + "'>- " + keys[i] + "</a></li>";
                docJS.content += "<li class='l' id=" + keys[i] + "><h3>"+parent+keys[i] + ":<i> ( lines: " + numOfLines + " characters: " + numOfCharacters + " arguments: " + numOfArguments + " )</i></h3><br><pre>  " + ( pp ? prettyPrintOne(String(d[keys[i]]||"").replace(/\n/g, '<br/>'), 'js', false) : d[keys[i]]) + "</pre></li>";
            }
        }
    }
    console.log(x / 1024 + " Kb - It doesn't calculate nested objects");
}
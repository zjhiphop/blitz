(function(root) {
    var ua = navigator.userAgent,
        result='';
    function is64BitBrowser() {
        if (ua.cpuClass != null && ua.cpuClass.toLowerCase() == "x64") return true;
        if (navigator.platform.toLowerCase() == "win64") return true;
        return false;
    }

    function isWin64OS() {
        return ua.indexOf('WOW64') > -1 || navigator.platform == 'Win64';
    }

    function getOSName() {
        var osInfo = {
           "Windows NT 6.0": "Windows Vista",
           "Windows NT 6.1": "Windows 7",
           "Windows NT 6.2": "Windows 8",
           "Windows NT 5.1": "Windows XP",
           "Windows XP": "Windows XP",
           "Mac_PowerPC": "Mac OS",
           "Macintosh": "Mac OS",
           "Linux": "Linux",
           "X11": "Linux"
        };
        for(var i in osInfo){
            if(~ua.indexOf(i)){
                return osInfo[i];
            }
        }
    }

    function getBrowserInfo(){
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName  = navigator.appName;
        var fullVersion  = ''+parseFloat(navigator.appVersion); 
        var majorVersion = parseInt(navigator.appVersion,10);
        var nameOffset,verOffset,ix;

        // In Opera, the true version is after "Opera" or after "Version"
        if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
         browserName = "Opera";
         fullVersion = nAgt.substring(verOffset+6);
         if ((verOffset=nAgt.indexOf("Version"))!=-1) 
           fullVersion = nAgt.substring(verOffset+8);
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
         browserName = "Microsoft Internet Explorer";
         fullVersion = nAgt.substring(verOffset+5);
        }
        // In Chrome, the true version is after "Chrome" 
        else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
         browserName = "Chrome";
         fullVersion = nAgt.substring(verOffset+7);
        }
        // In Safari, the true version is after "Safari" or after "Version" 
        else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
         browserName = "Safari";
         fullVersion = nAgt.substring(verOffset+7);
         if ((verOffset=nAgt.indexOf("Version"))!=-1) 
           fullVersion = nAgt.substring(verOffset+8);
        }
        // In Firefox, the true version is after "Firefox" 
        else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
         browserName = "Firefox";
         fullVersion = nAgt.substring(verOffset+8);
        }
        // In most other browsers, "name/version" is at the end of userAgent 
        else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
                  (verOffset=nAgt.lastIndexOf('/')) ) 
        {
         browserName = nAgt.substring(nameOffset,verOffset);
         fullVersion = nAgt.substring(verOffset+1);
         if (browserName.toLowerCase()==browserName.toUpperCase()) {
          browserName = navigator.appName;
         }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix=fullVersion.indexOf(";"))!=-1)
           fullVersion=fullVersion.substring(0,ix);
        if ((ix=fullVersion.indexOf(" "))!=-1)
           fullVersion=fullVersion.substring(0,ix);

        majorVersion = parseInt(''+fullVersion,10);
        if (isNaN(majorVersion)) {
         fullVersion  = ''+parseFloat(navigator.appVersion); 
         majorVersion = parseInt(navigator.appVersion,10);
        }

        return ''
         +'Browser name  = '+browserName+'\r\n'
         +'Full version  = '+fullVersion+'\r\n'
         +'Major version = '+majorVersion+'\r\n'
         +'navigator.appName = '+navigator.appName+'\r\n'
         +'navigator.userAgent = '+navigator.userAgent+'\r\n'
    }
    

    result += "Your Browser is: " + (is64BitBrowser() ? " 64Bits": "32Bits;") + "\r\n";
    result += "Your OS is: " + (isWin64OS() ? " Windows 64Bits" : "Windows 32Bits;") + "\r\n";
    result += "Your OS name is: " + getOSName() + "\r\n";
    result += getBrowserInfo();
    alert(result);

    console && console.log && console.log(result);
})(window);void(0);
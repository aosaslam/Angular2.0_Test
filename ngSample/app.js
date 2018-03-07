window.parseTLSinfo = function(data) {
    var ie = IeVersion();

    document.write("IsIE: " + ie.IsIE + "</br>");
    document.write("TrueVersion: " + ie.TrueVersion + "</br>");
    document.write("ActingVersion: " + ie.ActingVersion + "</br>");
    document.write("CompatibilityMode: " + ie.CompatibilityMode + "</br>");
    document.write(navigator.userAgent);
    
    // var docMode = document.documentMode;
    // var docAgent = navigator.userAgent;
    // var docVersion = navigator.appVersion;
    // console.log(docAgent);
    // console.log(docVersion);
    // console.log(docMode);
    // var version = data.tls_version.split(' ');        
    // if(version[0] != 'TLS' || version[1] < 1.2)
    //   alert('Doomsday!! April 1, 2018 ' + data.tls_version + '. Please upgrade to a browser with TLS 1.2 support.');
    // else
    // if(ie.TrueVersion <= 7 && docMode != undefined)
    //   alert('Hurray!! Your browser supports ' + data.tls_version + '.')
  };

  function IeVersion() {
    //Set defaults
    var value = {
        IsIE: false,
        TrueVersion: 0,
        ActingVersion: 0,
        CompatibilityMode: false
    };

    //Try to find the Trident version number
    var trident = navigator.userAgent.match(/Trident\/(\d+)/);
    if (trident) {
        value.IsIE = true;
        //Convert from the Trident version number to the IE version number
        value.TrueVersion = parseInt(trident[1], 10) + 4;
    }

    //Try to find the MSIE number
    var msie = navigator.userAgent.match(/MSIE (\d+)/);
    if (msie) {
        value.IsIE = true;
        //Find the IE version number from the user agent string
        value.ActingVersion = parseInt(msie[1]);
    } else {
        //Must be IE 11 in "edge" mode
        value.ActingVersion = value.TrueVersion;
    }

    //If we have both a Trident and MSIE version number, see if they're different
    if (value.IsIE && value.TrueVersion > 0 && value.ActingVersion > 0) {
        //In compatibility mode if the trident number doesn't match up with the MSIE number
        value.CompatibilityMode = value.TrueVersion != value.ActingVersion;
    }
    return value;
}

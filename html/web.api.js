var api = {

    currentHost: //"http://localhost:80"
	"http://localhost"
	,

    /* пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ XMLHTTP */
    getXmlHttp: function() {
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (ex) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    },
    
    //пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ
    connect : function (host, callbackFunction) {
	
        if (host != "")
 			this.currentHost = host;
			
        var xmlhttp = this.getXmlHttp();
        xmlhttp.open('POST', this.currentHost + '/web/connect', true); // пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
			
                if (xmlhttp.status == 200) {
                    callbackFunction('ok');
                }
				else{
                    callbackFunction('I can\'t connect to Pilot-Server! Xmlhttp.status == ' + xmlhttp.status);
				}
            }
		};
    },

    openDatabase : function (database, login, password, useWinAuth, callbackFunction){
		
        // construct an HTTP request
        var data = {
            "api" : "IServerApi",
            "method" : "OpenDatabase",
            "database" : database,
            "login" : login,
            "protectedPassword" : password,
            "useWindowsAuth" : useWinAuth
        };

        var xmlhttp = this.getXmlHttp();
        xmlhttp.open('POST', this.currentHost + '/web/call', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xmlhttp.send(JSON.stringify(data));
		xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
			
                if (xmlhttp.status == 200) {
                    callbackFunction(xmlhttp.responseText);
                }
				else{
					callbackFunction('Error! I can\'t open base! Xmlhttp.status == ' + xmlhttp.status);
				}
			}
        };
    },
    
    connectToDatabase : function (host, database, login, password, useWinAuth, callbackFunction) {
	
        var self = this;
        this.connect(host, function (result) {
			
			if(result == 'ok'){
				self.openDatabase(database, login, password, useWinAuth, callbackFunction);
				}
			else{	
				callbackFunction('I can\'t connect to Pilot-Server!');
				}
        });
    },
    
    getObjects: function (ids, callbackFunction) {
	
        var data = {
            "api" : "IServerApi",
            "method" : "GetObjects",
            "ids" : ids
        };

        var xmlhttp = this.getXmlHttp();
        xmlhttp.open('POST', this.currentHost + '/web/call', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xmlhttp.send(JSON.stringify(data));
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    callbackFunction(xmlhttp.responseText);
                }
            }
        };
    },
	    
    getMetadata: function (callbackFunction) {
	
        var data = {
            "api" : "IServerApi",
            "method" : "GetMetadata",
            "localVersion" : 0
        };

		
        var xmlhttp = this.getXmlHttp();
        xmlhttp.open('POST', this.currentHost + '/web/call', false);
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xmlhttp.send(JSON.stringify(data));
            if (xmlhttp.status == 200) {
                callbackFunction(xmlhttp.responseText);
            }
    },
	
    getVersion: function (callbackFunction) {
	
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		var xhr = new XHR();
		// запрос на другой домен 
		xhr.open('GET', this.currentHost + '/web/version', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');        
		xhr.onload = function() {
		  if(this.status == 200){
			callbackFunction( 'Connection to ' + this.responseText );
		  }
		  else
			callbackFunction( 'I can\'t connect to Pilot-Server ' + this.responseText );
		}
		xhr.send();
		
    }
	
	getFile: function (id, size, callbackFunction, errorFunction) {
    
        var data = {
            "api" : "IFileArchiveApi",
            "method" : "GetFileChunk",
            "databaseName" : getCookie('baseName'),
            "id" : id,
            "pos" : 0,
            "count" : size
        };

        
        var xmlhttp = this.getXmlHttp();
        xmlhttp.open('POST', this.currentHost + '/web/call', false);
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xmlhttp.send(JSON.stringify(data));
            if (xmlhttp.status == 200) {
                callbackFunction(xmlhttp.responseText);
            }
            else {
                errorFunction();
            }
    },


    openFile: function (id, size) {

        window.location = this.currentHost + '/web/file?' 
            + "api=" + encodeURIComponent('IFileArchiveApi') + '&'
            + "method=" + encodeURIComponent('GetFileChunk') + '&' 
            + "databaseName=" + encodeURIComponent(getCookie('baseName')) + '&' 
            + "id=" + encodeURIComponent(id) + '&' 
            + "pos=" + encodeURIComponent(o) + '&' 
            + "count=" + encodeURIComponent(size) ;

    },
	

};
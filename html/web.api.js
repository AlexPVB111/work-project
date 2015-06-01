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
		alert("connect");
	
        if (host != "")
 			this.currentHost = host;
			
        var xmlhttp = this.getXmlHttp();
        xmlhttp.open('POST', this.currentHost + '/web/connect', true); // пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {
			//alert('in readyState is -> ' + xmlhttp.readyState);
            if (xmlhttp.readyState == 4) {
			
                if (xmlhttp.status == 200) {
					alert("in connect");
                    callbackFunction('ok');
                }
	//			else{
	//				alert('I can\'t connect to Pilot-Server! ' + xmlhttp.status);
    //                callbackFunction('I can\'t connect to Pilot-Server! Xmlhttp.status == ' + xmlhttp.status);
	//			}
            }
	//		else {
	//			alert('Error! Xmlhttp.readyState is -> ' +  xmlhttp.readyState);
    //            callbackFunction('I can\'t connect to Pilot-Server!  Xmlhttp.readyState == ' + xmlhttp.readyState);
	//		}
		};
    },

    openDatabase : function (database, login, password, useWinAuth, callbackFunction){
		
		alert("open db1");
        // construct an HTTP request
        var data = {
            "api" : "IServerApi",
            "method" : "OpenDatabase",
            "database" : database,
            "login" : login,
            "protectedPassword" : password,
            "useWindowsAuth" : useWinAuth
        };
	//этот alert уже не отрабатывает
		alert("open db before call");
        var xmlhttp = this.getXmlHttp();
        xmlhttp.open('POST', this.currentHost + '/web/call', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xmlhttp.send(JSON.stringify(data));
		xmlhttp.onreadystatechange = function() {
			alert("open db2");
            if (xmlhttp.readyState == 4) {
				alert("open db3");
                if (xmlhttp.status == 200) {
					alert("open db4");
                    callbackFunction(xmlhttp.responseText);
                }
				/*
				else{
					alert('I can\'t open base! Xmlhttp.status == ' + xmlhttp.status);
					callbackFunction('Error! I can\'t open base! Xmlhttp.status == ' + xmlhttp.status);
				}
				*/
            }/*
			else{
				alert('Error! Xmlhttp.readyState is -> ' +  xmlhttp.readyState);
				callbackFunction('Error! I can\'t open base! Xmlhttp.readyState == ' + xmlhttp.readyState);
			}
			*/
        };
    },
    
    connectToDatabase : function (host, database, login, password, useWinAuth, callbackFunction) {
	
		alert("cdb1");
        var self = this;
        this.connect(host, function (result) {
			
			alert("cdb2");
			
			if(result == 'ok'){
			
				alert("cdb3");
				self.openDatabase(database, login, password, useWinAuth, callbackFunction);
				}
			else{
			
				alert("cdb4");
				callbackFunction(result);
				}
        });
    },
    
    getObjects: function (ids, callbackFunction)
    {
        var data = {
            "api" : "IServerApi",
            "method" : "GetObjects",
            "ids" : ids,
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
	
    getVersion: function (callbackFunction)
    {

		// (1)
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		var xhr = new XHR();
		// (2) запрос на другой домен 
		xhr.open('GET', this.currentHost + '/web/version', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');        
		//xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, */*');
		//xhr.setRequestHeader('Accept-Language', 'ru-RU');
		//xhr.setRequestHeader('Accept-Encoding','qzip, deflate');

		//сейчас только выводит в виде сообщения, надо доделать для отображения и обработать ошибки
		xhr.onload = function() {
		  //alert( this.responseText );
		  if(this.status == 200){
			callbackFunction( 'Connection to ' + this.responseText );
		  }
		  else
			callbackFunction( 'I can\'t connect to Pilot-Server ' + this.responseText );
		}

		/*
		xhr.onerror = function() {
		  callbackFunction( 'Error!' + this.status );
		}
		*/
		
		xhr.send();
		
    }

	
};
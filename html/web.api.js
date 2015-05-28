var api = {

    currentHost: "http://localhost:80",

    /* ������� ������ ��������������� ������ XMLHTTP */
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
    
    //������� ����������� � �������
    connect : function (host, callbackFunction) {
        if (host != "")
            this.currentHost = host;
        
        var xmlhttp = this.getXmlHttp();
        xmlhttp.open('POST', this.currentHost + '/web/connect', true); // ��������� ����������� ����������
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    callbackFunction();
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
            }
        };
    },
    
    connectToDatabase : function (host, database, login, password, useWinAuth, callbackFunction) {
	
		
        var self = this;
        this.connect(host, function () {
			
			
            self.openDatabase(database, login, password, useWinAuth, callbackFunction);
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
    }
	


  
	
};
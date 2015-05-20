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
    },
	
	IsJsonString : function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
		
		LoadRootObjects : function (callbackFunction)
        {
			var cont;
			var self = this;
            var guids = [ '00000001-0001-0001-0001-000000000001' ];
            self.getObjects(guids, function (result) {

                if (!self.IsJsonString(result)) {
					alert("i am in jsonstr!!!LIMIT OF CONNECTION");
                    return;
                }

                var root = JSON.parse(result)[0];
                var childrenIds = root.Children.Tree;
                self.getObjects(childrenIds, function (children) {
                     cont = self.OnChildrenLoaded(JSON.parse(children));
					 //alert(cont.toString());
					 callbackFunction(cont);
                });
                
            });
        },

        OnChildrenLoaded : function (children)
        {
			var arrTitles = [];
			var self = this;
            for (var i in children) {
                var val = children[i];
				arrTitles[i] = self.GetTitle(val.Attributes);
				//alert("arrTitles " + i + " й - > " + arrTitles[i]);
				
                //var d = document.createElement('div');
                //d.style.height = '30px';
                //d.innerText = /*JSON.stringify(val);*/GetTitle(val.Attributes);
				//alert("d.innerText where children -> " + d.innerText);
                //document.body.appendChild(d);

            }
			//alert(arrTitles[0]);
			return arrTitles;
        },

        GetTitle: function (attributes)
        {
            var result = "";
            for (var i in attributes) {
                var val = attributes[i];
                result = result + val.StrValue;
            }
            return result;
        }
	
};
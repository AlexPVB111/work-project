var control = {

    currentHost: "http://localhost:80",

    
    connectToDatabase : function (host, database, login, password, useWinAuth) {

        api.connectToDatabase(host, database, login, password, useWinAuth, function(result){
		
			//alert(result);
			if(result.indexOf('not found') == -1){
				if(result.indexOf('incorrect') == -1){
					//result1 = result;
					document.getElementById('connection').innerHTML = 'Connected';
					//alert(result);
					api.LoadRootObjects(function(resarr){
						//alert(resarr.toString());
						//document.location.href = "http://localhost:80/html/main.html?par1="+resarr[0]+"&par2="+resarr[1]+"&par3="+resarr[2];
						var urlWithParams = "http://localhost:80/html/main.html?par0="+resarr.length;
						var count = 1;
						for (var i in resarr){
							urlWithParams = urlWithParams + "&par" + count + "=" + resarr[i];
							count++;
						}
						document.getElementById('connection').innerHTML = '';
						document.location.href = urlWithParams;
						//alert(urlWithParams);
					});
					//alert("arr is ->"+arr.toString());
					//document.location.href = "http://localhost:80/html/main.html?per="+arr;
				}
				else{
					alert("User parameters is wrong!");
					document.getElementById('connection').innerHTML = '';
					document.getElementById('wrong').innerHTML = 'Incorrected parameters.Use others.';
					document.getElementById('mainframe').reset();
				}
			}	
			else{
				alert("Datebase not found!");
				document.getElementById('connection').innerHTML = '';
				document.getElementById('wrong').innerHTML = 'Date base not found. Use other.';
			}
		
		});
    }
	
	 


        
};
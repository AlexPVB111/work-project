var control = {
    
    connectToDatabase : function (host, database, login, password, useWinAuth) {

        api.connectToDatabase(host, database, login, password, useWinAuth, function(result){
			
			if(result.indexOf('license limit') == -1){
				if(result.indexOf('I can\'t connect') == -1){
					
					if (result.indexOf('unavailable') == -1) {
						
						if(result.indexOf('not found') == -1){
							
							if(result.indexOf('incorrect') == -1){
								
								document.getElementById('connection').innerHTML = 'Connected';	

								if(result.indexOf('I can\'t open base!') == -1){
									var databaseInfo = JSON.parse(result);
									var bdid = databaseInfo.DatabaseId;
									var person = databaseInfo.Person.DisplayName;	
									document.cookie = "userName=" + person;
									document.cookie = "databaseId=" + bdid;
									document.location.href = "html/main.html";
								}
								else{
									document.getElementById('connection').innerHTML = '';
									document.getElementById('wrong').innerHTML = result;
								}
							}
							else{
								document.getElementById('connection').innerHTML = '';
								document.getElementById('wrong').innerHTML = result;
							}
						}	
						else{
							document.getElementById('connection').innerHTML = '';
							document.getElementById('wrong').innerHTML = result;
						}
					}
					else{
						document.getElementById('connection').innerHTML = '';
						document.getElementById('wrong').innerHTML = result;
					}
				}
				else{
					document.getElementById('connection').innerHTML = '';
					document.getElementById('wrong').innerHTML = result;
				}
			}
			else{
				document.getElementById('connection').innerHTML = '';
				document.getElementById('wrong').innerHTML = result;
			}
		});
    },
	
	getVersion: function(){
	
				api.getVersion(function(result){
					document.getElementById('pilotversion').innerHTML = result;
				});
	
	}

        
};
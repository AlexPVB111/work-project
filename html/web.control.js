var control = {
    
    connectToDatabase : function (host, database, login, password, useWinAuth) {

        api.connectToDatabase(host, database, login, password, useWinAuth, function(result){

			if(result.indexOf('not found') == -1){
				if(result.indexOf('incorrect') == -1){
					document.getElementById('connection').innerHTML = 'Connected';
					
					var databaseInfo = JSON.parse(result);
                    var dbv = databaseInfo.DatabaseVersion;
                    var bdid = databaseInfo.DatabaseId;
                    var person = databaseInfo.Person.DisplayName;	
					
					//передача в качестве параметров: версии дб, id дб, имени пользователя
					document.location.href = "html/main.html?par0="+dbv+"&par1="+bdid+"&par2="+person;
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
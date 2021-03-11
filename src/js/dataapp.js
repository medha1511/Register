App = {

	web3Provider:null,
	contracts: {},

	init: async function() {

		return await App.initWeb3();
	},

	initWeb3: function() {

		if(window.web3) {
			App.web3Provider = window.web3.currentProvider;
		}
		else {
			App.web3Provider = new Web3.providers.HttpProvider('http://localahost:7545');
		}

		web3 = new Web3(App.web3Provider);
		return App.initContract();
	},

	initContract: function() {

		$.getJSON('register.json',function(data){

			var registerArtifact = data;
			App.contracts.register = TruffleContract(registerArtifact);
			App.contracts.register.setProvider(App.web3Provider);

		});
			return App.loginUser();
	},

	loginUser: function() {
		
		var registerInstance;
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			App.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.viewAccounts.call();

			}).then(function(result){

				var name=[];
				var email=[];
				var mobile=[];
				var pwd=[];

				for(var k=0;k<result[0].length;k++)
				{
					name[k]=web3.toAscii(result[0][k]);
				}

				for(var k=0;k<result[1].length;k++)
				{
					email[k]=web3.toAscii(result[1][k]);
				}

				for(var k=0;k<result[2].length;k++)
				{
					mobile[k]=web3.toAscii(result[2][k]);
				}

				for(var k=0;k<result[3].length;k++)
				{
					pwd[k]=web3.toAscii(result[3][k]);
				}

				console.log(name);
				console.log(email)
				console.log(mobile);
				console.log(pwd);
				
				var t = "";
				for (var i = 0; i < name.length; i++){
      				
      				var tr = "<tr>";
      				tr += "<td>"+name[i]+"</td>";
      				tr += "<td>"+email[i]+"</td>";
      				tr += "<td>"+mobile[i]+"</td>";
      				tr += "<td>"+pwd[i]+"</td>";
      				tr += "</tr>";
      				t += tr;
				}
				document.getElementById("logdata").innerHTML += t;
				document.getElementById('add').innerHTML = account;
			
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	}
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

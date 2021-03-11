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
			return App.bindEvents();
	},

	bindEvents: function() {

		$(document).on('click', '.btn-login', App.loginUser);
	},

	loginUser: function(event) {
		event.preventDefault();

		var registerInstance;
		var mobile = document.getElementById('mobile').value;
		var pwd = document.getElementById('pwd').value;
		
		console.log(mobile);
		console.log(pwd);

		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			App.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.loginAccount(web3.fromAscii(mobile),web3.fromAscii(pwd),{from:account});

			}).then(function(result){

				console.log(result);
				if(result==true) {
					window.open("data.html","_self");
				}

				document.getElementById('mobile').innerHTML = '';
				document.getElementById('pwd').innerHTML = '';

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

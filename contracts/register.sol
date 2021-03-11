pragma solidity 0.5.16;


contract register {
	bytes32[] internal name;
	bytes32[] internal email;
	bytes32[] internal mobile;
	bytes32[] internal password;
	mapping(address => bool) internal users;
		
	function addAccount(bytes32 _name, bytes32 _email, bytes32 _mobile, bytes32 _password) public {

		require(!users[msg.sender]);
		
		users[msg.sender]=true;
		name.push((_name));
		email.push((_email));
		mobile.push((_mobile));
		password.push((_password));	
	}
	
	function viewAccounts() public view returns(bytes32[] memory, bytes32[] memory, bytes32[] memory, bytes32[] memory) {
		return(name,email,mobile,password);
	}

	function loginAccount(bytes32 _mobile, bytes32 _password) public view returns(bool){
		
		uint i;
		uint j=0;

		require(users[msg.sender]);

		if(password.length>0) {
			for(i=0;i<password.length;i++) {
				if((password[i])==(_password)) {
					j=i;
				}
			}
		
		
			if(password[j]==_password && mobile[j]==_mobile) {
				return true;
			}
			else {
				return false;
			}
		}
	}
}

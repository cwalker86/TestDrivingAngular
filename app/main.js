angular.module("AddressBook", [])
// add a new contact service
// inject $http module into service
.service("contactService", function($http){
	this.contacts = [];
	$http.get("http://localhost:9001/contacts",function(res){
		// log response from server request
		console.log(res);
	})
});

angular.module("AddressBook", [])
// add a new contact service
// inject $http module into service
.service("contactService", function($http){

  this.contacts = [];
  var contactService = this;

  //	$http.get("http://localhost:9001/contacts",function(res){
		// log response from server request
    // console.log(res);
    // take everyting from res
    // while(res[0]){
      // scope of 'this' is changed b/c of $http module
      // assign
    // contactService.push(res.pop());
  // }
  // })
  
  $http.get("http://localhost:9001/contacts")
  .then(function(res){
    console.log(res);
    while(res.data[0]){
      contactService.contacts.push(res.data.pop());
    }
  });

})
// get contacts from contactService, and add it to scope
.controller("ContactController", function(contactService, $scope){
  $scope.contacts = contactService.contacts;
})
.filter("proper",function(){
  return function(name){
    // assign type of name to var
    var type = typeof name;
    if(type !== 'number' && type !== 'string') throw new Error();
    return name.toString().split(" ").map(function(word){
      return word[0].toUpperCase().concat(word.slice(1));
    }).join(" ");
  }
})

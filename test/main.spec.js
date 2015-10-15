var assert = chai.assert;
var expect = chai.expect;

describe("The Address Book App", function(){

  describe("the contact service", function(){

    beforeEach(function(){
      module('AddressBook');
      inject(function($injector){
        contactService = $injector.get("contactService");
        //module for intercepting http requests
        $httpBackend = $injector.get("$httpBackend");
      })
    })

    it("should have an array of property contacts", function(){
      expect(contactService.contacts).to.be.an('array');
    });

    it("should call the backend", function(){
      $httpBackend.expectGET("http://localhost:9001/contacts")
        //chain response
        .respond(200,[]);
      //runs all requests, catch any unknown http requests
      $httpBackend.flush();
    })
  })

  describe("the contact controller",function(){

    beforeEach(function(){
      module('AddressBook');
      inject(function($injector, $rootScope){
        $scope = $rootScope.$new();
        contactService = $injector.get("contactService");
        $httpBackend = $injector.get("$httpBackend");
        $controller = $injector.get("$controller");
      })
    })

    it ("should store an array of contacts in scope",function(){
      $controller("ContactController",{$scope:$scope,contactService:contactService});
      assert.isArray($scope.contacts);
    })

  })

  describe("the proper filter",function(){
    beforeEach(function(){
      module('AddressBook')
      inject(function($injector){
        proper = $injector.get("$filter")("proper");
      });
      
    });

    it("should proper case a string",function(){
      expect(proper("ned stark")).to.equal("Ned Stark");
    });

    it("should take a number and return that as a string",function(){
      expect(proper(42)).to.equal("42");
    })
   
    it("should throw an error on an incompatible type",function(){
      //pass in a function closure to throw an error for undefined type
      assert.throws(function(){
        proper(undefined)
      });
    })
  })
})

describe("Hello world", function() {
    var element;
    var $scope;
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        element = angular.element("<div>{{2 + 2}}</div>");
        element = $compile(element)($rootScope)
    }))

    it('should equal 4', function() {
        $scope.$digest()
        expect(element.html()).toBe("4");
    })
});


describe('calculator_controller', function() {
    // Load the module with MainController
    beforeEach(module('calculator_app'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('calculator_controller', {
            $scope: scope
        });
    }));

    it('should append the command to command history',
        function() {
            expect(scope.commands.length).toEqual(0);
            scope.command = 'add 5'
            scope.calculate();
            expect(scope.commands.length).toEqual(1);
        });

    it('should have the correct command history',
        function() {
            expect(scope.commands.length).toEqual(0);
            scope.command = 'add 5'
            scope.calculate();
            scope.command = 'sub 5';
            scope.calculate();
            expect(scope.commands.length).toEqual(2);
            expect(scope.commands).toEqual(['add 5', 'sub 5'])
        });
});

describe('calculator_controller1', function() {
    // Load the module with MainController
    beforeEach(module('calculator_app'));
    var scope, httpBackend, ctrl;

    beforeEach(inject(function($rootScope, $httpBackend, $controller, $http) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();

        ctrl = $controller('calculator_controller', {
            $scope: scope
        });

    }));

    afterEach(function() {
        //httpBackend.verifyNoOutstandingExpectation();
        //httpBackend.verifyNoOutstandingRequest();
    });

    it('should fail when calculator is not available', function() {

        var url ='/api/calculator_update';
        var data = {"command":"add 5"};
        httpBackend.when('PUT', url , data )
            .respond(404);
        scope.command ="add 5"
        scope.calculate();
        httpBackend.flush();
        expect(scope.result).toEqual('calculator not available');

    });

    it('should send error when user is not logged in', function() {

        var url ='/api/calculator_update';
        var data = {"command":"add 5"};
        httpBackend.when('PUT', url , data )
            .respond(401);
        scope.command ="add 5"
        scope.calculate();
        httpBackend.flush();
        expect(scope.result).toEqual("user not logged in");
    });

    it('should send ok when calculator is available', function() {

        var url ='/api/calculator_update';
        var data = {"command":"add 5"};
        httpBackend.when('PUT', url , data )
            .respond(200, {"state" : 5.0});
        scope.command ="add 5"
        scope.calculate();
        httpBackend.flush();
        expect(scope.result).toEqual(5.0);
    });
});
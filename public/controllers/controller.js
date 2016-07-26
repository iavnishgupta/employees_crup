(function() {
  var mainApp = angular.module('mainApp', []);

  mainApp.controller('AppCtrl', function($scope,$http){
    console.log("Hello world from controller");
    $scope.flag = false;
    //Get Request to server
    $http.get('/employeeList').success(function(res){
      $scope.empList = res;
      console.log("Got data from database :-",res);
    });

    //Refresh function to get new data
    var refresh = function(){
      $http.get('/employeeList').success(function(res){
        $scope.empList = res;
        $scope.employee = null;
        $scope.flag = false;
        console.log("Got data from database :-",res);
      });
    }

    //Click addEmployee function
    $scope.addEmployee = function(){
      console.log($scope.employee);

      //Post data
      $http.post('/addEmployeeDetails', $scope.employee)
           .success(function (data, status, headers, config) {
               window.alert(data);
               refresh();
           })
           .error(function (data, status, header, config) {
             alert(data);
           });
    }

    //Click Update function.
    $scope.updateEmployee = function(emp){
      //Post data
      $http.post('/updateEmployeeDetails', $scope.employee)
           .success(function (data, status, headers, config) {
               window.alert(data);
               refresh();
           })
           .error(function (data, status, header, config) {
             alert(data);
           });
    }

    //get employee in textbox
    $scope.getEmployee = function(emp){
      console.log(emp);
      $scope.employee = emp;
      $scope.flag = true;
    }


    //Click Delete Employee function
    $scope.deleteEmployee = function(emp){
      console.log(emp);
      var r = confirm("You want to delete details of "+emp.name+ "?");
      if (r == true) {
          console.log("You pressed ok.");

          //Sending object to backend to delete itself.
          $http.post('/removeEmployeeDetails', emp)
               .success(function (data, status, headers, config) {
                   refresh();
               })
               .error(function (data, status, header, config) {
                 alert("error occured");
               });
      } else {
          console.log("You pressed No");
      }
    }

  });
})();

angular.module("app",['ngRoute'])
.config(function($routeProvider){
	$routeProvider
	.when('/home',{
		templateUrl:'home.html',
		controller:'homecntrl'

	})
	.when("/edit",{
		templateUrl:'edit.html',
		controller:'editcntrl'
	})
	.otherwise({redirectTo:"/home"})

})

.controller("cntrl",function(){
	document.getElementById("default").focus();
})

/* CONTROLLER FOR EDIT TAB */
/*******************************************************************/
.controller("editcntrl",function($scope,$http,validationForPrice,validationForProductName){
	
	$scope.add =  function($event){
		
		/* Validation for Cost Price */
		if(isNaN($scope.addProduct.CP)){
			alert("Please Enter correct Cost Price");
			$scope.addProduct.CP = "";
			document.forms[0][3].focus();
			return false;
		}	
		
		/* Validation for Selling Price */
		if(isNaN($scope.addProduct.SP)){
			alert("Please Enter correct Selling Price");
			$scope.addProduct.SP = "";
			document.forms[0][4].focus();
			return false;
		}	
		
		/* Validation for checking CP > SP */
		if (!(validationForPrice($scope.addProduct))){ 
			document.forms[0][4].focus();
			return false;
		}	

		/* Validation for Checking Alphanumeric characters for Name */
		if (!(validationForProductName($scope.addProduct))){
			document.forms[0][2].focus();
			return false;
		}	

		$http.post("/products",$scope.addProduct).success(function(response){
			alert("Added Successfully");
			$scope.addProduct = "";
		})	
		
		document.forms[0][0].focus();
		return true;
	}


})
/*******************************************************************/

.factory("validationForPrice",function(){
	return  function(obj){
		if ( Number(obj.CP) > Number(obj.SP) ){
			alert("Cost Price Should be less than Selling Price");
			return false;
		}
		return true;
	}
})

.factory("validationForProductName",function(){
	return  function(obj){
		var regexp = new RegExp("\^[0-9a-zA-Z ]+$");
		if(!regexp.test(obj.name)){
			alert("Special characters are not allowed for Product Name");			
			return false;
		}
		return true;
	}
})



/* CONTROLLER FOR HOME TAB */
/*******************************************************************/
.controller("homecntrl",function($scope,$q,$http,validationForPrice,validationForProductName){
	$scope.isData = false;
	
	var refresh = function(){
		var deferred = $q.defer();
		$http.get("/products")
		.success(function(response){
			deferred.resolve(response);
		})
		.error(function(response){
			deferred.reject(response);
		});
	
		return deferred;	
	};


	var refreshSearch = function(){
		new refresh().promise.then(function(data){		
			$scope.products = data;	
		},function(data){
			alert("Promise Rejected");
		})
	};
	refreshSearch();
	

	$scope.searchProduct = function($event){

		if ($event.keyCode === 13){	
			
			if (typeof $scope.search == "undefined") 
				return;
			
			$http.get("/products/" + $scope.search)
			.success(function(response){
				//$scope.searchedProductList = response; 
				$scope.product = response[0];
				if (typeof $scope.product != "undefined")
					$scope.isData = true;
				else
					$scope.isData = false;					
			})
		}	
	}


	$scope.update = function($event,product){
		if ($event.keyCode === 13) {
			
			if (product.name == ""){
				alert ("Product Name cannot be blank");
				return;
			}

			if(isNaN(product.SP)){
				alert("Please Enter correct Selling Price");
				return;
			}

			/* Validation for checking CP > SP */
			if (!(validationForPrice(product))) return;
			
			/* Validation for Checking Alphanumeric characters for Name */
			if (!(validationForProductName(product))) return;	
			
			$http.put("/products/" + product._id ,product).success(function(response){
				refreshSearch();
				$scope.search = product.name;
			})
		}	
	}

})
/*******************************************************************/
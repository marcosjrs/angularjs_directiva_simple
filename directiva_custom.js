angular
.module('App',[])
.directive('directivaImg',function(){
	return function(scope,element,attrs){
		//Observer sobre el valor del atributo directiva-img (en html). Se utilizó la propia directiva 
		//para recoger la url de imagen, pero se podría poner otra, por ejemplo urlImg, 
		//quedando en el html: <div class="circular" directiva-img url-img="{{post.owner.avatar_url}}"></div> y aquí cambiando "urlImg" en lugar de "directivaImg"	
		attrs.$observe('directivaImg',function(value){ 
			element.css({ 
					'background-image':"url('"+value+"')",
					'background-size': 'cover',
					'background-position':'center'
				});
		});
	};
})
.controller('Controlador',function($scope,$http){
	$scope.repos=[];
	var url = "http://inspirational-images.tumblr.com/api/read/json?callback=JSON_CALLBACK";
	$http.jsonp(url)
    .success(function(data) {
    	$scope.posts=data.posts;
	}).error(function(err){
	});
});
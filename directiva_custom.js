angular
.module('App',[])
.directive('directivaAutocompletado', function(){
	function link(scope,element,attrs){
		$(element).autocomplete({
			source: scope.$eval(attrs.directivaAutocompletado), /*recogemos la fuente de datos del valor del atributo*/
			select: function(evt, ui){
				evt.preventDefault();
				if(ui.item){
					scope.seleccionar(ui.item.value);
				}
			},
			focus:function(evt,ui){
				evt.preventDefault();
				$(this).val(ui.item.label);
			}
		});

	};
	return { 
		link: link 
	};
})
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
	$scope.titles=[];
	var url = "http://un-escritor-dice.tumblr.com/api/read/json?callback=JSON_CALLBACK";
	$http.jsonp(url)
    .success(function(data) {
    	$scope.posts=data.posts;
    	for (var i = data.posts.length - 1; i >= 0; i--) {
    		if(data.posts[i]["regular-title"]) $scope.titles.push(data.posts[i]["regular-title"]);
    	};
	}).error(function(err){
	});

	$scope.seleccionar = function(item){		
		$scope.$apply(function(){
			$scope.seleccionado = item; // sin realizar el apply, no se percataría angularjs.
		});
	}
});
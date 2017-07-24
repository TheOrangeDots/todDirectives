angular.module('todDnddirectives',['servoy'])
//.factory("todDnddirectives",function($services) 
//{
//	var scope = $services.getServiceScope('todDnddirectives');
//	return {}
//	}
//})
.directive('todDragover',  function ($parse, $utils) { //$parse:angular.IParseService,$utils:servoy.IUtils
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			$utils.attachEventHandler($parse, element, scope, attrs['todDragover'], 'dragover');
		}
	};
})
/*
.directive('draggable', function() {
  return function(scope, element) {
    // this gives us the native JS object
    var el = element[0];
    
    el.draggable = true;
    
    el.addEventListener('dragstart', function(e) {
    	e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('Text', this.id);
        
        console.log('dragstart', e)
        
        //this.classList.add('drag');
        return false;
      },
      false
    );
    
    el.addEventListener('dragend', function(e) {
    	console.log('dragend', e)
    	
    	//this.classList.remove('drag');
        return false;
      },
      false
    );
  }
})
*/
.directive('droppable', function() {
  return {
    scope: {
      drop: '&',
      bin: '='
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];
      
      el.addEventListener('dragover', function(e) {
    	  e.dataTransfer.dropEffect = 'copy';

    	  console.log('dragover', e)
          
		  // allows us to drop
          if (e.preventDefault) e.preventDefault();
          //this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener('dragenter', function(e) {
    	  console.log('dragenter', e)
    	  
          //this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener('dragleave', function(e) {
    	  console.log('dragleave', e)
    	  
          //this.classList.remove('over');
          return false;
        },
        false
      );
      
      el.addEventListener('drop', function(e) {
    	  console.log('drop', e)
		  
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();
          
          //this.classList.remove('over');
          
          var binId = this.id;
          //var item = document.getElementById(e.dataTransfer.getData('Text'));
          //this.appendChild(item);
          
          // call the passed drop function
          scope.$apply(function(scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {            
              fn(84756876, binId);
            }
          });
          
          return false;
        },
        false
      );
    }
  }
})
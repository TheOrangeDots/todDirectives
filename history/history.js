angular.module('todHistory',['servoy'])
.factory("todHistory",function($services) {
	var internalHistoryStack = []
	
	var scope = $services.getServiceScope('todHistory');
	return {
		pushState: function(state, title, url) {
			if (url === window.location.pathname) {
				return
			}
			
			internalHistoryStack.push({
				state: state,
				title: title,
				url: url
			})
			history.pushState(internalHistoryStack.length - 1, title, url) //TODO: what if not all params are passed? Can spread be used here?
		},
		replaceState: function(state, title, url) {
			if (url === window.location.pathname) {
				return
			}
			
			var entry = internalHistoryStack[internalHistoryStack.length - 1]
			entry.state = state
			entry.title = title
			entry.url = url
			history.replaceState(internalHistoryStack.length - 1, title, url)
		},
		back: function() {
			history.back()
		},
		forward: function() {
			history.forward()
		}
	}
})
.run(function($rootScope,$services) {
	var scope = $services.getServiceScope('todHistory')
	scope.$watch('model', function(newvalue,oldvalue) {
	// handle state changes
		//console.log(newvalue)
}, true);
})
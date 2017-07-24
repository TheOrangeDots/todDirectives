{
	"name": "tod-history",
	"displayName": "history",
	"version": 1,
 	"definition": "tod/history/history.js",
	"libraries": [],
	"model":
	{
 	},
 	"api":
 	{
	   	"pushState": 
	   	{
	    	"parameters":
	    	[
		    	{
					"name":"stateObject",
					"type":"object"
				}, {
					"name":"title",
					"type":"string"
				}, {
					"name":"url",
					"type":"string"
				}
			]
		},
		"replaceState": 
	   	{
	    	"parameters":
	    	[
		    	{
					"name":"stateObject",
					"type":"object"
				}, {
					"name":"title",
					"type":"string"
				}, {
					"name":"url",
					"type":"string"
				}
			]
		},
		"back": {},
		"forward": {}
 	}
}
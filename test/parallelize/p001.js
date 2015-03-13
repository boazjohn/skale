#!/usr/local/bin/node --harmony

// parallelize --> collect

var co = require('co');
var ugrid = require('../../lib/ugrid-context.js')();

process.on("exit", function () {console.assert(ugrid.grid.id !== undefined);});

co(function *() {
	yield ugrid.init();

	var v = [1, 2, 3, 4, 5];
	var dist = yield ugrid.parallelize(v).collect();

	console.assert(JSON.stringify(dist) == JSON.stringify(v));

	ugrid.end();
})();

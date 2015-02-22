#!/usr/local/bin/node --harmony

// Test randomSVMData -> mapValues -> reduce

var co = require('co');
var ugrid = require('../../lib/ugrid-context.js')();
var ml = require('../../lib/ugrid-ml.js');

function arrayEqual(a1, a2) {
	return JSON.stringify(a1) == JSON.stringify(a2);
}

co(function *() {
	yield ugrid.init();

	function x2(v) {
		return v * 2;
	}

	function sum(a, b) {
		a[1] += b[1];
		return a;
	}

	var N = 5, D = 1, seed = 1;
	var ref = ml.randomSVMData(N, D, seed);

	for (var i = 0; i < ref.length; i++)
		ref[i][1] = x2(ref[i][1]);

	ref = ref.reduce(sum, [0, 0]);

	var res = yield ugrid.randomSVMData(N, D, seed).mapValues(x2).reduce(sum, [0, 0]);
	console.assert(arrayEqual(ref.sort(), res.sort()));

	ugrid.end();
})();

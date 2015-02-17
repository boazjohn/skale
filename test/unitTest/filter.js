#!/usr/local/bin/node --harmony

var co = require('co');
var assert = require('assert');
var ugrid = require('../../lib/ugrid-context.js')();
var ml = require('../../lib/ugrid-ml.js');

co(function *() {
	yield ugrid.init();

	function positive(n) {return (n > 0) ? true : false;}

	var rng = new ml.Random();
	var N = 10;
	var a = rng.randn(N);
	var b = a.filter(positive);

	var dist = yield ugrid.parallelize(a).filter(positive).collect();

	console.log(b);
	console.log(dist)

	assert (dist.length == b.length)

	for (var i = 0; i < b.length; i++)
		assert (b[i] == dist[i])

	ugrid.end();
})();

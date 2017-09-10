/*
* @Author: ranran
* @Date:   2017-09-09 15:33:42
* @Last Modified by:   ranran
* @Last Modified time: 2017-09-09 15:47:37
*/
function getRandom(a, b) {
	return (Math.random()*(b - a) + a)
}

var value = getRandom(-10, 5);

console.log(value);
module.exports = function (p0, p1, s) {
	let a = p0[1] - p1[1];
	let b = p1[0] - p0[0];
	let c = p0[0]*p1[1] - p1[0]*p0[1];

	let denominator = (Math.pow(a, 2) + Math.pow(b, 2));
  
  	let x = (b*(b*s[0] - a*s[1]) - a*c) / denominator;
  	let y = (a*(-b*s[0] + a*s[1]) - b*c) / denominator;

  	return [x, y]
}
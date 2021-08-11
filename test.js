// var name = 'zero';
// function outer() {
// 	console.log('외부', name);
// 	function inner() {
// 		var enemy = 'nero';
// 		console.log('내부', name);
// 	}
// 	inner();
// }
// outer();
// console.log(enemy); // enemy is not defined

console.log("시작");

setTimeout(function(){
    console.log("3초후 실행");
}, 3000);

console.log("끝");
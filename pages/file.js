var fs = require('fs');
fs.readFile('~/slider/nodejs.md',function(err, file){
	console.log('读取文件完成')
});
console.log('发起读取文件');

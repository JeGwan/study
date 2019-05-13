const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
	console.log(req.method, req.url);
	const filePath = req.url.slice(1) || 'node3.html';
	fs.readFile(filePath, (err, data) => {
		if (err) {
			console.log(err);
			res.writeHead(404, {
				'Content-Type': 'text/html'
			});
		} else {
			res.writeHead(200, {
				'Content-Type': 'text/html'
			});
			res.write(data.toString());
		}
		res.end();
	});
}).listen(3000);
console.log("3000 포트에서 서버 실행중");
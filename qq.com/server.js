let http = require("http");
let fs = require("fs");
let url = require("url");
let port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

let server = http.createServer(function (request, response) {
  let parsedUrl = url.parse(request.url, true);
  let pathWithQuery = request.url;
  let queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  let path = parsedUrl.pathname;
  let query = parsedUrl.query;
  let method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  if (path === "/index.html") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(fs.readFileSync("./public/index.html"));
    response.end();
  } else if (path === "/qq.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(fs.readFileSync("./public/qq.js"));
    response.end();
  } else if (path === "/friends.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/json;charset=utf-8");
    response.setHeader("Access-Control-Allow-Origin", "http://hacker.com:9999");
    response.write(fs.readFileSync("./public/friends.json"));
    response.end();
  } else if (path === "/friends.js") {
    // json 定向分享给来自制定域名的请求
    if (request.headers["referer"].indexOf("http://hacker.com:9999") === 0) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/javascript;charset=utf-8");
      response.setHeader(
        "Access-Control-Allow-Origin",
        "http://hacker.com:9999"
      );
      // 拿到JS内容
      const string = `window[{{name}}]({{data}})`;
      // 拿到数据
      const data = fs.readFileSync("./public/friends.json").toString();
      // 把数据填到JS里面
      const string2 = string
        .replace("{{data}}", data)
        .replace("{{name}}", query.callback);
      response.write(string2);
      response.end();
    } else {
      response.statusCode = 404;
      response.end;
    }
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你访问的页面不存在`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);

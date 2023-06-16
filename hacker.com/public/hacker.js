// const request = new XMLHttpRequest();
//
// request.open("GET", "http://qq.com:8888/friends.json");
// request.onreadystatechange = () => {
//   if (request.status === 200 && request.readyState === 4) {
//     console.log(request.response);
//   }
// };
//
// request.send();

// JSONP 演示
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    window[random] = (data) => {
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = `${url}?callback=${random}`;
    document.body.appendChild(script);
    // 令页面没有多余的标签
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    };
  });
}

jsonp("http://qq.com:8888/friends.js").then((data) => console.log(data));

const request = new XMLHttpRequest();

request.open("GET", "http://qq.com:8888/friend.json");
request.onreadystatechange = () => {
  if (request.status === 200 && request.readyState === 4) {
    console.log(request.response);
  }
};

request.send();

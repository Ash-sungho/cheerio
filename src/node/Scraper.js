const axios = require("axios");
const http = require("http");
const cheerio = require("cheerio");
const url = require("url");

const fetchScrap = ({ url }) => {
  return axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        const title = $("title").text();
        console.log("Page Title:", title);
        // console.log("res : ", res);
        return { title: title };
      }
    })
    .catch((e) => {
      console.log("axiosErr : ", e);
    });
};

const app = http.createServer(async (request, response) => {
  const requestUrl = request.url;
  const queryData = url.parse(requestUrl, true).query;
  const { keyword } = queryData;

  // CORS 헤더 설정
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  // Preflight 요청 처리
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }
  console.log("requestUrl :: ", requestUrl);
  console.log("queryData :: ", queryData);
  // 실제 요청 처리
  const data = await fetchScrap({ url: keyword });
  console.log("fetchScrap data :: ", data);
  response.end(JSON.stringify(data));
});

app.listen(9999, () => {
  console.log("9999 포트에서 대기중..");
});

const http = require("http");
const url = require("url");
const Scrapping = require("./Puppeteer");

const app = http.createServer(async (request, response) => {
  try {
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
    console.log("queryData :: ", queryData);
    // 실제 요청 처리
    const data = await Scrapping({ armorName: keyword });
    response.end(JSON.stringify(data));
  } catch (error) {
    console.log("error :", error);
    response.writeHead(400);
    response.end(JSON.stringify(error));
  }
});

app.listen(9999, () => {
  console.log("9999 포트에서 대기중..");
});

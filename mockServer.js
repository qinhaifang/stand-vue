/**
 * 请用yarn或npm自行下载安装包
 * 安装包包括 yarn add / npm install
 * 	express （--save-dev）
 *	mockjs（--save-dev）
 */
let express = require("express"); // 引入express
let Mock = require("mockjs"); // 引入mock
let app = express(); // 实例化express

// attendance/mbo/index 写自己的请求地址
app.use("/attendance/mbo/index", function(req, res) {
  res.json(
    Mock.mock({
      rspCode: "0",
      "data|1-3": [
        {
          "key|+1": 1,
          "des|1": ["这是描述"],
          "info|1": ["mock测试数据1", "mock测试数据2"]
        }
      ]
    })
  );
});

app.listen("8090", () => {
  console.log("监听端口 8090");
});

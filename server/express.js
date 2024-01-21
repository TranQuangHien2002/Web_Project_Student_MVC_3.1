//Đây là một tệp cấu hình Express, một khung làm việc phía máy chủ phổ biến trong Node.js.


// Đoạn mã này import module Express.
const express = require("express");
// Đoạn mã này import module CORS (Cross-Origin Resource Sharing), cho phép hoặc từ chối các yêu cầu từ các nguồn khác nhau.
const cors = require("cors");


const studentRoutes = require("./routes/student.routes"); // Import các route liên quan đến sinh viên từ tệp student.routes.js.
const loginRoutes = require("./routes/login.routes"); //Import các route liên quan đến đăng nhập từ tệp login.routes.js.
const roomRoutes = require("./routes/room.routes"); //Import các route liên quan đến phòng từ tệp room.routes.js.


const app = express(); //Khởi tạo một ứng dụng Express mới.


app.use(cors()); // Sử dụng middleware CORS trên ứng dụng, cho phép các yêu cầu từ tất cả các nguồn.
app.use(express.json()); //: Sử dụng middleware express.json() để phân tích cú pháp các yêu cầu có body dạng JSON.


app.use("/api/students", studentRoutes); //Khi có yêu cầu đến /api/students, ứng dụng sẽ sử dụng các route từ studentRoutes.
app.use("/api/logins", loginRoutes);//Khi có yêu cầu đến /api/logins, ứng dụng sẽ sử dụng các route từ loginRoutes.
app.use("/api/rooms", roomRoutes);//Khi có yêu cầu đến /api/rooms, ứng dụng sẽ sử dụng các route từ roomRoutes.


module.exports = app;// Xuất ứng dụng Express để có thể sử dụng ở các tệp khác.


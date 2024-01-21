//Đây là một module trong Node.js định nghĩa các route liên quan đến đăng nhập và đăng ký.


const express = require("express"); //Import module Express.
const router = express.Router();//Tạo một đối tượng router mới từ Express.
const userController = require("../controllers/login.controller"); //Import userController từ tệp login.controller.js trong thư mục controllers. userController là một đối tượng có các phương thức signup và login.

//Định nghĩa một route POST tới "/signup". 
//Khi có yêu cầu POST tới "/signup", phương thức signup của userController sẽ được gọi.
router.post("/signup", userController.signup);
//Định nghĩa một route POST tới "/login". 
//Khi có yêu cầu POST tới "/login", phương thức login của userController sẽ được gọi.
router.post("/login", userController.login);

module.exports = router; //Xuất đối tượng router để có thể sử dụng ở các module khác.
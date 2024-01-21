//Tệp room.routes.js này định nghĩa các route (đường dẫn) cho các yêu cầu HTTP liên quan đến đối tượng Room. 
//Mỗi route sẽ được xử lý bởi một hàm tương ứng trong roomController, được import từ tệp room.controller.js.


const express = require("express"); // Import module Express.js, một framework cho Node.js
const roomController = require("../controllers/room.controller.js"); // Import roomController từ tệp room.controller.js.

const router = express.Router(); //Tạo một đối tượng router mới từ Express.js để định nghĩa các route.

// Định nghĩa một route GET. Khi nhận được một yêu cầu HTTP GET đến đường dẫn /:userId, nó sẽ gọi hàm getByUserId trong roomController.
router.get("/:userId", roomController.getByUserId);
//Định nghĩa một route GET khác. Khi nhận được một yêu cầu HTTP GET đến đường dẫn /, nó sẽ gọi hàm getAllRoom trong roomController.
router.get("/", roomController.getAllRoom);
//Định nghĩa một route POST. Khi nhận được một yêu cầu HTTP POST đến đường dẫn /create/:userId, nó sẽ gọi hàm createRoomWithUserId trong roomController.
router.post("/create/:userId", roomController.createRoomWithUserId);
//Định nghĩa một route POST khác. Khi nhận được một yêu cầu HTTP POST đến đường dẫn /create, nó sẽ gọi hàm createRoom trong roomController.
router.post("/create", roomController.createRoom);
//Định nghĩa một route PUT. Khi nhận được một yêu cầu HTTP PUT đến đường dẫn /update/:id, nó sẽ gọi hàm updateRoom trong roomController.
router.put("/update/:id", roomController.updateRoom);
//Định nghĩa một route DELETE. Khi nhận được một yêu cầu HTTP DELETE đến đường dẫn /:id, nó sẽ gọi hàm deleteRoom trong roomController.
router.delete("/:id", roomController.deleteRoom);

module.exports = router;//Xuất router để có thể sử dụng ở các module khác


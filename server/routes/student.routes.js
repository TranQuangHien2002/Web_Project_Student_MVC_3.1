// Tệp student.routes.js này định nghĩa các route (đường dẫn) cho các yêu cầu HTTP liên quan đến đối tượng Student.
// Mỗi route sẽ được xử lý bởi một hàm tương ứng trong studentController, được import từ tệp student.controller.js.

const express = require("express"); //Import module Express.js, một framework cho Node.js.

const studentController = require("../controllers/student.controller"); //Import studentController từ tệp student.controller.js.

const router = express.Router();//Tạo một đối tượng router mới từ Express.js để định nghĩa các route.

router.get("/:userId", studentController.getByUserId); //Định nghĩa một route GET. Khi nhận được một yêu cầu HTTP GET đến đường dẫn /:userId, nó sẽ gọi hàm getByUserId trong studentController.
router.get("/", studentController.getAllStudents); //Định nghĩa một route GET khác. Khi nhận được một yêu cầu HTTP GET đến đường dẫn /, nó sẽ gọi hàm getAllStudents trong studentController.
router.post("/create/:userId", studentController.createStudentWithUserId); //Định nghĩa một route POST. Khi nhận được một yêu cầu HTTP POST đến đường dẫn /create/:userId, nó sẽ gọi hàm createStudentWithUserId trong studentController.
router.post("/create", studentController.createStudent); //Định nghĩa một route POST khác. Khi nhận được một yêu cầu HTTP POST đến đường dẫn /create, nó sẽ gọi hàm createStudent trong studentController.
router.put("/update/:id", studentController.updateStudent); //Định nghĩa một route PUT. Khi nhận được một yêu cầu HTTP PUT đến đường dẫn /update/:id, nó sẽ gọi hàm updateStudent trong studentController.
router.delete("/:id", studentController.deleteStudent); // Định nghĩa một route DELETE. Khi nhận được một yêu cầu HTTP DELETE đến đường dẫn /:id, nó sẽ gọi hàm deleteStudent trong studentController.

module.exports = router;// Xuất router để có thể sử dụng ở các module khác.
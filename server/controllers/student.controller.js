//Tệp student.controller.js này định nghĩa các hàm xử lý yêu cầu HTTP liên quan đến đối tượng Student. 
//Mỗi hàm sẽ gọi một phương thức tương ứng của lớp Student để tương tác với cơ sở dữ liệu

//Import lớp Student từ tệp student.model.js.
const Student = require("../models/student.model");

//Hàm này xử lý yêu cầu HTTP GET để lấy tất cả sinh viên. 
//Nó gọi phương thức getAll của lớp Student và gửi kết quả trả về như là phần body của phản hồi HTTP.
exports.getAllStudents = (req, res) => {
    Student.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieving students." });
        else res.send(data);
    });
};
//Hàm này xử lý yêu cầu HTTP POST để tạo một sinh viên mới. 
//Nó tạo một đối tượng Student mới từ dữ liệu trong body của yêu cầu HTTP, 
//sau đó gọi phương thức create của lớp Student để thêm sinh viên mới vào cơ sở dữ liệu
exports.createStudent = (req, res) => {
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        classname: req.body.classname
    });

    Student.create(student, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Student." });
        else res.send(data);
    });
};
//Hàm này xử lý yêu cầu HTTP PUT để cập nhật thông tin của một sinh viên.
// Nó lấy ID của sinh viên từ tham số trong URL của yêu cầu HTTP, 
// sau đó gọi phương thức updateById của lớp Student để cập nhật thông tin của sinh viên trong cơ sở dữ liệu.
exports.updateStudent = (req, res) => {
    const id_student = req.params.id;

    Student.updateById(id_student, new Student(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") res.status(404).send({ message: `Not found Student with id_student ${id_student}.` });
            else res.status(500).send({ message: "Error updating Student with id_student " + id_student });
        } else res.send(data);
    });
};
// Hàm này xử lý yêu cầu HTTP DELETE để xóa một sinh viên. 
// Nó lấy ID của sinh viên từ tham số trong URL của yêu cầu HTTP, 
//sau đó gọi phương thức remove của lớp Student để xóa sinh viên từ cơ sở dữ liệu.
exports.deleteStudent = (req, res) => {
    const id_student = req.params.id;

    Student.remove(id_student, (err, data) => {
        if (err) {
            if (err.kind === "not_found") res.status(404).send({ message: `Not found Student with id_student ${id_student}.` });
            else res.status(500).send({ message: "Could not delete Student with id_student " + id_student });
        } else res.send({ message: `Student was deleted successfully!` });
    });
};
//Hàm này xử lý yêu cầu HTTP GET để lấy tất cả sinh viên của một người dùng. 
//Nó lấy ID của người dùng từ tham số trong URL của yêu cầu HTTP,
// sau đó gọi phương thức getByUserId của lớp Student để lấy sinh viên từ cơ sở dữ liệu
exports.getByUserId = (req, res) => {
    Student.getByUserId(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Student with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

//Hàm này xử lý yêu cầu HTTP POST để tạo một sinh viên mới cho một người dùng. 
//Nó tạo một đối tượng Student mới từ dữ liệu trong body của yêu cầu HTTP, 
//sau đó gọi phương thức createWithUserId của lớp Student để thêm sinh viên mới vào cơ sở dữ liệu.
exports.createStudentWithUserId = (req, res) => {
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        classname: req.body.classname,
    });

    Student.createWithUserId(student, req.params.userId, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Student." });
        else res.send(data);
    });
};
module.exports = exports; //Xuất các hàm xử lý yêu cầu HTTP để có thể sử dụng ở các module khác.
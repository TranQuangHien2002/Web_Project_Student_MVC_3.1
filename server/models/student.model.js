//Đây là một module trong Node.js định nghĩa một lớp Student với các phương thức tương tác với cơ sở dữ liệu thông qua module sql được import từ tệp config.js.

//Import module sql từ tệp config.js trong thư mục config. 
//Module sql này chứa các phương thức để tương tác với cơ sở dữ liệu.
const sql = require("../config/config.js");

//Định nghĩa một lớp Student với ba thuộc tính: name, email và classname. 
//Cả ba thuộc tính này đều được lấy từ đối số student truyền vào khi tạo một đối tượng mới của lớp Student.
const Student = function(student) {
    this.name = student.name;
    this.email = student.email;
    this.classname = student.classname;
};

//Phương thức getAll thực thi câu truy vấn SQL "SELECT * FROM student" để lấy tất cả các sinh viên từ cơ sở dữ liệu.\
// Kết quả trả về từ cơ sở dữ liệu sẽ được truyền vào hàm callback result.
Student.getAll = result => {
    sql.query("SELECT * FROM student ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("students: ", res);
        result(null, res);
    });
};
//Phương thức create thực thi câu truy vấn SQL "INSERT INTO student SET ?" để tạo một sinh viên mới trong cơ sở dữ liệu.
// Đối số newStudent chứa thông tin của sinh viên cần tạo.
Student.create = (newStudent, result) => {
    sql.query("INSERT INTO student SET ?", newStudent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created student: ", { id_student: res.insertId, ...newStudent });
        result(null, { id_student: res.insertId, ...newStudent });
    });
};
//Phương thức updateById thực thi câu truy vấn SQL "UPDATE student SET name = ?, email = ?, classname = ? WHERE id_student = ?" để cập nhật thông tin của một sinh viên dựa trên id_student. 
//Đối số student chứa thông tin mới cần cập nhật.
Student.updateById = (id_student, student, result) => {
    sql.query(
        "UPDATE student SET name = ?, email = ?, classname = ? WHERE id_student = ?",
        [student.name, student.email, student.classname, id_student],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated student: ", { id_student: id_student, ...student });
            result(null, { id_student: id_student, ...student });
        }
    );
};
//Phương thức remove thực thi câu truy vấn SQL "DELETE FROM student WHERE id_student = ?" để xóa một sinh viên dựa trên id_student.
Student.remove = (id_student, result) => {
    sql.query("DELETE FROM student WHERE id_student = ?", id_student, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted student with id_student: ", id_student);
        result(null, res);
    });
};
//Phương thức getByUserId thực thi câu truy vấn SQL "SELECT * FROM student WHERE id = ?" để lấy tất cả các sinh viên của một người dùng dựa trên userId.
Student.getByUserId = (userId, result) => {
    sql.query("SELECT * FROM student WHERE id = ?", [userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("students: ", res);
        result(null, res);
    });
};
//Phương thức createWithUserId thực thi câu truy vấn SQL "INSERT INTO student SET ?" để tạo một sinh viên mới cho một người dùng dựa trên userId. 
//Đối số newStudent chứa thông tin của sinh viên cần tạo
Student.createWithUserId = (newStudent, userId, result) => {
    newStudent.ID = parseInt(userId);
    sql.query("INSERT INTO student SET ?", newStudent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created student: ", { id_student: res.insertId, ...newStudent });
        result(null, { id_student: res.insertId, ...newStudent });
    });
};
module.exports = Student; // Xuất lớp Student để có thể sử dụng ở các module khác.

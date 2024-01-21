// server/models/User.js
//Đây là một module trong Node.js định nghĩa một lớp User với hai phương thức tĩnh: createUser và findUserByEmailAndPassword. 
//Cả hai phương thức này đều tương tác với cơ sở dữ liệu thông qua module db được import từ tệp config.js.
const db = require("../config/config"); //Import module db từ tệp config.js trong thư mục config.

//Định nghĩa một lớp User. Lớp này sẽ có các phương thức tương tác với cơ sở dữ liệu.
class User {
  //Phương thức tĩnh createUser nhận vào tên, email, mật khẩu và một hàm callback. 
  //Nó tạo một câu truy vấn SQL để chèn một người dùng mới vào bảng user trong cơ sở dữ liệu, 
  //sau đó thực thi câu truy vấn này thông qua db.query().
  static createUser(name, email, password, callback) {
    const sqlInsert = "INSERT INTO user (name, email, password) VALUES (?)";
    const values = [name, email, password];
    db.query(sqlInsert, [values], callback);
  }
  //Phương thức tĩnh findUserByEmailAndPassword nhận vào email, mật khẩu và một hàm callback. 
  //Nó tạo một câu truy vấn SQL để tìm một người dùng trong bảng user có email và mật khẩu tương ứng, 
  //sau đó thực thi câu truy vấn này thông qua db.query().
  static findUserByEmailAndPassword(email, password, callback) {
    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    db.query(sql, [email, password], callback);
  }
}

module.exports = User; //Xuất lớp User để có thể sử dụng ở các module khác.
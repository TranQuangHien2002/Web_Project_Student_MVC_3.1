// server/controllers/login.controller.js
//Đây là một module trong Node.js định nghĩa hai hàm: signup và login, 
//được xuất ra như các phương thức của một đối tượng. 
//Cả hai hàm này đều tương tác với cơ sở dữ liệu thông qua lớp User được import từ tệp login.model.js.


// Import lớp User từ tệp login.model.js trong thư mục models.
const User = require("../models/login.model");

//Định nghĩa hàm signup nhận vào hai đối số: req (yêu cầu từ client) và res (đối tượng phản hồi). H
//àm này sử dụng phương thức createUser của lớp User để tạo một người dùng mới với tên, email và mật khẩu lấy từ req.body. Nếu có lỗi, nó sẽ trả về JSON "Error", nếu không, nó sẽ trả về dữ liệu từ cơ sở dữ liệu
exports.signup = (req, res) => {
  User.createUser(req.body.name, req.body.email, req.body.password, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
};

//Định nghĩa hàm login nhận vào hai đối số: req (yêu cầu từ client) và res (đối tượng phản hồi).
// Hàm này sử dụng phương thức findUserByEmailAndPassword của lớp User để tìm người dùng với email và mật khẩu lấy từ req.body.
// Nếu có lỗi, nó sẽ trả về JSON "Error".
// Nếu tìm thấy người dùng, nó sẽ trả về JSON với trạng thái "Success" và ID của người dùng. 
//Nếu không tìm thấy người dùng, nó sẽ trả về JSON "Fail".
exports.login = (req, res) => {
  User.findUserByEmailAndPassword(req.body.email, req.body.password, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json({ status: "Success", userId: data[0].ID }); // return user ID
    } else {
      return res.json("Fail");
    }
  });
};
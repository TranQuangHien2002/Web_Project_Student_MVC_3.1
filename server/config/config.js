//Đây là một module trong Node.js định nghĩa kết nối đến cơ sở dữ liệu MySQL.


const mysql = require("mysql"); //Import module MySQL.

//Tạo một kết nối đến cơ sở dữ liệu MySQL. 
//Thông tin kết nối bao gồm host (localhost), tên người dùng (root), mật khẩu (27102002), và tên cơ sở dữ liệu (loginCRUD22).
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "27102002",
    database: "loginCRUD22",
});

//Mở kết nối đến cơ sở dữ liệu. Nếu có lỗi, nó sẽ ném lỗi đó. 
//Nếu không, nó sẽ in ra thông báo "Successfully connected to the database.".
db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = db; // Xuất đối tượng db (kết nối đến cơ sở dữ liệu) để có thể sử dụng ở các module khác.
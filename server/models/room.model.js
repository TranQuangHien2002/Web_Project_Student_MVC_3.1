//Đây là một module trong Node.js định nghĩa một lớp Room với các phương thức tương tác với cơ sở dữ liệu thông qua module sql được import từ tệp config.js.

//Import module sql từ tệp config.js trong thư mục config. Module sql này chứa các phương thức để tương tác với cơ sở dữ liệu.
const sql = require("../config/config.js");

//Định nghĩa một lớp Room với hai thuộc tính: name và infor. Cả hai thuộc tính này đều được lấy từ đối số room truyền vào khi tạo một đối tượng mới của lớp Room.
const Room = function(room) {
    this.name = room.name;
    this.infor = room.infor;
};
//Phương thức getAll thực thi câu truy vấn SQL "SELECT * FROM room" để lấy tất cả các phòng từ cơ sở dữ liệu. Kết quả trả về từ cơ sở dữ liệu sẽ được truyền vào hàm callback result.
Room.getAll = result => {
    sql.query("SELECT * FROM room", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("classs: ", res);
        result(null, res);
    });
};
//Phương thức create thực thi câu truy vấn SQL "INSERT INTO room SET ?" để tạo một phòng mới trong cơ sở dữ liệu. Đối số newRoom chứa thông tin của phòng cần tạo.
Room.create = (newRoom, result) => {
    sql.query("INSERT INTO room SET ?", newRoom, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            console.log("error: ", err);
            return;
        }

        console.log("created room: ", { id_room: res.insertId, ...newRoom });
        result(null, { id_room: res.insertId, ...newRoom });
    });
}
//Phương thức updateById thực thi câu truy vấn SQL "UPDATE room SET name = ?, infor = ? WHERE id_room = ?" để cập nhật thông tin của một phòng dựa trên id_room. 
//Đối số room chứa thông tin mới cần cập nhật.
Room.updateById = (id_room, room, result) => {
    sql.query(
        "UPDATE room SET name = ?, infor = ? WHERE id_room = ?",
        [room.name, room.infor, id_room],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                console.log("error: ", err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                console.log("error: ", err);
                return;
            }
            console.log("updated room: ", { id_room: id_room, ...room });
            result(null, { id_room: id_room, ...room });
        }
    );
}
//Phương thức remove thực thi câu truy vấn SQL "DELETE FROM room WHERE id_room = ?" để xóa một phòng dựa trên id_room.
Room.remove = (id_room, result) => {
    sql.query("DELETE FROM room WHERE id_room = ?", id_room, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            console.log("error: ", err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            console.log("error: ", err);
            return;
        }

        console.log("deleted room with id_room: ", id_room);
        result(null, res);
    });
}
// Phương thức getByUserId thực thi câu truy vấn SQL "SELECT * FROM room WHERE id = ?" để lấy tất cả các phòng của một người dùng dựa trên userId.
Room.getByUserId = (userId, result) => {
    sql.query("SELECT * FROM room WHERE id = ?", [userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("rooms: ", res);
        result(null, res);
    });
};
//Phương thức createWithUserId thực thi câu truy vấn SQL "INSERT INTO room SET ?" để tạo một phòng mới cho một người dùng dựa trên userId. Đối số newRoom chứa thông tin của phòng cần tạo.
Room.createWithUserId = (newRoom, userId, result) => {
    newRoom.ID = parseInt(userId);
    sql.query("INSERT INTO room SET ?", newRoom, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created room: ", { id_room: res.insertId, ...newRoom });
        result(null, { id_room: res.insertId, ...newRoom });
    });
};
module.exports = Room; //Xuất lớp Room để có thể sử dụng ở các module khác.


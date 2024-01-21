//Tệp room.controller.js này chứa các hàm xử lý yêu cầu HTTP liên quan đến đối tượng Room. 
//Các hàm này sẽ tương tác với cơ sở dữ liệu thông qua các phương thức của lớp Room được định nghĩa trong tệp room.model.js


const Room = require("../models/room.model.js"); // Import lớp Room từ tệp room.model.js.

// Hàm này xử lý yêu cầu HTTP GET để lấy tất cả các phòng.
// Nó sử dụng phương thức getAll của lớp Room để lấy tất cả các phòng từ cơ sở dữ liệu
exports.getAllRoom = (req, res) => {
    Room.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieving class." });
        else res.send(data);
    });
};

//Hàm này xử lý yêu cầu HTTP POST để tạo một phòng mới. 
//Nó tạo một đối tượng Room mới từ dữ liệu trong body của yêu cầu, 
//sau đó sử dụng phương thức create của lớp Room để thêm phòng mới vào cơ sở dữ liệu.
exports.createRoom = (req, res) => {
    const room = new Room({
        name: req.body.name,
        infor: req.body.infor
    });

    Room.create(room, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Room." });
        else res.send(data);
    });
}

//Hàm này xử lý yêu cầu HTTP PUT để cập nhật thông tin của một phòng. 
//Nó lấy ID của phòng từ tham số của yêu cầu, tạo một đối tượng Room mới từ dữ liệu trong body của yêu cầu, 
//sau đó sử dụng phương thức updateById của lớp Room để cập nhật thông tin của phòng trong cơ sở dữ liệu.
exports.updateRoom = (req, res) => {
    const id_room = req.params.id;
    Room.updateById(id_room, new Room(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") res.status(404).send({ message: `Not found Room with id_room ${id_room}.` });
            else res.status(500).send({ message: "Error updating Room with id_room " + id_room });
        } else res.send(data);
    }
    );
};
//Hàm này xử lý yêu cầu HTTP DELETE để xóa một phòng. 
//Nó lấy ID của phòng từ tham số của yêu cầu,
// sau đó sử dụng phương thức remove của lớp Room để xóa phòng từ cơ sở dữ liệu.
exports.deleteRoom = (req, res) => {
    const id_room = req.params.id; //Lấy ID của phòng từ tham số trong URL của yêu cầu HTTP

    Room.remove(id_room, (err, data) => {
        if (err) {
            if (err.kind === "not_found") res.status(404).send({ message: `Not found Room with id_room ${id_room}.` });
            else res.status(500).send({ message: "Could not delete Room with id_room " + id_room });
        } else res.send({ message: `Room was deleted successfully!` });
    });
}

//Hàm này xử lý yêu cầu HTTP GET để lấy tất cả các phòng của một người dùng. 
//Nó lấy ID của người dùng từ tham số của yêu cầu, 
//sau đó sử dụng phương thức getByUserId của lớp Room để lấy tất cả các phòng của người dùng từ cơ sở dữ liệu.
exports.getByUserId = (req, res) => {
    Room.getByUserId(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Room with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Room with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};
//Hàm này xử lý yêu cầu HTTP POST để tạo một phòng mới cho một người dùng. 
//Nó tạo một đối tượng Room mới từ dữ liệu trong body của yêu cầu, lấy ID của người dùng từ tham số của yêu cầu, 
//sau đó sử dụng phương thức createWithUserId của lớp Room để thêm phòng mới vào cơ sở dữ liệu.
exports.createRoomWithUserId = (req, res) => {
    const room = new Room({
        name: req.body.name,
        info: req.body.info,
    });

    Room.createWithUserId(room, req.params.userId, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Room." });
        else res.send(data);
    });
};
module.exports = exports; //Xuất tất cả các hàm xử lý yêu cầu HTTP này để có thể sử dụng ở các module khác.


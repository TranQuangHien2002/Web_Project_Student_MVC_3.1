//Đây là một đoạn mã JavaScript đơn giản để tạo một máy chủ web sử dụng Express, một khung làm việc phía máy chủ phổ biến trong Node.js


// Đoạn mã này import module Express từ file express.js trong cùng thư mục. 
// app là một đối tượng Express, được sử dụng để cấu hình và khởi chạy máy chủ.
const app = require("./express");

// Đặt cổng mà máy chủ sẽ lắng nghe là 8082.
const port = 8082;

// Đây là một route handler cho route gốc ("/"). 
// Khi một yêu cầu GET đến route này, máy chủ sẽ trả về một phản hồi JSON với nội dung là "Hello World!".
app.get("/", (req, res) => {
    res.json("Hello World!");
}); 

// Đoạn mã này khởi động máy chủ và làm cho nó lắng nghe các yêu cầu đến trên cổng đã được chỉ định. 
// Khi máy chủ bắt đầu chạy, nó sẽ in ra một thông báo cho biết máy chủ đang chạy trên cổng nào.
app.listen(port, () => {
    console.log(`Máy chủ đang chạy trên cổng ${port}`);
});
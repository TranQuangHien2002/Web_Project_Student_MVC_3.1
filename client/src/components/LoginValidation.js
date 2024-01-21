//Đây là một hàm Validation trong JavaScript, được sử dụng để kiểm tra tính hợp lệ của email và mật khẩu.

// Định nghĩa hàm Validation nhận vào một đối tượng values chứa các giá trị cần kiểm tra.
function Validation(values){
    let errors = {};//Tạo một đối tượng errors để lưu các lỗi tìm thấy.
    const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/; //Định nghĩa một biểu thức chính quy để kiểm tra tính hợp lệ của email.
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ hoa, chữ thường và số.

    if(values.email ===""){ 
        //Kiểm tra nếu email trống, thì thêm lỗi vào đối tượng errors
        errors.email = "Email is required";
    }else if(!email_pattern.test(values.email)){ 
        //Nếu email không trống nhưng không khớp với biểu thức chính quy, thì thêm lỗi vào đối tượng errors.
        errors.email = "Email is invalid";
    }else{
        errors.email = "";
    }   
    if(values.password ===""){
        //Kiểm tra nếu mật khẩu trống, thì thêm lỗi vào đối tượng errors.
        errors.password = "Password is required";  
    }else if(!password_pattern.test(values.password)){
        //Nếu mật khẩu không trống nhưng không khớp với biểu thức chính quy, thì thêm lỗi vào đối tượng errors.
        errors.password = "Password is invalid";
    } else{
        errors.password = "";
    }   
    return errors; //Trả về đối tượng errors chứa tất cả các lỗi tìm thấy.
}
export default Validation; //Xuất hàm Validation để có thể sử dụng ở các module khác.
import { toast } from "react-toastify";

export const getTax = (salaryTax) => {
    if (salaryTax <= 0) return 0; // Thêm kiểm tra trường hợp âm hoặc bằng 0
    switch (true) {
        case salaryTax <= 5:
            return 0.05 * salaryTax;
        case salaryTax <= 10:
            return 0.10 * salaryTax - 0.25;
        case salaryTax <= 18:
            return 0.15 * salaryTax - 0.75;
        case salaryTax <= 32:
            return 0.20 * salaryTax - 1.65;
        case salaryTax <= 52:
            return 0.25 * salaryTax - 3.25;
        case salaryTax <= 80:
            return 0.30 * salaryTax - 5.85;
        default:
            return 0.35 * salaryTax - 9.85; // Xử lý trường hợp lớn hơn 80
    }
};

export const getSalaryTax = (salary, num_dependent) => {
    if (salary < 0) {
        toast.warn("Lương cơ bản phải lớn hơn 0"); // Bảo vệ đầu vào
    }

    const _salary = salary / 1000000; // Chuyển sang triệu
    const deduction = 11 + num_dependent * 4.4; // Tính các khoản giảm trừ
    const salaryWithTax = Math.max(0, _salary - deduction); // Tránh giá trị âm
    const tax = getTax(salaryWithTax); // Tính thuế
    const total_salary = _salary - tax; // Tính lương thực nhận

    return {
        salary: salary, // Lương ban đầu
        deduction: deduction * 1000000, // Chuyển giảm trừ về VNĐ
        tax: Math.round(tax * 1000000), // Làm tròn thuế
        total_salary: Math.round(total_salary * 1000000) // Làm tròn lương thực nhận
    };
};

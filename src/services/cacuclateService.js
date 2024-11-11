
export const getTax = (salaryTax) => {
    switch (true) {
        case (salaryTax <= 5):
            return 0.05 * salaryTax;
        case (salaryTax > 5 && salaryTax <= 10):
            return 0.10 * salaryTax - 0.25;
        case (salaryTax > 10 && salaryTax <= 18):
            return 0.15 * salaryTax - 0.75;
        case (salaryTax > 18 && salaryTax <= 32):
            return 0.2 * salaryTax - 1.65;
        case (salaryTax > 32 && salaryTax <= 52):
            return 0.25 * salaryTax - 3.25;
        case (salaryTax > 52 && salaryTax <= 80):
            return 0.30 * salaryTax - 5.85;
        case (salaryTax > 80):
            return 0.35 * salaryTax - 9.85;
    }
}



export const getSalaryTax = (salary, num_dependent) => {
    const _salary = salary / 1000000;
    const deduction = 11 + num_dependent * 4.4;
    const salaryWithTax = _salary - deduction;
    const tax = getTax(salaryWithTax);
    const total_salary = _salary - tax;
    return {
        salary: salary,
        deduction: deduction * 1000000,
        tax: Math.round(tax * 1000000),
        total_salary: Math.round(total_salary * 1000000)
    }
}

import axiosConfig from "../axiosConfig";

//  tạo mới
export const apiCreateMonthSalary = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/salary/add',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


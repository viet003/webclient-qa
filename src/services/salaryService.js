import axiosConfig from "../axiosConfig";

//  lấy thông tin phòng ban
export const apiAllSalaries = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'get',
            url: 'api/salary',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// lấy toàn bộ
export const apiAllWithoutSalary= (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'get',
            url: 'api/employee/nosl',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


//  tạo mới
export const apiCreateSalary = (payload) => new Promise((resolve, reject) => {
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

//  sửa
export const apiUpdateSalary = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/salary/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

//  xóa
export const apiDeleteSalary = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/salary/delete',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

import axiosConfig from "../axiosConfig";

//  lấy thông tin người dùng
export const apiGetInfor = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/employee/id',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


//  lấy thông tin người dùng
export const apiUpdateInfor = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/employee/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


//  tạo mới
export const apiCreateDepartment = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/department/create',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

//  sửa
export const apiUpdateDepartment = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/department/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

//  xóa
export const apiDeleteDepartment = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/department/delete',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


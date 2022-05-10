import axios from 'axios';
const url = 'http://localhost:5000';


// Complaint API //
export const getAllComplaint = () => axios.get(`/complaint/getComplaints`);
export const createComplaint = (newComplaint)=> axios.post(`/complaint/addComplaint`, newComplaint);
export const updateComplaint = (id, updateComplaint) => axios.patch(`/complaint/updateComplaint/${id}`, updateComplaint);
export const deleteComplaint = (id) => axios.delete(`/complaint/deleteComplaint/${id}`);
export const getComplaintByUserId = (id) => axios.get(`/complaint/getComplaintByUserId/${id}`);
export const getComplaintByStatus = (status) => axios.get(`/complaint/getComplaintByStatus/${status}`);
export const getComplaintByUserIdAndStatus = (id,status) => axios.get(`/complaint/getComplaintByStatus/${id}/${status}`);
export const updateComplaintStatus = (id,etat) => axios.patch(`/complaint/update_status/${id}`,etat);
export const sendMessage = (id,msg) => axios.patch(`/complaint/send_msg/${id}`,msg);

// export const fetchProductById = (id)=> axios.get(`${url}/products/${id}`);
// export const smartFetchProduct = (pagination)=> axios.post(`${url}/products/page`, pagination);
// export const getNbPages=()=> axios.get(`${url}/products/page/1`);
export const getAllProducts = () => axios.get(`${url}/products/getjson`);

//update store verification
export const verifyStore = (id) => axios.patch(`${url}/store/api/verify/${id}`);
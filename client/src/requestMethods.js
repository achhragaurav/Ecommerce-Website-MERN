import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDgyZDEwZWMwZTdjMzg3NWU1OGU5NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTk5Mjg4OSwiZXhwIjoxNjQyMjUyMDg5fQ.M4e4MhZ4KHxdFn_GtViXdrjFcD10XCRcKqInHErHoCU";

export const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})
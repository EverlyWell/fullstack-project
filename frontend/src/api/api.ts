import axios from 'axios';

export interface LoginSuccessPayload {
    token: string,
    exp: string,
    username: string,
    cat_api_sub_id: string
}


const LogInOrCreateUserName = async (username : string, password : string) => {
    const API_URL = 'http://localhost:3010/api/auth/login';   
    try {
        const result  = await axios.post(API_URL, { username, password });
        return result.data;
    } catch (e) {
        console.log('error: ', e);
    }
};

export {
    LogInOrCreateUserName,
};
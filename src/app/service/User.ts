import api from "./api";

interface AuthProps{
    token: string;
    refresh_token: string;
}


class User{
    async auth(email: string, password: string): Promise<AuthProps>{
        try{
            const { data } = await api.post('/user/auth/token', {email: email, password: password})
            console.log(data);
            
            return data
        }catch(err){
            console.error("Deu erro Aqui");
            throw err
        }
    }
    async refresh(refresh_token: string): Promise<AuthProps>{
        try{
            const { data } = await api.post('/user/auth/refresh-token', {refresh_token: refresh_token}, { withCredentials: true })
            console.log(data);
            
            return data
        }catch(err){
            console.error("Deu erro Aqui");
            throw err
        }
    }
}

export default new User();
import api from "./api";

interface AuthProps{
    token: string;
    refresh_token: string;
}

interface UserProps{
	name: string
	email: string
	password: string
	role: string
	id: string
	created_at: string
	updated_at: string
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
    async createUser(email: string, name: string, password: string, role: string): Promise<UserProps>{
        try{
            const { data } = await api.post('/user', {email: email, name: name, password: password, role: role})
            console.log(data);
            
            return data
        }catch(err){
            console.error("Deu erro Aqui");
            throw err
        }
    }
}

export default new User();
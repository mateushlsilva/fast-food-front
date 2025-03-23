import apiBot from "./apiChatBot";

interface ChatBotProps{
    question: string;
    response: string;
}

interface HistoricProps{
    conversa: [];
    user_id: string;
}



class ChatBot{
    async conversar(question: string): Promise<ChatBotProps>{
        try{
            const { data } = await apiBot.post('/conversa', {question: question})
            console.log(data);
            
            return data
        }catch(err){
            console.error("Deu erro Aqui");
            throw err
        }
    }
    async conversaHistoric(): Promise<HistoricProps>{
        try{
            const { data } = await apiBot.get('/perfil')
            console.log(data);
            
            return data.historic
        }catch(err){
            console.log("Olha p erro: " + err);
            
            console.error("Deu erro Aqui");
            throw err
        }
    }
}

export default new ChatBot();
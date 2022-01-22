import express from "express"
import cors from "cors"

const server = express();
server.use(express.json());
server.use(cors());

const users = [];
const tweets = [];

server.post(`/sign-up`, (request, response) => {
    const userLogin = request.body;
    if((userLogin.username !== undefined && userLogin.username !== '') ||
     (userLogin.avatar !== undefined && userLogin.avatar !== '')){
        users.push(userLogin);
        response.send("Ok");
    }else{
        response.send("Todos os campos são obrigatórios");
        response.sendStatus(400);
    }
})

server.post(`/tweets`, (request, response) =>{
    tweets.unshift(request.body)
    response.send("Ok");
})

function findAvatar(lastTweets){
    const profileAvatar = users.find(userObject => {
        if(lastTweets.username === userObject.username){
            return userObject;
        }
    }) 
    return profileAvatar
}

server.get(`/tweets`, (request,response) =>{
    for(let i = 0; i < tweets.length; i++){
        const userAvatar = findAvatar(tweets[i]);
        tweets[i].avatar = userAvatar.avatar;
    }

    response.send(tweets.slice(0,10));
})


server.listen(5000, () => console.log("Servidor iniciado"));
import { WebSocketServer } from 'ws';
import { JWT_SECRET } from './config';

const wss = new WebSocketServer({port: 8080});

wss.on('connection', function connection(ws,request) {
    const url = request.url
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get('token');
    const deocded = jwt.verify(token,JWT_SECRET)

    if( !deocded || !deocded.userId){
        ws.close();
        return;
    }


    ws.on('message', function message(data) {
        ws.send('pong')
    })
});
import app from './app'
import config from './config/index'

const {PORT} = config

app.listen('7001', () => { 
    console.log(`Server started on Port ${PORT}`);
});

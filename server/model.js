/**
 * Created by 30113 on 2018/6/4.
 */
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/react-node-mongo'
mongoose.connect(DB_URL)

const models = {
    user: {
        user: {type: String, require: true},
        pwd:  {type: String, require: true},
        avatar: {type: String},
        desc: {type: String},
    },
}
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}
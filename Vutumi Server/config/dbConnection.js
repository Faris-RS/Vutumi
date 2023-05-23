import mongoose from "mongoose";

const connection = ()=>{
    // mongoose.connect('mongodb://0.0.0.0:27017/vutumi5')
    mongoose.connect('mongodb+srv://vutumi:0000@cluster0.beoalfy.mongodb.net/vutumi?retryWrites=true&w=majority')
}
mongoose.set('strictQuery', true);

export default connection
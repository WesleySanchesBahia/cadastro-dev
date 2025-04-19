import mongoose, {model} from "mongoose";


const DevSchema = mongoose.Schema(
    {
        githubUsername:{type:String},
        name: {type:String, required:true},
        avatarUrl:{type:String},
        email: {type:String},
        city: {type:String, required:true},
        education: {type:String},
        technologies: {type:String, required:true},
    }
);

const Dev = model("Dev", DevSchema);
export default Dev;
const mongoose=require("mongoose");

const ChildernSchema=new mongoose.Schema({
    name:String,
})

const ParentSchema=new mongoose.Schema({
    name:String,
    children:ChildernSchema
});

ParentSchema.pre("save",(next)=>{
    console.log("this document is going to be saved");
    next();
})

const child=new mongoose.model("children",ChildernSchema);
const parent=new mongoose.model("parent",ParentSchema);


const createcon=async()=>{
    await mongoose.connect("mongodb://localhost:27017/practice");
}

const savedoc=async function(){
   try {
    const c1=new child({
        name:"son of father"
    });
    const p1=new parent({
        name:"father of son",
        children:c1
    });
    await p1.save();
   } catch (error) {
       console.log(error);
   }
}

const findalldoc=async function(){
    const store=await parent.find();
    console.log(store);
}


createcon();
savedoc();
findalldoc();

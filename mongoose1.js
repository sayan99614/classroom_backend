const mongoose=require('mongoose');


const kittySchema=new mongoose.Schema({
    name:String
})


kittySchema.methods.speak=()=>{
    const greet=this.name?`my name is ${this.name} meooo`:`i don't have any name`;
    console.log(greet);
}

const model=mongoose.model('Kitten',kittySchema); 
const main=async()=>{
    await mongoose.connect("mongodb://localhost:27017/practice");
    // const cat=new model({name:"thunder"});
    // cat.speak();
    // await cat.save();
      
}

const find=async()=>{
    const result=await model.find();
    console.log(result);
}

main().catch(err=>console.log(err));
find().catch(err=>console.log(err));


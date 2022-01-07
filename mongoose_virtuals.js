const mongoose=require("mongoose");



const schema=new mongoose.Schema({
    name:String,
})


schema.virtual("fullname").get(function(){
    return this.name;
}).set(function(nm){
    this.name=nm;
})

const model=new mongoose.model("sampleperson",schema);


const createcon=async()=>{
    await mongoose.connect("mongodb://localhost:27017/practice");
}

const savedoc= async function(nmm){
    const dmn=new model();
    dmn.fullname=nmm;
    await dmn.save();

}

createcon();
savedoc("dheeman pati").catch((error)=>{console.log(error)});


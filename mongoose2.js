const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    _id:Number
});
const model =new mongoose.model("test",schema);

const createcon=async()=>{
    await mongoose.connect("mongodb://localhost:27017/practice");
}

const saveDoc=async(id)=>{
    try{
        const doc=new model();
        doc._id=id;
        await doc.save();
        console.log("saved successfully.");
    }catch(error){
        console.log("something went wrong");
    }
        

}

createcon();
saveDoc(2);
saveDoc(3);
saveDoc(4);
saveDoc(5);
let exp=require('express');
const admin = require('./firebase');

let app=exp();

app.use(exp.urlencoded({extended:false}));

app.get("/api/all_user",async function(req,res){
   try{let usersref=await admin.firestore().collection('user_info').get();;
    let responseArr=[];
    usersref.forEach(doc => {
       responseArr.push(doc.data());
     });
    res.json({ message: 'all data fach successfully',responseArr });
  }catch(error){
    res.send(error);
    }
})

app.get("/api/all_user/:id",async function(req,res){
    try{let usersref=await admin.firestore().collection('user_info').doc(req.params.id).get();
     res.json({ message: 'find data in the base of id',usersref });
   }catch(error){
     res.send(error);
     }
 })

app.post("/api/signin",async function(req,res){
    const body = req.body;
    try{ 
      const docRef = await admin.firestore().collection('user_info').add(body);
       res.status(201).json({ message: 'Data added successfully', id: docRef.id });
     } catch(error){
        res.send(error);
      }
})

app.listen(3000);

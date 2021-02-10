// var express=require("express");
// var app=express();

// var mongoose=require("mongoose");
// var bodyParser=require("body-parser");

// app.set("view engine","ejs");
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended :true}));
// mongoose.connect("mongodb://localhost/xmeme");
//var normalize=require("normalize-mongoose");
const express=require("express");
const mongoose=require('mongoose');

 var bodyParser=require("body-parser");
 //var request=require("request");
 //mongoose connection
mongoose.connect('mongodb://localhost/memeapp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const app=express();
app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended:true}));
const path=require('path');
app.set('views',path.join(__dirname,'views'))


var  memeSchema=new mongoose.Schema({
    name:String,
    url:String,
    caption:String
    //time : { type : Date, default: Date.now }
   
    
});

memeSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });
//memeSchema.plugin(normalize);

var Meme=mongoose.model("Meme",memeSchema);

// Meme.create({
//     name:"shinigami",
//     url:"https://images.unsplash.com/photo-1601382270349-49c15bddf738?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbWVzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     caption:"First Caption "
    
// })

app.get("/",function(req,res){
    res.redirect("/memers");
})

app.get("/memers", function (req, res) {
    Meme.find({}).sort({_id: -1}).limit(100).exec(function(err, memes) {
       // var memes=JSON.parse(memes);
        if (err) {
            console.log(err);
        } else {
            res.render("index", {memes: memes})
        }
    });
});


//JSON GET

app.get("/memes", function (req, res) {
    Meme.find({}).sort({_id: -1}).limit(100).exec(function(err, memes) {
       // var memes=JSON.parse(memes);
        if (err) {
            console.log(err);
        } else {
            res.json(memes);
        }
    });
});

app.get("/memes/new",function(req,res){
    res.render("new");
})

app.post("/memers",function(req,res){
    Meme.create(req.body.meme,function(err,newMeme){
           if(err)
            {
                console.log(err);
            }
            else
            {
                res.redirect("/memers");
            }
    })
})

app.use(bodyParser.json())
// app.post('/memer', function(req, res) {
//     // Insert JSON straight into MongoDB
//    db.collection('Meme').insertOne(req.body, function (err, result) {
//        if (err)
//           res.send('Error');
//        else{

//        res.json('id: '+result["insertedId"]);

//        }
 
//    });
//  });

 // JSON POST
 app.post("/memes",function(req,res){

    var data=req.body;
    Meme.create(data,function(err,newMeme){
        if(err)
         {
             console.log(err);
         }
         else
         {
             res.json('id: '+newMeme["_id"]);
         }
 })
    // Meme.create(data,function(err,result){
    //     if(err)
    //       res.send('error');
    //       else{
    //           rres.json('id: '+result["insertedId"]);
    //       }
    // });
})

// app.post("/memer",function(req,res){
    
//     Meme.create(req.body.meme,function(err,memes){
//            if(err)
//             {
//                 console.log(err);
//             }
//             else
//             {
//                 res.json(newMeme);
//             }
//     })
// })

// request('/memes',function(error,response,body){
//       if(error)
//       {
//           console.log(error);
//       }
//       else
//       {
//           if(response.statusCode==200)
//           {
//               var parsedData=JSON.parse(body);
              
//           }
//       }
// })

app.listen(8080, function() {
    console.log('Server listening on port 8081'); 
  });

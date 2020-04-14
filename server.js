const express=require('express');
const jwt=require('jsonwebtoken');
const cors=require('cors');  //To avoid CORS errors
const bodyParser=require('body-parser');
const csurf=require('csurf');
const moment=require('moment');

const cookieParser=require('cookie-parser');
const fs=require('fs');

const corsOptions = {
    origin: 'http://localhost:4200',
    methods:['GET','POST','PUT','DELETE'],
    credentials: true  }

const publicKey=fs.readFileSync('./public/keys/public.key','utf8'); //To verify the token

const privateKey=fs.readFileSync('./public/keys/private.key','utf8');//To sign the payload

function customValue(req)
{
    return req.headers['x-xsrf-token'];
}

const csrfProtection = csurf({ cookie:{httpOnly:true},value:customValue}); //cookie parser needed
  

const app=express();

//Middleware functions


//app.use(express.static('public')); //to access static files
app.use(cors(corsOptions));
app.use(bodyParser.json({type:"application/json"})); //parsing json requests
app.use(bodyParser.urlencoded({extended:false})); //pasrsing urlencoded requests
app.use(cookieParser());

function IsAuthenticated(req,res,next)
{
    jwt.verify(req.cookies.sessionId,publicKey,{
        subject:req.cookies.user,  //intended user of the token
        algorithm:["RS256"],//signing algorithm
        expiresIn:  "60000"   //token expires in 1 min,
    },function(err,decoded)
    {
    
    if(err)
    {
    res.status(401).send(false);
    }
    else
    {
    if(decoded.csrfToken.indexOf(req.headers["x-xsrf-token"]) !==-1)
    {
        next();
    }
    else
    {
        res.status(403).send(false);
    }
    }

    })
}

app.use(function(req,res,next)
{   
res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
next(); //dont forget this, else next route wont be called.      
})

app.use(['/comment'],function(req,res,next)
{
    IsAuthenticated(req,res,next)
});

app.get('/',csrfProtection,function(req,res,next)
{
    let token=req.csrfToken();
    res.cookie("XSRF-TOKEN",token,{httpOnly:false,secure:false});
    res.status(200).send();
})

app.get('/IsLoggedIn',function(req,res,next)
{
const date=new Date().getTime();
const expired= moment(date).isBefore(req.cookies.expiry);
if(!expired)
{
    res.status(401).send(false);  
}
else
{
    res.status(200).send(true);
}
});


app.post('/comment',function(req,res,next)
{

res.status(200).send();
    
})


app.post('/login',csrfProtection,function(req,res,next)
{
const user=req.body.username;
const pass=req.body.password;
let tokenData="";
let csrfToken="";


fs.readFile('./public/users.json',"utf8",function(err,data)
{
    if(err) next(err); //Since it is async, we call next(err)
    let Userdata=JSON.parse(data);
 
    csrfToken=req.csrfToken();

    if(Userdata.filter(x=>x.username==user && x.password==pass).length > 0)
    {
        //sign the payload using the private key and generate the token
        jwt.sign({user:user,csrfToken:csrfToken},privateKey,{
          subject:user,  //intended user of the token
          algorithm:"RS256",//signing algorithm
          expiresIn:  "60000"   //token expires in 1 min,
    
        },function(err,token)
        {
        if (err) throw err;
        tokenData=token;
        })
    
        let clear=setInterval(()=>{
            if(tokenData !=="")
            {
                let date=new Date();
                date.setTime(date.getTime()+60000);
                clearInterval(clear);
                res.cookie('sessionId',tokenData,{httpOnly:true,secure:false});
                res.cookie('user',user,{httpOnly:true,secure:false});
                res.cookie('expiry',date.toUTCString(),{httpOnly:true,secure:false});
                res.cookie("XSRF-TOKEN",csrfToken,{httpOnly:false,secure:false});
                res.status(200).send();
            }
        },1000)    
    }
    else
    {
        res.status(401).send();
    }


})

//Verify if the password and username are correct

 
})

app.use(function(err,req,res,next)
{
    console.log("Express Error handling");
    if (err.code == 'EBADCSRFTOKEN') 
    {
        res.status(403).send(false)
    }
    else
    {
        res.status(500).send(err.message); //This is for catching errors thrown by throw and next(err)
    }
})

app.listen(8080,function()
{
    console.log("app listening on port 8080");
})

/*

For cookies to be sent from client to server and vice versa:
Enable cookie parser
Enable cors with credentials and origin

On client,need to pass withCredentials:true on all requests

*/
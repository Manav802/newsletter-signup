const bodyParser = require('body-parser'),
      express = require('express'),
      https = require('https'),
      app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/signup.html');
});
app.post('/',function(req,res){
    const firstName = req.body.FirstName;
    const lastName = req.body.LstName;
    const email = req.body.Email;
    
    var data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
                    
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = 'https://us10.api.mailchimp.com/3.0/lists/listId';
    
    const options = {
        method: "post",
        auth: 'apikey'
    }
   
    const request= https.request(url,options,function(response){
        
    if(response.statusCode === 200){
        res.sendFile(__dirname+ '/success.html');
    }
    else{
        res.sendFile(__dirname+'/failiure.html');
    }

    response.on('data',function(data){
        console.log(JSON.parse(data));
    })

    });


    request.write(jsonData);
    request.end();
});

app.post('/failiure',function(request,response){
    response.redirect("/");
})

app.listen(process.env.PORT||3000,function(){
    console.log('server is running');
});
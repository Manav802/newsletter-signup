const exp=require("express");

const bp=require("body-parser");

const https=require("https");

const app=exp();

app.use(exp.static("public"));

app.use(bp.urlencoded({extended:true}));

app.get("/",function (req,res)
{
	res.sendFile(__dirname+"/signup.html");
	// body...
});

app.post("/",function (req,res)
{
	// body...
	var firstName=req.body.FirstName;
	var lastName=req.body.LastName;
	var email=req.body.Email;

	var data=
	{
		members:[
		{
			email_address:email,
			status:"Subscribed",
			merge_fields:
			{
				FNAME:firstName,
				LNAME:lastName
			}

		}
		]
	};   
	var jsonData=JSON.stringify(data);
	const url="https://us10.api.mailchimp.com/3.0/lists/a265c80ca1";

	const options=
	{
		method:"post",

		auth:"Manav:ed1566bc6cbc65d5148dbf4b1896aac5-us10"

	}

	const request=https.request(url.options,function(response)
	{
		if(response.statusCode === 200){
			res.sendFile(__dirname+ '/success.html');
		}
		else{
			res.sendFile(__dirname+'/failure.html');
		}
		response.on("data",function(data)
		{
			console.log(JSON.parse(data));
		});

	});

	request.write(jsonData);
	request.end();
});

app.post('/failure',function(request,response){
	response.redirect("/");
});

app.listen(3000,function () 
{
	// body...
	console.log("Server is running on port 3000");
});


//API KEY
// ed1566bc6cbc65d5148dbf4b1896aac5-us10

//list id
//a265c80ca1
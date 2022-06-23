
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');

const mysql=require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'dhule',
	port:3306
});



app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;

app.get('/poc1', function (req, res) {
	let input ={bookid:req.query.x, bookname:req.query.y, bookprice:req.query.z};
	let output = false;
	console.log(input);
	connection.query('insert into book(bookid,bookname,bookprice) values (?,?,?)',
	[input.bookid,input.bookname,input.bookprice],(error,whathappendtoinsert)=>{
		if(error)
		{
			console.log(error);
		}
		else if(whathappendtoinsert.affectedRows>0)
		{
			output=true;
		}
		res.send(output);

	});
		
    
    });



	app.get('/poc3',(req,res)=>{
		let input=req.query.x;
		let output ={bookfound:false, details:{bookid:4,boookname:'java',bookprice:300}};
		console.log(input);

		connection.query('select * from book where bookid = ?',[input],(error,rows)=>{

			if(rows.length>0)
			{
				output.bookfound=true;
				output.details=rows[0];
			}
			res.send(output);
		})

	})







 app.get('/poc2', function (req, res) {
    connection.query('select  * from book ',[],(err,rows)=>{
		res.send(rows);

	})
	
 		});




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});
var bodyparser = require('body-parser')
var express = require('express')
var promise = require('bluebird')

var app = express();
var options ={ promiseLib : promise }

var pgp = require('pg-promise')(options)

var cs ='postgres://postgres:root@localhost:5432/player'

var db = pgp(cs)

app.set('port', process.env.PORT || 4600)




app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    
    res.setHeader('Access-Control-Allow-Methods', '*');

    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   
    res.setHeader('Access-Control-Allow-Credentials', true);

    
    next();
});


app.get('/',(req,res)=>{
    res.send('Database coinnectivity Ex.....')
})

app.get('/player', (req,res, next)=>{
db.any('select * from player').then(
    (data)=>{
        res.send(data)
    })
})

app.get('/player/:id',(req,res,next)=>{
 pid = req.params.id
db.any('select * from player where id = $1', pid).then(
(data)=>{
    res.send(data)
})
})



// app.delete('/player/:id',(req,res,next)=>{
//     var pid = req.params.id
//     db.any('delete from player where id = $1', pid). then(
//         (data)=>{
//             res.send({'message':'Record Deleted Successsssss'})
//         }
//     )
// })


// // app.post('/player',(req,res, next)=>{
// // var i = parseInt(req.body.id)
// // var n = req.body.name 
// // var im = req.body.image
// // var c = req.body.country
// // var tr =parseInt( req.body.totruns)
// // var tw = parseInt(req.body.totwickets)
// // db.any('insert into player values($1,$2,$3,$4,$5,$6)',[i,n,im,c,tr,tw]).then(
// //     (data)=>{
// //         res.send({'message' : 'Saved Successssssss...'})
// //     }
// // )
// // })

// app.post('/player',(req,res, next)=>{
// var i = parseInt(req.body.id)
// var n = req.body.name 
// var im = req.body.image
// var c = req.body.country
// var tr =parseInt( req.body.totruns)
// var tw = parseInt(req.body.totwickets)
// db.any('select fn_AddPlayer($1,$2,$3,$4,$5,$6)',[i,n,im,c,tr,tw]).then(
//     (data)=>{
//         res.send({'message' : 'Saved Successssssss...'})
//     }
// )
// })




// app.put('/player',(req,res,next)=>{
// var i = parseInt( req.body.id)
// var n = req.body.name 
// var im = req.body.image
// var c = req.body.country
// var tr =parseInt( req.body.totruns)
// var tw = parseInt(req.body.totwickets)

// db.any(
//     `update player 
//     set name= $1, 
//     image= $2, 
//     country = $3 , 
//     totruns = $4 , 
//     totwickets = $5 
//     where id = $6 `,[n,im, c,tr, tw, i]). then(
//     (data)=>{
//         res.send('Updated Sucesssss....')
//     }
// )
// })




app.listen(app.get('port'),(err)=>{
if(err)
console.log('server not strated ...')
else 
console.log('server Started at  : http://localhost:4600')
})

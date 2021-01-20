var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var neo4j = require("neo4j-driver");

var app = express();

//view engine
app.set("views" , path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser .urlencoded({ extender : false }));
app.use(express.static("public"));

var driver = neo4j.driver("bolt://54.152.6.68:32867", neo4j.auth.basic("neo4j", "meanings-amplitudes-commitments"));
var session = driver.session();
var session2 = driver.session();


app.get("/", function(req, res){
    session
    .run("MATCH(n:Jugadores) RETURN n LIMIT 7")
    .then(function(result){
        var jugaArr = [];
        result.records.forEach(function(record){
            jugaArr.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.nombre
                
            });
          
        });
        session
        .run("MATCH(n:EstadisticasJugadores) RETURN n")
        .then(function(result2){
            var estaArr = [];
            result2.records.forEach(function(record){
                estaArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.nombre
        });
    });
        res.render("jugadores", {
            jugadores: jugaArr,
            estadisticas: estaArr
        });

    })
       .catch(function(err) {
           console.log(err);
       }) 
    })
    .catch(function(err){
        console.log(err);
    })
 
  
});

app.post( "/jugadores/add" , function(req, res){
    var nombre = req.body.nombre;
    var edad = req.body.edad;
    var precio = req.body.precio;
    var posicion = req.body.posicion;
    
    session2
        .run("CREATE (n:Jugadores {nombre:{nombreParam}, edad:{edadParam}, precio:{precioParam}, posicion:{posicionParam}})", {nombreParam:nombre, edadParam:edad , precioParam:precio, posicionParam:posicion})
        .then(function(result){
           
            res.render("añadir", {

            });
           
        })
        
        .catch(function(err){
            console.log(err);
        });
    
});

app.post( "/estadisticas/add" , function(req, res){
    var nombre = req.body.nombre;
    
    session2
        .run("CREATE (n:EstadisticasJugadores {nombre:{nombreParam}})", {nombreParam:nombre})
        .then(function(result){
           
           res.render("est", {
           });
           
        })
        .catch(function(err){
            console.log(err);
        });
    
});

app.post( "/jugadores/estadisticas/add" , function(req, res){
    
    var nombre1 = req.body.nombre1;
    var nombre2 = req.body.nombre2;
    console.log(nombre1)
    console.log(nombre2)
    session2
        .run("MATCH (a:EstadisticasJugadores {nombre:{nombreParam2}}) MATCH (b:Jugadores {nombre:{nombreParam1}}) create (b)-[:cualidad]->(a)  ", {nombreParam1:nombre1,nombreParam2:nombre2 })
        .then(function(result){
           
            res.render("añadir", {
            });
            
        })
        .catch(function(err){
            console.log(err);
        });
   
});



app.post('/ensenarEstadistica' , function(req, res){ 
    var estadistica = req.body.estadistica;
    console.log(estadistica)
    session2
    .run('MATCH (a:EstadisticasJugadores {nombre:{estadisticaParam}})-[:cualidad]-(n:Jugadores) RETURN n', {estadisticaParam:estadistica})
    .then( function(result){
        estadisticasArray=[];
        result.records.forEach(function(record){
            estadisticasArray.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.nombre
 
            })
        })
        console.log(estadisticasArray[0].name)
        res.render('jugadores',{
            estadisticas:estadisticasArray
        }) 

       
    })

    .catch(function(err){
        console.log(err);
    });
})
app.listen(3000);
console.log("Server Started on Port 3000");

module.exports = app;


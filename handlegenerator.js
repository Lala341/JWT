let jwt = require( 'jsonwebtoken' );
let config = require( './config' );
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true });
const crypto = require('crypto');


// Clase encargada de la creación del token
class HandlerGenerator {


    generateData() {
        client.connect(err => {
            client.db("Usuarios").collection("Usuarios").find({}).toArray((err, data) => {
              
              if(data.length==0){
                data =[{username: "usuario1", password: crypto.createHash('md5').update("usuario1").digest("hex"),token:"", role:"ADMINSITRADOR" },
{username: "usuario2", password: crypto.createHash('md5').update("usuario2").digest("hex"),token:"", role:"EDITOR"},
{username: "usuario3",password: crypto.createHash('md5').update("usuario3").digest("hex"),token:"", role:"USUARIO"}];



        client.connect(err => {
            client.db("Usuarios").collection("Usuarios").insert(data).then(function(res) {
                console.log(res);
              });
        });
              }
              else{
                console.log("BD con datos");
              }
            });

        });

    }

  login( req, res ) {
    
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;
    
    // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
    let mockedUsername = 'admin';
    let mockedPassword = 'password';
    let exits=true;

    client.connect(err => {
        client.db("Usuarios").collection("Usuarios").find({username: username}).toArray((err, data) => {
          
          if(data.length==0){
            exits==false;
          }
          else{
            mockedUsername= data[0].username;
            mockedPassword=data[0].password;
          }


    password = crypto.createHash('md5').update(password).digest("hex");

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if( username && password ) {

      // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
      // de lo contrario, un mensaje de error es retornado
      if( username === mockedUsername && password === mockedPassword &&exits) {
        
        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
        let token = jwt.sign( { username: username },
          config.secret, { expiresIn: '24h' } );
        





          //Agrega para que se envie el token a la BD
          client.connect(err => {
            client.db("Usuarios").collection("Usuarios").updateOne({ username: username }, { $set: { token: token }}, function(err, data) {
                console.log(data);


                // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
                res.json( {
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                } );




            });
        });
          
      








        

      } else {
        
        // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
        res.send(  {
          success: false,
          message: 'Incorrect username or password'
        } );

      }

    } else {

      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.send( 400 ).json( {
        success: false,
        message: 'Authentication failed! Please check the request'
      } );

    }

  
           
        });
        
    });

  }

  index( req, res) {
    
    // Retorna una respuesta exitosa con previa validación del token y el rol USER
    
var role=res.locals.user.role;
var username=res.locals.user.username;
console.log(role);
        if(role==='ADMINISTRADOR'){
                           
        res.json( {
            success: true,
            message: 'Index admin page',
            user: username
          } );
        }
        else if(role==='USUARIO'){
            
            res.json( {
                success: true,
                message: 'Index user page',
                user: username
            } );
        }
        else if(role==='EDITOR'){
           
                res.json( {
                    success: true,
                    message: 'Index editor page',
                    user: username
                } );
        }

  }
 
}

module.exports = HandlerGenerator;
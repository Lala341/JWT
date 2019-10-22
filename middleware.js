let jwt = require( 'jsonwebtoken' );
const config = require( './config.js' );
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true });


// Función encargada de realizar la validación del token y que es directamente consumida por server.js
let checkToken = ( req, res, next) => {
  
  // Extrae el token de la solicitud enviado a través de cualquiera de los dos headers especificados
  // Los headers son automáticamente convertidos a lowercase
  let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];
  var exits=true;
  // Si existe algún valor para el token, se analiza
  // de lo contrario, un mensaje de error es retornado
  if( token ) {

    // Si el token incluye el prefijo 'Bearer ', este debe ser removido
    if ( token.startsWith( 'Bearer ' ) ) {
        token = token.slice(7, token.length );
        // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
        jwt.verify( token, config.secret, ( err, decoded ) => {
      
        // Si no pasa la validación, un mensaje de error es retornado
        // de lo contrario, permite a la solicitud continuar
        if( err ) {
          return res.json( {
            success: false,
            message: 'Token is not valid'
          } );
        } else {
          req.decoded = decoded;




          client.connect(err => {
            client.db("Usuarios").collection("Usuarios").find({}).toArray((err, data) => {
              
                
              if(data.length==0){
                exits==false;
              }
              else{
                for(var i=0; i<data.length;i++){
                    if(data[i].token==token){

                        //Validacion de roles
                        res.locals.user=data[i];
                        console.log(res.locals.user);
                        console.log(data[i].role);
                        
                         next();
                        
                        }
                }
                if(exits==false){
                 return  res.json( {
                        success: false,
                        message: 'Auth token is not correct'
                      } );
                  
                    }
              }
            });
        });

            



         
        }
      } );
    }
  } else {
    
    return res.json( {
      success: false,
      message: 'Auth token is not supplied'
    } );

  }

};

module.exports = {
  checkToken: checkToken
}
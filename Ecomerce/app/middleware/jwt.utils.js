var jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = '2jjdfopzefj0jzyr64k899hezfjn90jzehyygf4j4nchyyekand187s'


module.exports = {

    generateTokenForUser: function(userData){

        return jwt.sign({
            userId : userData.id,
            isAdmin : userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
          expiresIn: '168h'
        })
        
    },
    parseAuthorization: function(authorization) {
      return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
      var userId = -1;
      var token = module.exports.parseAuthorization(authorization);
      if(token != null) {
        try {
          var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
          if(jwtToken != null)
            userId = jwtToken.userId;
        } catch(err) { }
      }
      return userId;
    },
    generateTokenForPanier: function(panierData){

      return jwt.sign({
       panierId : panierData.id
          
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '168h'
      })
      
  },
  getPanierId: function(authorization) {
    var panierId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if(jwtToken != null)
          panierId = jwtToken.panierId;
          
      } catch(err) { }
    }
    return panierId;
  }
    
}
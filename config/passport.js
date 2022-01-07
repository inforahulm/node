const LocalStrategy   = require('passport-local').Strategy;


const { Admin }  = require('../helpers/DBConnect');
const md5            = require('md5'); 



// expose this function to our app using module.exports
module.exports =  function(passport) {


	passport.serializeUser(async function (admin, done) {
		done(null, admin.id);
	});
	passport.deserializeUser(async function (id, done) {
		await Admin.findOne({
			where: {
				id: id
			}
		}).then((result) => {
			done(null, result);
		}).catch((error) => {
			if (error) { console.log(error); done(error); }
		});
	});

	passport.use('Local', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true  
	}, function(req, email, password, done) {
		let responseUser;
	
		 Admin.findOne({ 
			where:{email} 
		}).then(async function(user){
		
			if(!user){
				return done(null, false, req.flash('loginMessage', 'Invalid User name or Password.'));
			}
			if (md5(password) !=user.password)
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
			if(user.status == 0)
				return done(null, false, req.flash('loginMessage', 'Oops! Your Account Blocked Please Contact Administrator.')); 
			
            
            return done(null, user);
		}).catch((error)=>{
			console.log("Logn Error",error);
		})


	}))


};
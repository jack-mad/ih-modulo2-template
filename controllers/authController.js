const bcryptjs		= require("bcryptjs")
const mongoose		= require("mongoose")

const User			= require("./../models/User")

exports.register = (req, res) => {

	res.render("auth/register")

}

exports.registerForm = async (req, res) => {

	// 1. VERIFICAR QUE LOS DATOS DEL FORMULARIO LLEGUEN AL CONTROLLER
	const { username, email, password } = req.body


	// --- VALIDACIONES ---
	// A. VERIFICAR QUE NO HAYA ESPACIOS VACÍOS
	if(!username || !email || !password){

		return res.render("auth/register", {
			errorMessage: "Todos los campos deben llenarse."
		})
	}	

	// B. QUE LA CONTRASEA SEA SÓLIDA (Al menos 6 caracteres, un número, una minúscula y una mayúscula)
	const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

	if(!regex.test(password)){
		
		return res.render("auth/register", {
			errorMessage: "Tu contraseña debe incluir 6 caracteres, al menos un número, una minúscula y una mayúscula."
		})

	}



	// 2. ENCRIPTAR CONTRASEÑA
	// A. ¿Cuántas veces vamos a revolver la contraseña?
	const salt = await bcryptjs.genSalt(10)

	// B. Revolver la contraseña con el "salt"
	const hashedPassword = await bcryptjs.hash(password, salt)

	// C. GUARDAR EN BASE DE DATOS

	try {
		const newUser = await User.create({
			username,
			email, 
			password: hashedPassword
		})
	
		console.log(newUser)
	
		return res.redirect("/profile")

	} catch (error) {
		
		console.log(error)

		console.log(error.errors)

		// CONFIRMAR SI EL ERROR VIENE DE BASE DE DATOS
		if (error instanceof mongoose.Error.ValidationError){
			
			return res.render("auth/register", {
				errorMessage: "Por favor utiliza un correo electrónico real."
			})
		}

		return

	}
	

}

          
exports.login = (req, res) => {

	res.render("auth/login")

}

exports.loginForm = async (req, res) => {
	//obtener datos de formulario 
	console.log(req.body)
	const {email, password} = req.body


	//validar usuario encontrado en db
	const foundUser = await User.findOne({email})

	if (!foundUser){
		res.render('auth/login', {
			errorMessage: 'Email o contraseña sin coincidencia, intenta de nuevo.'
		})
		return
	}
	
	
	//validacion de contraseña 
	const verifyPass = await bcryptjs.compareSync(password, foundUser.password)
	console.log(verifyPass);
	if(!verifyPass){

		res.render("auth/login", {
			errorMessage: 'Email o contraseña incorrecta, intenta de nuevo.'
		})

		return

	}
	//gestion de sesion, si coincide la contraseña crea una sesion de ese mismo usuario
	const usr = req.session.currentUser = {
		_id: foundUser._id,
		username: foundUser.username,
		email: foundUser.email,
		msg: "Este es su ticket"
	}
	//redireccion al profile
	return res.redirect('/profile')
}

exports.logout = (req, res) => {
	req.session.destroy(()=>{
		
		res.redirect('/')
	})
}
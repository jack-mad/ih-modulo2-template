//controles
exports.getHome = (req,res) => { 
    res.render('index')
}

exports.getProfile = (req,res) => {
    console.log(req.session)
    
    res.render('profile')
}
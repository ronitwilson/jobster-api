const login = async(req, res) => {
    res.status(200).json({msg: "login success"})
}

const register = async(req, res) => {
    res.status(200).json({msg: "register success"})
}

module.exports = {
    login,
    register
}
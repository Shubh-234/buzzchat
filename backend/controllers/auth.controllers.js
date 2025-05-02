const signup = async (req,res) => {
    try {
        res.send("singing up");
    } catch (error) {
        console.log("error encountered")
    }
}

const login = async (req,res) => {
    try {
        res.send("loggin in")
    } catch (error) {
        console.log("error encountered")
    }
}

const logout = async (req,res) => {
    try {
        res.send("logout");
    } catch (error) {
        console.log("error encountered")
    }
}

module.exports = {login,signup,logout};
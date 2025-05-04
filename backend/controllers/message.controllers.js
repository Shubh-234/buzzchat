
const sendMessage = async (req,res) => {
    try {
        console.log("working controller");
        res.status(200).json({message: "controller is working"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal Server error"});
    }
}

module.exports = {sendMessage}
function configError(message){
    throw new error(message)
}

module.exports = {jwtKey: process.env.JWT_TOKEN ?? configError("Environment variable JWT_KEY is missing")}
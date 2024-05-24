const getToken = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        return token;
    } else {
        console.error("O cabeçalho de autorização está ausente.");
        return null;
}
}
module.exports = getToken;

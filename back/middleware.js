
const myMiddleware = (req, res, next) => {
    console.log('Выполнено собственное middleware');
    next();
};

module.exports = myMiddleware;

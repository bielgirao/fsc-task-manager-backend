const notFoundError = (res) => {
    return res.status(404).send('Task not found.');
};

module.exports = {
    notFoundError,
};

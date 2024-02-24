const notFoundError = (res) => {
    return res.status(404).send('Task not found.');
};

const objectIdCastError = (res) => {
    return res.status(500).send('The ID is not in the correct format.');
};

module.exports = {
    notFoundError,
    objectIdCastError,
};

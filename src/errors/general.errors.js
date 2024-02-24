const notAllowedFieldsToUpdate = (res, field) => {
    return res
        .status(500)
        .send(`The field "${field}" is not allowed to be updated.`);
};

module.exports = {
    notAllowedFieldsToUpdate,
};

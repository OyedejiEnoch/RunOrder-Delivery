//to catch errors when uploading or deleting a product rather then let the browerser/post man hang

module.exports = func => (req, res, next) =>
    Promise.resolve(func(req, res, next))
        .catch(next)
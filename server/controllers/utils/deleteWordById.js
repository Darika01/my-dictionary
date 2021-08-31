const deleteWordById = async (req, res, ModelName) => {
    await ModelName.findOneAndDelete({ _id: req.params.id })
        .exec()
        .then(word => {
            if (!word) {
                return res.status(404).json({ message: 'Word not found', code: 404 });
            }
            return res.status(200).json({ message: 'Word was deleted', data: word });
        })
        .catch(err => {
            return res.status(500).json(err);
        });
};

module.exports = deleteWordById;

const Place = require("../../models/Place");

const place = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);

        if (!id) {
            throw new Error("Place is not found.");
        }

        const place = await Place.findById(id);
        res.json(place);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

module.exports = place;

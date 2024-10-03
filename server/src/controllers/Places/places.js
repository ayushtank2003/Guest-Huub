const Place = require("../../models/Place");

const places = async (req, res, next) => {
    try {
        const places = await Place.find({});
        console.log(2)

        if (!places) {
            throw new Error("Places not found.");
        }

        res.json(places);
    } catch (error) {
        next(error);
    }
};

module.exports = places;

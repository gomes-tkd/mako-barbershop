const Gallery = require("../model/GalleryModal");
const ObjectId = require("mongoose").Types.ObjectId;

const getToken = require("../helpers/get-token");
const getUserbyToken = require("../helpers/get-user-by-token");

module.exports = class GalleryController {
    static async postPhotos(req, res) {
        const images = req.files;

        if (images.length === 0) {
            res.status(401).json({ message: "A imagem é obrigatória." });
        }

        const photos = new Gallery({
            images: [],
        });

        images.map(image => photos.images.push(image.filename));

        try {
            const newGallery = await photos.save();

            res.status(201).json({
                message: "Gallery updated!",
                newGallery
            });
        } catch (e) {
            res.status(500).json({ message: e.toString() });
        }
    }

    static async postPhoto(req, res) {
        let image = null;

        if(req.file) {
            image = req.file.filename;
        }

        const photo = new Gallery({
            image
        });

        try {
            const newGallery = await photo.save();

            res.status(201).json({
                message: "Gallery updated!",
                newGallery
            });
        } catch (e) {
            res.status(500).json({ message: e.toString() });
        }
    }

    static async getPhotoById(req, res) {
        const id = req.params.id;

        // verify Id image/object

        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Invalid ID" });
            return;
        }

        // check if images exists
        const photo = await Gallery.findOne({ _id: id });

        if(!photo) {
            res.status(404).json({ message: "Error: 404 Not Found" });
            return;
        }

        res.status(200).json({ photo: photo });
    }

    static async getAllGalleryPhotos(req, res) {
        const gallery = await Gallery.find().sort("-createdAt");

        res.status(200).json({ message: "All photos at moment!", gallery: gallery });
    }
}

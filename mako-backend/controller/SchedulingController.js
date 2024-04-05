const Scheduling = require("../model/SchedulingModel");
const ObjectId = require("mongoose").Types.ObjectId;
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class SchedulingController {
    static async scheduling(req, res) {
        const { dataDay, dataHour } = req.body;

        const token = getToken(req);

        if (!token) {
            res.status(422).json({ message: "Invalid Token"});
            return;
        }

        const user = await getUserByToken(token);

        if (!user) {
            res.status(422).json({ message: "Invalid User"});
            return;
        }

        if(!dataDay) {
            res.status(422).json({ message: "Campo dia é obrigatório"});
            return;
        }

        if(!dataHour) {
            res.status(422).json({ message: "Campo hora é obrigatório"});
            return;
        }

        const scheduling = new Scheduling({
            clientId: user._id,
            clientName: user.name,
            clientPhone: user.phone,
            dataDay,
            dataHour
        });


        try {
            const newScheduling = await scheduling.save();
            res.status(201).json({ message: "Appointment completed successfully", newScheduling });
        } catch (e) {
            res.status(500).json({ message: e.toString()});
        }

    }

    static async removeScheduling(req, res) {
        // check if id exists
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Invalid ID "});
            return;
        }

        // check if scheduling exists
        const scheduling = await Scheduling.findOne({ _id: id });

        if(!scheduling) {
            res.status(404).json({ message: "Appointment not found "});
            return;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        // check if scheduling id is the same of user
        if(scheduling.clientId.toString() !== user._id.toString()) {
            res.status(422).json({ message: "não was possible to process your solicitation"});
        }

        await Scheduling.findByIdAndDelete(id);
        res.status(200).json({ message: "Appointment removed with success" });
    }

    static async getAllScheduling(req, res) {
        const scheduling = await Scheduling.find().sort("-createdAt");

        res.status(200).json({ message: "All scheduling at moment!", scheduling: scheduling });
    }
}

const Scheduling = require("../model/SchedulingModel");
const Earn = require("../model/EarnModel");
const ObjectId = require("mongoose").Types.ObjectId;
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class SchedulingController {
    static async scheduling(req, res) {
        const { dataDay, dataHour, servicesRequested } = req.body;

        const token = getToken(req);

        if (!token) {
            res.status(422).json({ message: "Invalid Token"});
            return false;
        }

        const user = await getUserByToken(token);

        if (!user) {
            res.status(422).json({ message: "Invalid User" });
            return false;
        }

        if(!dataDay) {
            res.status(422).json({ message: "Campo dia é obrigatório" });
            return false;
        }

        if(!dataHour) {
            res.status(422).json({ message: "Campo hora é obrigatório" });
            return false;
        }

        try {
            const earnItems = [];

            for (const service of servicesRequested) {
                const { serviceType, serviceValue } = service;
                const earn = new Earn({
                    serviceType,
                    serviceValue
                });
                const savedEarn = await earn.save();
                earnItems.push(savedEarn);
            }

            const scheduling = new Scheduling({
                clientId: user._id,
                clientName: user.name,
                clientPhone: user.phone,
                dataDay,
                dataHour,
                servicesRequested: earnItems
            });


            const newScheduling = await scheduling.save();
            res.status(201).json({ message: "Appointment completed successfully", newScheduling });
            return true;
        } catch (e) {
            res.status(500).json({ message: e.toString()});
            return false;
        }

    }

    static async removeScheduling(req, res) {
        // check if id exists
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Invalid ID "});
            return false;
        }

        // check if scheduling exists
        const scheduling = await Scheduling.findOne({ _id: id });

        if(!scheduling) {
            res.status(404).json({ message: "Appointment not found "});
            return false;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        // check if scheduling id is the same of user
        if(scheduling.clientId.toString() !== user._id.toString()) {
            res.status(422).json({ message: "não was possible to process your solicitation"});
        }

        try {
            await Scheduling.findByIdAndDelete(id);
            res.status(200).json({ message: "Appointment removed with success" });

            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }

    }

    static async getAllScheduling(req, res) {
        try {
            const scheduling = await Scheduling.find().sort("-createdAt");

            res.status(200).json({ message: "All scheduling at moment!", scheduling: scheduling });

            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }

    }
}

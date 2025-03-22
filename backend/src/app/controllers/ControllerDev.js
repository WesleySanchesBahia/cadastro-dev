

import Dev from "../models/Dev.js";


class controllerDev {

    async list(req, res) {
        try {
            const devs =  await Dev.find();
            return res.status(200).json({content:devs});
            
        } catch (error) {
            return res.status(500).json({erro: error})
        }
    }

    async show(req, res) {
        const findName = req.query.name;
        try {
    
            const dev =  await Dev.find({ name: { $regex: findName, $options: "i" } });
            return res.status(200).json({content:dev});
            
        } catch (error) {
            return res.status(500).json({erro: error})
        }
    }

    async create(req,res) {
        try {
            if(req.body){
                const newDev = await  Dev.create(req.body);
                return res.status(201).json(newDev);
            }
        } catch (error) {
            
            console.log("Error ao salvar User:", error)
        }
    }

    async update(req, res) {
        const id = req.params.id;
        await Dev.findByIdAndUpdate(id, req.body)
        return res.status(200).json(true);
    }

    async  delete(req, res) {
        await Dev.findByIdAndDelete(req.params.id);
        return res.status(204).json(true);
    }
}

export default new controllerDev();
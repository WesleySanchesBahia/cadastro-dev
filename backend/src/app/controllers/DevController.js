import Dev from "../models/Dev.js";


class DevController {

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
            return res.status(500).json({error:error})
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const dev = await Dev.findByIdAndUpdate(id, req.body)
            return res.status(200).json(dev);
        } catch (erro) {
            return res.status(500).json({error:erro})
        }
    }

    async  delete(req, res) {
        try {
            await Dev.findByIdAndDelete(req.params.id);
            return res.status(204)
        } catch (erro) {
            return res.status(500).json({error:erro});
        }
    }
}

export default new DevController();
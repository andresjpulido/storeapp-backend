import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import imageService from "../../services/imageService";
import { Container } from "typedi";
var multer  = require('multer')

const auth = require("../middlewares/auth");
const route = Router();

var upload = multer({ dest: 'uploads/' })
const cloudinary = require('cloudinary')

export default (app) => {

	app.put("/images", upload.single('file'), async (req, res, next) => {
		const id_product = req.body.id_product;
		const id = req.body.id;
 
		let urlcloud = ""

		//invoke cloudImage
		//set url in db
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET
		})

		cloudinary.uploader.upload(req.file.path)
		.then(results => { 
			console.log("results", results)
			urlcloud = results.url;
			const serviceInstance = Container.get(imageService);
			const img = serviceInstance.update({
				id: parseInt(id, 10),
				url: results.url
			});

			return res.json({
				id: parseInt(id, 10),
				url: urlcloud
			});
			
		})
		.catch((err) => console.log(err))


	});


	app.get("/images/:id", async (req, res, next) => {
		const id = req.params.id;
		const serviceInstance = Container.get(imageService);
		const img = await serviceInstance.getImage(id);

		return res.json(img);
	});


/*
	app.post("/images", async (req, res, next) => {
		const imageFiles = req.body.files;
        const idProduct = req.body.idProduct;
		const serviceInstance = Container.get(imageService);

        console.log("/images", imageFiles, idProduct, req.body);

		if (imageFiles)
			for (var i = 0; i < imageFiles.length; i++) {
				await serviceInstance.createImage(idProduct, imageFiles[i]);
			}

		return res.json(req.body);
	});
*/
//app.put("/images", upload.single('file'), Image.create)

};

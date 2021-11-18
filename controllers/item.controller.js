const { Item } = require("../models");
const { cloudinary } = require("../lib/cloudinary");
const streamifier = require("streamifier");

const uploadFromBuffer = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const cldUploadStream = cloudinary.uploader.upload_stream(
      {
        upload_preset: "test_preset",
      },
      (error, result) => {
        if (result) resolve(result);
        reject(error);
      }
    );

    streamifier.createReadStream(imageBuffer).pipe(cldUploadStream);
  });
};

const itemRoutes = {
  getAllItems: async (req, res) => {
    try {
      const items = await Item.find({});
      res.json(items);
    } catch (error) {
      res.json({ error });
    }
  },
  newItem: async (req, res) => {
    try {
      const imageBuffer = req.file.buffer;
      const { public_id, secure_url } = await uploadFromBuffer(imageBuffer);
      const body = req.body;
      const itemInfo = {
        ...body,
        price: parseInt(body.price),
        imageId: public_id,
        imageUrl: secure_url,
      };
      const item = await Item.create(itemInfo);

      res.json({ item, statusCode: 200 });
    } catch (error) {
      res.json({
        message: "Please finish filling out the form",
        statusCode: 400,
      });
    }
  },
  showItem: async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      res.json(item);
    } catch (error) {
      res.json({ error });
    }
  },
  editItem: async (req, res) => {
    try {
      let itemInfo;

      if (req.file) {
        const imageBuffer = req.file.buffer;
        const { body } = req;

        // Invalidates cached image CDNs in Cloudinary
        await cloudinary.uploader.destroy(body.imageId);

        const { public_id, secure_url } = await uploadFromBuffer(imageBuffer);

        itemInfo = {
          ...body,
          price: parseInt(body.price),
          imageId: public_id,
          imageUrl: secure_url,
        };
      } else {
        itemInfo = { ...req.body, price: parseInt(req.body.price) };
      }

      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        itemInfo,
        { new: true }
      );
      res.json({ item: updatedItem, statusCode: 200 });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Please finish filling out the form",
        statusCode: 400,
      });
    }
  },
  deleteItem: async (req, res) => {
    try {
      const item = await Item.findByIdAndDelete(req.params.id);
      await cloudinary.uploader.destroy(item.imageId);
      res.json({ deleted: item });
    } catch (error) {
      res.json({ error });
    }
  },
};

module.exports = itemRoutes;

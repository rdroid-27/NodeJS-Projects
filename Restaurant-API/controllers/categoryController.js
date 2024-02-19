const categoryModel = require("../models/categoryModel");

const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please Enter Title of Category!",
      });
    }
    const newCat = await categoryModel({
      title,
      imageUrl,
    });
    await newCat.save();
    res.status(200).send({
      success: true,
      message: "Category Created!",
      newCat,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error creating Category!",
    });
  }
};

const getAllCatController = async (req, res) => {
  try {
    const allCat = await categoryModel.find({});
    console.log(allCat);
    if (!allCat) {
      return res.status(404).send({
        success: false,
        message: "No Categories Found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Created!",
      count: allCat.length,
      allCat,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Getting All Categories!",
    });
  }
};

const updateCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please Enter Title of Category!",
      });
    }
    let catId = req.params.id;
    if (!catId) {
      return res.status(500).send({
        success: false,
        message: "Please Enter ID of Category!",
      });
    }
    const updCat = await categoryModel.findByIdAndUpdate(
      { _id: catId },
      { title, imageUrl },
      { new: true }
    );
    if (!updCat) {
      return res.status(500).send({
        success: false,
        message: "No Category Found with Give ID!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated!",
      updCat,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Getting All Categories!",
    });
  }
};

const deleteCatController = async (req, res) => {
  try {
    let catId = req.params.id;
    if (!catId) {
      return res.status(500).send({
        success: false,
        message: "Please Enter ID of Category!",
      });
    }
    const updCat = await categoryModel.findByIdAndDelete({ _id: catId });
    if (updCat == null) {
      return res.status(500).send({
        success: false,
        message: "No Category Found with Given ID!",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Category Deleted!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Getting All Categories!",
    });
  }
};

module.exports = {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};

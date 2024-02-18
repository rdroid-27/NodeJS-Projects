const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      pickUp,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res
        .status(500)
        .send({ success: false, message: "Missing fields!" });
    }
    let newRest = await restaurantModel({
      title,
      imageUrl,
      foods,
      pickUp,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRest.save();
    res.status(200).send({
      success: true,
      message: "Restaurant Created!",
      newRest,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Creating Restaurant!",
      error,
    });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const rests = await restaurantModel.find();
    if(!rests){
      return res.status(500).send({
        success:false,
        message:"No restaurants found!"
      });
    }
    res.status(200).send({
      success: true,
      message: "Here are all of your Restaurants!",
      totalCount:rests.length,
      restaurants:rests,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Getting Restaurant!",
      error,
    });
  }
};

const getRestaurantIdController = async (req, res) => {
  try {
    console.log(req.params.id);
    const rest = await restaurantModel.findById(req.params.id);
    if(!rest){
      return res.status(500).send({
        success:false,
        message:`No restaurant found with id: ${req.params.id}`
      });
    }
    res.status(200).send({
      success: true,
      message: "Here is your Restaurant!",
      rest
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Getting Restaurant!",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantIdController
};

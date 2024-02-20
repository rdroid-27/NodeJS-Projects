const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    if (!title || !description || !price) {
      return res.status(500).send({
        success: false,
        message: "Please Enter All Fields!",
      });
    }
    const newFood = await foodModel({
      title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    await newFood.save();
    res.status(200).send({
      success: true,
      message: "Food Created!",
      newFood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error creating Food!",
    });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const allFood = await foodModel.find({});
    console.log(allFood);
    if (!allFood) {
      return res.status(404).send({
        success: false,
        message: "No Foods Found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Here is the list of food items: ",
      count: allFood.length,
      allFood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Getting All Foods!",
    });
  }
};

const getFoodIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Provide Food Id!",
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: `No Food found with id: ${req.params.id}`,
      });
    }

    res.status(200).send({
      success: true,
      message: "Here is your Food: ",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Getting Food!",
      error,
    });
  }
};

const getFoodByRestaurantIdController = async (req, res) => {
  try {
    const restId = req.params.id;
    if (!restId) {
      return res.status(404).send({
        success: false,
        message: "Provide Restaurant Id!",
      });
    }
    const food = await foodModel.find({ restaurant: restId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: `No Food found with Restaurant id: ${req.params.id}`,
      });
    }
    res.status(200).send({
      success: true,
      message: "Here is your Food from Selected Restaurant: ",
      FoodCount: food.length,
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Getting Food!",
      error,
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    let foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Please Enter ID of Food!",
      });
    }
    const food = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    if (!food) {
      return res.status(404).send({
        success: false,
        message: `No Food found with id: ${req.params.id}`,
      });
    }

    res.status(200).send({
      success: true,
      message: "Here is your Food: ",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Updating Food!",
    });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    let foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Please Enter ID of Food!",
      });
    }
    const food = await foodModel.findByIdAndDelete(foodId);
    if (food == null) {
      return res.status(500).send({
        success: false,
        message: "No Food Found with Given ID!",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Food Deleted!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Deleting Foods!",
    });
  }
};

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      res.status(500).send({
        success: false,
        message: "Please add cart!",
      });
    }
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(200).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Ordering Food!",
    });
  }
};

const orderStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;
    if (!orderId) {
      res.status(404).send({
        success: false,
        message: "Please enter Order Id!",
      });
    }
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Order Status updated",
      updatedOrder
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Getting Order Status!",
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodIdController,
  getFoodByRestaurantIdController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};

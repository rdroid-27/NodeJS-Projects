const testUserController=(req,res)=>{
  try {
    res.status(200).send({
      success:true,
      message:"User routed tested successfully"
    })
  } catch (error) {
    console.log(error);
  }
};

module.exports={testUserController};
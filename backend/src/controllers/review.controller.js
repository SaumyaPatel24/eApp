import Review from "../models/review.model.js";
import User from "../models/user.model.js";

export const addReview = async (req, res) => {
  try {
    
    const { productId, userId, rating, comment } = req.body;

    if (!productId || !userId || !rating || !comment) {
      return res.status(400).json({ message: "All fields required" });
    }

    const review = await Review.create({
      productId,
      userId,
      rating,
      comment,
    });

    res.status(201).json(review);

  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};


export const getReviews = async (req, res) => {
  const { productId } = req.params;

  const reviews = await Review.findAll({
    where: { productId },
    include: [{ model: User, attributes: ["firstName", "lastName"] }],
    order: [["createdAt", "DESC"]]
  });

  res.json(reviews);
};

const authMiddleware = require("../middleware/auth.middleware");

const selfGuard = async (req, res, next) => {
  try {
    authMiddleware()
    if (req.user.id !== parseInt(req.params.id)) {
      return res
        .status(403)
        .json({ message: "Siz faqat o'zingizni o'zgartirishingiz mumkin" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

module.exports = selfGuard;

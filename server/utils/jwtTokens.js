import jwt from "jsonwebtoken";

const sendToken = (user, statusCode, res, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message: message,
      user,
      token,
    });
};

export { sendToken };

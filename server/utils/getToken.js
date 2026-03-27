import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  return token;
};

export default getToken;

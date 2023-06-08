import CustomError from "~/utils/custom-error";
import Users from "~/db/models/User.model";
import { DcryptAdapter } from "~/utils/crypto";

const checkUserCredencial = async (email: string, password: string): Promise<Users | null> => {
  try {
    const user = await Users.findOne({
      where: { email },
      attributes: ["id", "first_name", "last_name", "email", "password"],
    });

    if (!user) {
      throw new CustomError("Not found User", 404, "Not Found");
    }
    const verifyPassword = new DcryptAdapter().dencrypt(password, user.password);
    if (verifyPassword) {
      return user;
    }

    return null;
  } catch (error) {
    console.log("error del catch: ", error);
    return null;
  }
};

export default checkUserCredencial;

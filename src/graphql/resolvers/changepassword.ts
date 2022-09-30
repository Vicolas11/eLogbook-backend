import { AuthenticationError, ValidationError } from "apollo-server-express";
import { changePswInputSchema } from "../../joi/password.joi";
import { validatePassword } from "../../utils/hashedPwd.util";
import { ChangePswResponse, MutationResolvers } from "../generated";

const changePswMutation: MutationResolvers = {
  changePassword: async (_, { input }, { prisma }) => {
    const { password: pwd, new_password, id: userId } = input;

    // Form Validation
    const validate = changePswInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const studentExist = await prisma.student.findUnique({
      where: { id: userId },
    });
    
    if (!studentExist)
      throw new AuthenticationError("This user those not exist!");

    // Change Password
    const hashPwd: string = studentExist.password;

    // Validate current password with that of the database
    const isMatched = await validatePassword({ pwd, hashPwd });

    if (!isMatched) throw new AuthenticationError("Password doesn't matched!");

    const newPassword = await prisma.student.update({
      where: { id: userId },
      data: { password: new_password },
    });

    return {
      status: newPassword ? 200 : 500,
      message: newPassword
        ? "Password changed sucessfully!"
        : "An error occurred!",
    } as ChangePswResponse;
  },
};

export default changePswMutation;

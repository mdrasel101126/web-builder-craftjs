"use server";
import { z } from "zod";
export async function signUp(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Here you would typically:
  // 1. Validate the input
  // 2. Check if the user already exists
  // 3. Hash the password
  // 4. Create the user in your database
  // 5. Create a session or token for the user

  console.log("Signing up:", { name, email, password });
}

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function requestPasswordReset(
  formData: z.infer<typeof forgotPasswordSchema>,
) {
  const result = forgotPasswordSchema.safeParse(formData);

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { email } = result.data;

  // Here you would typically:
  // 1. Check if a user with this email exists
  // 2. If the user exists, generate a password reset token
  // 3. Save the token in your database with an expiration time
  // 4. Send an email to the user with a link containing the token

  console.log("Password reset requested for:", email);
  return { success: true };
}

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function resetPassword(
  formData: z.infer<typeof resetPasswordSchema>,
) {
  const result = resetPasswordSchema.safeParse(formData);

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { token, password } = result.data;

  try {
    // 1. Verify the token
    const resetRequest = await verifyResetToken(token);
    if (!resetRequest) {
      return { error: "Invalid or expired reset token" };
    }

    // 3. Update the user's password
    await updateUserPassword(resetRequest.userId, password);

    // 4. Invalidate the reset token
    await invalidateResetToken(token);

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "An error occurred while resetting the password" };
  }
}

// Helper functions (these would interact with your database)

async function verifyResetToken(token: string) {
  // TODO: Implement this function to check if the token is valid and not expired
  // This should query your database and return the associated reset request if valid
  console.log("Verifying token:", token);
  // Placeholder implementation
  return { userId: "user_123" }; // Return null if token is invalid
}

async function updateUserPassword(userId: string, hashedPassword: string) {
  // TODO: Implement this function to update the user's password in your database
  console.log("Updating password for user:", userId);
  // Placeholder implementation
}

async function invalidateResetToken(token: string) {
  // TODO: Implement this function to invalidate the used token in your database
  console.log("Invalidating token:", token);
  // Placeholder implementation
}

"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, "Password is required"),
});
export async function login(formData: z.infer<typeof loginSchema>) {
  const data = loginSchema.safeParse(formData);
  console.log("login", data);
}

const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
export async function signUp(formData: z.infer<typeof signUpSchema>) {
  const data = signUpSchema.safeParse(formData);
  console.log("sign", data);
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

const confirmEmailSchema = z.object({
  code: z.string().min(6, "Code must be at least 6 characters"),
});

export async function confirmEmail(
  formData: z.infer<typeof confirmEmailSchema>,
) {
  const parsed = confirmEmailSchema.safeParse(formData);

  if (!parsed.success) {
    return { error: parsed.error.format().code?._errors[0] || "Invalid input" };
  }

  const code = parsed.data.code;

  // Simulate checking code in DB
  const isValid = code === "123456"; // Replace with actual DB check

  if (!isValid) {
    return { error: "Invalid confirmation code." };
  }

  // Redirect upon success
  redirect("/dashboard");
}

const resendEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function resendEmail(formData: FormData) {
  const rawEmail = formData.get("email");

  const parsed = resendEmailSchema.safeParse({ email: rawEmail });

  if (!parsed.success) {
    return {
      error: parsed.error.format().email?._errors[0] || "Invalid input",
    };
  }

  const email = parsed.data.email;

  // Simulate sending email (Replace with actual email sending logic)
  console.log(`Sending confirmation email to: ${email}`);

  return { success: "Confirmation email sent successfully!" };
}

const manageAccountSchema = z.object({
  newEmail: z.string().email("Invalid email address").optional(),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters")
    .optional(),
  oldPassword: z.string().min(6, "Old password is required"),
});

export async function updateAccount(
  formData: z.infer<typeof manageAccountSchema>,
) {
  const parsed = manageAccountSchema.safeParse(formData);

  console.log("manage data:", parsed);

  if (!parsed.success) {
    return { error: parsed.error.format() };
  }

  const { newEmail, newPassword, oldPassword } = parsed.data;

  // Simulate a database check for old password
  const isOldPasswordCorrect = oldPassword === "currentPassword"; // Replace with actual DB check
  if (!isOldPasswordCorrect) {
    return { error: { oldPassword: "Old password is incorrect." } };
  }

  // Simulate updating email/password
  console.log("Updating account:", { newEmail, newPassword });

  return { success: "Account updated successfully!" };
}

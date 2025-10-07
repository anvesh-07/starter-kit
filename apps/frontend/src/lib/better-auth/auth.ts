import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { db } from "../database/db";
import * as schema from "@/lib/database/schema";
import {
  AUTH_DELIVERY_EMAIL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  PROJECT_NAME,
} from "../env";
import ForgotPasswordEmail from "../../../email/forget-password.email";
import resend from "../resend/config.resend";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: `${PROJECT_NAME} <${AUTH_DELIVERY_EMAIL}>`,
        to: user.email,
        subject: "Reset your password",
        react: ForgotPasswordEmail({
          email: user.email,
          link: url,
          projectName: PROJECT_NAME,
        }),
      });

      if (error?.message) {
        console.log("Error in sending Email: ", error);

        throw new Error(error.message);
      }
    },
  },
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [admin(), nextCookies()], // make sure this is the last plugin in the array
});

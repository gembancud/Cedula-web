import { init } from "next-firebase-auth";

import firebaseClientInitConfig from "./firebaseConfig";

const initAuth = () => {
  init({
    debug: true,
    authPageURL: "/login/",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login/",
    logoutAPIEndpoint: "/api/logout/",
    onLoginRequestError: (err) => {
      console.error(err);
    },
    onLogoutRequestError: (err) => {
      console.error(err);
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,

        // @ts-ignore
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,

        // The private key must not be accessible on the client side.
        // privateKey: process.env.FIREBASE_PRIVATE_KEY
        //   ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
        //   : undefined,
        // @ts-ignore
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
          : undefined,
      },
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
    },
    firebaseClientInitConfig,
    cookies: {
      name: "Cedula-Web", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === "true", // set this to false in local (non-HTTPS) development
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err);
      console.log("Verify token error", err);
    },
    onTokenRefreshError: (err) => {
      console.error(err);
      console.log("onTokenRefreshError", err);
    },
  });
};

export default initAuth;

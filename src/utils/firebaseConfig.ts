const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY!, // required
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN, // required
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // required
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
export default config;

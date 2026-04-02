import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBZvl8WZdNdvHvsIM_N7Izff2DK7TZCk8o",
  authDomain: "payzen-bank.firebaseapp.com",
  projectId: "payzen-bank",
  storageBucket: "payzen-bank.firebasestorage.app",
  messagingSenderId: "419558843124",
  appId: "1:419558843124:web:2f1240cfa206fea49574a1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
export { getToken };
export default app;
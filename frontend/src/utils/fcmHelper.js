import { messaging, getToken } from "../firebase";

const VAPID_KEY = "your-vapid-key-here"; // Replace with your actual VAPID key from Firebase Console

export const requestFcmToken = async () => {
  try {
    // Request notification permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission not granted.");
      return null;
    }

    // Get FCM token
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("No FCM token available.");
      return null;
    }
  } catch (err) {
    console.error("Error getting FCM token:", err);
    return null;
  }
};

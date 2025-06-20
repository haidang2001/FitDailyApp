import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

// Save reminder preference to Firestore
export const saveReminderSetting = async (enabled) => {
  if (auth.currentUser) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await setDoc(userRef, { reminderEnabled: enabled }, { merge: true });
  }
};

// Load reminder preference from Firestore
export const loadReminderSetting = async () => {
  if (auth.currentUser) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().reminderEnabled ?? false;
    }
  }
  return false;
};

// The rest remains unchanged
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status === 'granted') {
    return true;
  } else {
    Alert.alert(
      'Permission Denied',
      'You need to enable notifications in your device settings to receive reminders.'
    );
    return false;
  }
};

export const scheduleDailyReminder = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🏋️ Time to workout!",
        body: "Stay consistent and hit your fitness goals 💪",
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true,
      },
    });
    Alert.alert('Reminder Set', 'You will get daily workout reminders at 9:00 AM.');
  } catch (error) {
    console.error("Notification error:", error);
    Alert.alert('Error', 'Failed to schedule reminder.');
  }
};

export const cancelAllReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  Alert.alert('Reminder Off', 'Workout reminders have been disabled.');
};

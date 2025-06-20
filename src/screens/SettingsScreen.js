import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import {
  requestNotificationPermission,
  scheduleDailyReminder,
  cancelAllReminders,
  saveReminderSetting,
  loadReminderSetting
} from '../services/NotificationService';

const SettingsScreen = () => {
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const granted = await requestNotificationPermission();
      setPermissionGranted(granted);

      const savedState = await loadReminderSetting();
      setReminderEnabled(savedState);

      if (granted && savedState) {
        await scheduleDailyReminder();
      }
    })();
  }, []);

  const toggleReminder = async (value) => {
    setReminderEnabled(value);
    await saveReminderSetting(value);

    if (value && permissionGranted) {
      await scheduleDailyReminder();
    } else if (!value) {
      await cancelAllReminders();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optional: navigate to login screen
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Daily Workout Reminder</Text>
        <Switch
          value={reminderEnabled}
          onValueChange={toggleReminder}
          disabled={!permissionGranted}
        />
      </View>

      <View style={styles.logoutContainer}>
        <Button title="Log Out" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  settingLabel: {
    fontSize: 16,
  },
  logoutContainer: {
    marginTop: 'auto',
  },
});

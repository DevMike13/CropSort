import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import firebase from '../../firebase'; 
import Toast from 'react-native-toast-message';

import styles from './notification.style';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  // Real-time listener to fetch notifications from Firestore
  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('notifications')
      .onSnapshot(
        (snapshot) => {
          const fetchedNotifications = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotifications(fetchedNotifications);
        },
        (error) => {
          console.error('Error fetching notifications:', error);
        }
      );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Delete notification
  const handleDelete = async () => {
    if (selectedNotificationId) {
      try {
        // Delete the notification from Firestore
        await firebase.firestore().collection('notifications').doc(selectedNotificationId).delete();

        // Close the modal
        setModalVisible(false);

        // Show success toast
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Notification deleted successfully.',
        });
      } catch (error) {
        console.error('Error deleting notification:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to delete notification.',
        });
      }
    }
  };

  // Show modal
  const openDeleteModal = (id) => {
    setSelectedNotificationId(id);
    setModalVisible(true);
  };

  // Render a single notification item
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => openDeleteModal(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noNotifications}>No notifications available</Text>
      )}

      {/* Modal for delete confirmation */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={{ marginVertical: 20 }}>
              <Ionicons name="trash" size={40} color="red" />
            </View>
            <Text style={styles.modalText}>Are you sure you want to delete this notification?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleDelete}
              >
                <Text style={styles.confirmButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Toast position="top" />
    </View>
  );
};

export default NotificationScreen;

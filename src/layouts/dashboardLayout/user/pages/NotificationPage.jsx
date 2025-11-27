import React, { useState, useEffect } from 'react';
import { Bell, X, AlertCircle } from 'lucide-react';
import axiosInstance from '../../../../config/axiosInstance';

export default function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMs = now - date;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return date.toLocaleDateString();
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/api/notifications');
            const notificationsData = response.data.success ? response.data.data : response.data;
            setNotifications(notificationsData);
            setError(null);
        } catch (err) {
            console.error('Error fetching notifications:', err);
            setError('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const removeNotification = async (id) => {
        try {
            await axiosInstance.delete(`/api/notifications/${id}`);
            setNotifications(notifications.filter(n => n.id !== id));
        } catch (err) {
            console.error('Error removing notification:', err);
        }
    };

    const markAsRead = async (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));

        try {
            await axiosInstance.post(`/api/notifications/${id}/read`);
        } catch (err) {
            console.error('Error marking notification as read:', err);
            setNotifications(notifications.map(n =>
                n.id === id ? { ...n, read: false } : n
            ));
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading notifications...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={fetchNotifications}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">

                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="ml-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </h1>
                </div>

                {notifications.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No notifications yet</p>
                        <p className="text-gray-400 text-sm mt-1">We'll let you know when something new comes up.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notif) => {
                            return (
                                <div
                                    key={notif.id}
                                    className={`
                                        relative rounded-lg p-4 border-l-4 border-blue-400 transition-all duration-300 group
                                        ${notif.read
                                            ? 'bg-white shadow-sm opacity-80 hover:opacity-100'
                                            : 'bg-blue-50 shadow-sm hover:shadow-md'
                                        }
                                    `}
                                >
                                    <div className="flex gap-4 items-start">
                                        <Bell className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5 text-blue-600" />

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-blue-600 text-sm sm:text-base">
                                                {notif.type.replace(/_/g, ' ')}
                                            </h3>
                                            <p className="text-gray-700 text-sm sm:text-base mt-1">
                                                {notif.message}
                                            </p>
                                            <p className="text-gray-500 text-xs sm:text-sm mt-2">
                                                {formatTimestamp(notif.createdAt)}
                                            </p>

                                            {!notif.read && (
                                                <button
                                                    onClick={() => markAsRead(notif.id)}
                                                    className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700 transition"
                                                >
                                                    Mark as read
                                                </button>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => removeNotification(notif.id)}
                                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition opacity-0 group-hover:opacity-100"
                                            aria-label="Remove notification"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
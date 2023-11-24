// SubscribeButton.tsx
import React, {useEffect, useState} from 'react';
import Toggle from '../Toggle/Toggle';
import {BASE_URL} from "../../constants";

interface Props {
    publicKey: string;
}

const SubscribeButton: React.FC<Props> = ({ publicKey }) => {
    const [isToggled, setIsToggled] = useState(() => {
        // Retrieve the initial value from localStorage, or default to false
        return JSON.parse(localStorage.getItem('isToggled') || 'false');
    });

    function urlBase64ToUint8Array(base64String: string) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        try {
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        } catch (e) {
            console.error('Failed to convert VAPID key:', e);
            throw e;
        }
    }

    useEffect(() => {
        localStorage.setItem('isToggled', JSON.stringify(isToggled));
    }, [isToggled]);


    const subscribeToNotifications = () => {
        navigator.serviceWorker.ready.then(registration => {
            const convertedVapidKey = urlBase64ToUint8Array(publicKey);
            console.log(convertedVapidKey)
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            }).then(subscription => {
                fetch(BASE_URL + '/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(subscription),
                });
                setIsToggled(!isToggled); // Update the state on toggle
            });
        });
    };




    return (
        <Toggle
            Text="Subscribe to Notifications"
            onClick={subscribeToNotifications}
            id_name={"Subscribe"}
            checked={isToggled}
        />
    );

};

export default SubscribeButton;

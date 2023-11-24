import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

// Service Worker Registration
if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed:', registrationError);
            });
    });
}else {
    console.warn('Push messaging is not supported');
}

export const subscribeUserToPush = () => {
    return navigator.serviceWorker.ready.then(function(registration) {
        const pushOptions = {
            userVisibleOnly: true,
            // You can also set your public VAPID key here for web push protocol
        };
        return registration.pushManager.subscribe(pushOptions);
    })
        .then(function(subscription) {
        })
        .catch(function(error) {
            console.error('Failed to subscribe the user: ', error);
        });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

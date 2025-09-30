import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ReactQueryProvider } from "./src/providers/ReactQueryProvider"
import LoadingOverlay from 'react-loading-overlay-ts';
import { BounceLoader } from 'react-spinners';
import { useAppSelector } from './src/hooks';
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './src/store';

const AppWrapper = () => {
    const isLoading = useAppSelector(state => state.loading.value);

    return (
        <LoadingOverlay
            active={isLoading}
            spinner={<BounceLoader color="#36d7b7" />}
            text="Loading..."
        >
            <App />
        </LoadingOverlay>
    );
};


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <ReactQueryProvider>
                    <ToastContainer />
                    <AppWrapper />
                </ReactQueryProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { ToastContainer } from 'react-toastify';
import { ReactQueryProvider } from "./src/providers/ReactQueryProvider"
import LoadingOverlay from 'react-loading-overlay-ts';
import { BounceLoader } from 'react-spinners';
import { useAppSelector } from './src/hooks';
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

function RootApp() {
    const isLoading = useAppSelector((state) => state.loading.value);
    return (
        <LoadingOverlay
            active={isLoading}
            spinner={<BounceLoader color="#36d7b7" />}
            text="Loading...">
            <ReactQueryProvider>
                <ToastContainer />
                <App />
            </ReactQueryProvider>
        </LoadingOverlay>
    );
}


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RootApp />
        </Provider>
    </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { ToastContainer } from 'react-toastify';
import { ReactQueryProvider } from "./src/providers/ReactQueryProvider"
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ToastContainer />
            <ReactQueryProvider>
                <App></App>
            </ReactQueryProvider>
        </Provider>
    </React.StrictMode>
);

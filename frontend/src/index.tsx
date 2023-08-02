import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from "react-auth-kit";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <AuthProvider authType={"cookie"}
                  authName={"_auth"}
                  cookieDomain={window.location.hostname}
                  cookieSecure={false}
    >
        {/*<UserContextProvider>*/}
            <App/>
        {/*</UserContextProvider>*/}
    </AuthProvider>
);

reportWebVitals();

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './components/store/index.js';
import { BrowserRouter } from 'react-router-dom';
import CardContextProvider from './components/Context/Context.js';
import '@ant-design/compatible';
import App from './App.tsx';
import { ConfigProvider} from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <CardContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </CardContextProvider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);

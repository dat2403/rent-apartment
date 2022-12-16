import { Provider } from 'react-redux';
import App from './App';
import { persist, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function EntryPoint() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  );
}

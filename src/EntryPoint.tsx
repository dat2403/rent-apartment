import { Provider } from 'react-redux';
import App from './App';
import { CssBaseline } from '@mui/material';
import { store } from './redux/store';

export default function EntryPoint() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  );
}

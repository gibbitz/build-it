// dev wrapper for app.jsx to inject debugging libraries (Mocks etc.)
import * as ReactDOM from 'react-dom';
import 'mimic';
import SharedAppDataCache from '../inc/SharedAppDataCache';
import '../app.jsx';

window.cache = SharedAppDataCache;

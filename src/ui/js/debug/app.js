// dev wrapper for app.jsx to inject debugging libraries (Mocks etc.)
import * as ReactDOM from 'react-dom';
import 'mimic';
import ApplicationCache from '../middleware/applicationCacheMiddleware';
import '../app.jsx';

window.cache = ApplicationCache;

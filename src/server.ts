process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import ParentRoute from '@/routes/parents.route';
import validateEnv from '@utils/validateEnv';
import ChildrenRoute from './routes/children.route';
import DeviceRoute from './routes/devices.route';

validateEnv();

const app = new App([new IndexRoute(), new ParentRoute(), new AuthRoute(), new ChildrenRoute(), new DeviceRoute()]);

app.listen();

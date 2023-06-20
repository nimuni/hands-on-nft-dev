import App from '@/app';
import IndexRoute from '@routes/index.route';
import IPFSRoute from '@routes/IPFS.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new IPFSRoute()]);

app.listen();

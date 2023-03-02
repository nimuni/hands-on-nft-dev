import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import fileUpload from "express-fileupload";
import { logger, stream } from '@utils/logger';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeViewEngine();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(process.env.NODE_ENV)
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(fileUpload(
      {
        limits: {
          fileSize: 1024*1024*100 // 100 MiB
        },
        abortOnLimit: true,
        createParentPath: true,
        useTempFiles: true,
        tempFileDir: '/tmp/',
        debug: true
      }
    ));
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    // this.app.use(cors({}));
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      next();
    });

    // TODO csp작업 해놔야함. 현재 처리x 아래 활성화 필요
    // helmet default
    // Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
    // Cross-Origin-Embedder-Policy: require-corp
    // Cross-Origin-Opener-Policy: same-origin
    // Cross-Origin-Resource-Policy: same-origin
    // Origin-Agent-Cluster: ?1
    // Referrer-Policy: no-referrer
    // Strict-Transport-Security: max-age=15552000; includeSubDomains
    // X-Content-Type-Options: nosniff
    // X-DNS-Prefetch-Control: off
    // X-Download-Options: noopen
    // X-Frame-Options: SAMEORIGIN
    // X-Permitted-Cross-Domain-Policies: none
    // X-XSS-Protection: 0
    // 외부스크립트 허용
    // this.app.use(helmet.contentSecurityPolicy({
    //   directives: {
    //     "script-src": ["'self'", "https://cdn.jsdelivr.net", "https://unpkg.com"],
    //     "script-src-elem": ["'self'", "https://cdn.jsdelivr.net", "https://unpkg.com"],
    //     "style-src": ["'self'", "https://cdn.jsdelivr.net"]
    //   }
    // }));


    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeViewEngine() {
    const publicDirectoryPath = path.join(__dirname, "public");
    this.app.use(express.static(publicDirectoryPath));

    // express-ejs-layouts 세팅
    this.app.use(expressLayouts);
    this.app.set('layout', './layout/layout');
    this.app.set('layout extractScripts', true);

    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine','ejs');
    this.app.use("/assets", express.static(path.join(__dirname, "public","assets")))
    this.app.engine('html', require('ejs').renderFile);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

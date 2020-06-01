import { Express } from 'express';
import cors, { CorsOptions } from 'cors';

/**
 * Setup cors for the API
 */
export default (expressApp: Express): void => {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV !== 'production') {
    expressApp.use(cors());
  } else {
    const corsList: Array<string> = []; // ex: ["https://apihost.com/"]
    const corsOptions: CorsOptions = {
      origin: (origin, callback) => {
        if (origin && corsList.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };

    expressApp.use(cors(corsOptions));
  }
};

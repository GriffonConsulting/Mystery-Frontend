const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
generateApi({
  fileName: 'api-generated',
  output: path.resolve('./src/__generated__'),
  url: 'https://localhost:8080/swagger/v1/swagger.yaml',
  httpClientType: 'axios',
  moduleNameFirstTag: false,
}).catch(e => console.error(e));

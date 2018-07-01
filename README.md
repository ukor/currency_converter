## Example
A working example is hosted on github page https://ukor.github.io/currency_converter/

A simple currency converter app that uses
* service worker,
* IndexDB, and
* Cache

Code to service work and caching `/src/service_worker`  and IndexDb in `/src/index_db`

Implementation of caching to IndexDb is in `src/components/Form.js`
Implementation of caching static files is in `src/service_worker/sw.js`

***
> Built with reactJS and w3.css with out the `creact-react-app`.
***

## Requirements
* Nodejs

clone and `npm run start` in your local machine and `npm run build` for production ready site
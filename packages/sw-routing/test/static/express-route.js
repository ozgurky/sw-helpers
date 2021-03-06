/* global goog */

importScripts('/packages/sw-routing/build/sw-routing.min.js');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

const routes = [];

routes.push(new goog.routing.ExpressRoute({
  path: '/static',
  handler: {
    handle: () => Promise.resolve(new Response('static response')),
  },
}));

routes.push(new goog.routing.ExpressRoute({
  path: '/echo3/:1st/:2nd/:3rd',
  handler: {
    handle: ({params}) => Promise.resolve(
      new Response(JSON.stringify(params), {
        headers: {'content-type': 'application/json'},
      })
    ),
  },
}));

const router = new goog.routing.Router();
router.registerRoutes({routes});

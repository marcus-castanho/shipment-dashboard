# Shipments dashboard - Technical decisions and discussions

## 1
- On the backend, I structured the application with the modules: users, and prisma to separate domains and responsibilities. For shipments, I combined a REST controller for CRUD operations with a WebSocket gateway for real-time updates. Both layers are protected with auth guards: the REST API verifies a Bearer token in the request header, and the WebSocket gateway enforces the same token validation not only on connection establishment but also on each incoming message. This gave me consistency in authentication across protocols while keeping the security model simple. I also chose Prisma as the ORM for its seamless integration with NestJS and ability to accelerate setup without compromising type safety.

- On the frontend, I structured the codebase into pages, components, and services. The main feature, ShipmentsDashboard, consumes both the REST API and WebSocket events. I created a User context to easily switch tokens between different user roles, and a Shipments context to share a single WebSocket connection across the app. To manage state, I chose Zustand instead of React’s built-in useState within contexts, because it prevents unnecessary re-renders of the entire component tree and provides a clean API for accessing specific state data.


## 2 

If the app needed to handle millions of shipment records, the first two things I would add/change are:

- Create composite indexes in the DB to optimize the querys with multiple filters - userId, code and status are some of the frequently searched fields in the same queries;
- Implement cursor based pagination so the paginated queries are optimized, this way, the server do not read from unused rows with something like limit/offset;


## 3. 

If I had more time and the project were to be more secure and user friendly, I would:
- Add better observability with an external service like sentry;
- Improve the filter capabilities of the query routes using pagination;
- Create a role-based authentication/authorization so that managing routes such as /users are not public;
- Create authorization verification so that each user only updates their resources unless it is an admin user;


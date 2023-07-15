# Product catalog

My name is Barbara and I made this project. I tried to follow an approach to divide the client and server side and create a solution with generic functions that can be reused in a different project.

Feel free to analyse my decisions and prepare your questions and doubts.

## Technical Decisions

By implementing some logic in a server-side project, we can centralize the business logic, leverage server-side processing power, and decouple the frontend from the specifics of the mock datastore. 

This approach easier scalability, maintainability, and potential reuse of the API server in different frontend applications.

In sum, the server-side project is dedicated to the filtering process. The client-side is dedicated to the UI logic. It handles the UI components and updates the frontend user interface based on the API responses received from the server-side project. It uses the data returned from the server to dynamically update the displayed products and reflect changes based on the applied filters.

### Server side
The main goal of this server side project is to help with the catalog process and to perform updates on both product and categories.

For the API routes, here's a resume of the main routes and payloads or queries that needs to be included in each case.
All the routes were designed with the **/api/v1/** in the call, in order to insure that I'm using common good practices and that there's a new version available. This decision is based on futures updates on the functions and to help with migrations.

---
**Product Requests**

You can find a collection for **Postman** in the server-side root file (``products-api/test/collectionPostman``).

According to the README provided in the gitlab platform,for the resolution of this server-side we need to design a few routes.
Here's the available endpoints:

    GET http://localhost:8000/api/v1/products
    POST http://localhost:8000/api/v1/products

    GET http://localhost:8000/api/v1/products/:productId
    DELETE http://localhost:8000/api/v1/products/:productId
    PUT http://localhost:8000/api/v1/products/:productId

    GET http://localhost:8000/api/v1/products/filtering?inputText=SOME_INPUT_TEXT

The decision to add the productId as route parameter was because the route parameters provide a clean and semantic URL structure that is easy to understand and remember.

Query parameters are commonly used for filtering, pagination, or optional parameters that don't impact the core route structure. And, for that reason I used it in the filtering request.

---
**Categories Requests**

Here's the available endpoints:

    GET http://localhost:8000/api/v1/categories 
    POST http://localhost:8000/api/v1/categories //this will be only used in the backend side to create new categories

    GET http://localhost:8000/api/v1/categories/:categoryId
    PUT http://localhost:8000/api/v1/categories/:categoryId

---
**Unit tests**

The performed tests were made in the backend side, focused in the service file where the main logic is allocated. The tests were made with Jest and you can find a way to run the tests in the setup section.
Due to type module implementation, jest.sypon is not working as expected in order to check all the tests. You maybe can't run the tests as expected but the example is in the test directory.

---
## Improvements and future work
Once it was not possible to me to finish all the details for this project at time, here's some points that needs to be implemented:

- **Pagination** :: For the pagination the GET products logic needs to receive some query parameters for the pageNumber and the number of products per page. Then, it will be possible to create a database query to find the next products to be displayed in the frontend. As well, in the client-side a pagination component needs to exist along with the API requests.
- **JWT** :: It needs to have a new request middleware to check if it's possible to perform the 
- **Migrate to a relational DB** :: this solution was built with mongoDB to be more easier to access online and to insert documents. But, for this specific problem, the best approach is to use a relational DB in order to facilitate the communication between the Product table and the Category table. Here, 1 Product can have 1 Category, but 1 Category can be related to MANY products.
- **Unit tests** :: improve unit tests
- **Frontend** : The frontend app needs to receive some uptades to re-use more the CSS files. It also need to get a solution for refresh 404 problem in all the routes except the base one.

---
## Setup
In the following points, you will find the main steps to run the server side and how to test the main logic on the server side with unit tests.
### Server side
To run the server, you need to perform the following coding lines:

    $ npm install
    $ npm run start //this will start the server without development mode

This server will be accessible at ``http://localhost:8000``. 

To perform the unit tests, please run the following line:

    $ npm run test

---
### Client side
To run the client project, you need to perform the following coding lines:

    $ npm install
    $ npm run dev //this will start a local development server
This project will be accessible at ``http://localhost:3000``.

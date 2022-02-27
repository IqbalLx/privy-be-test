# Backend Enginner Privy Test
### version: 0.0.0 (February 27, 2022)

## Project Description

This project is made as a pre-test for Backend Engineering position at privyID. To make clear separation of concern within the architecture we use [Clean Code Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Build with

- [TypeScript](https://www.typescriptlang.org/)
- [Node JS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

Package Description:
* **config** use this package to store any base configuration class e.g. WebSecurity, Http Configs, and so on.
* **external** use this package if want to make new integration to 3rd party please make new package every new company development every company should have their own service and DTO to interact with.
* **src/business** use this package to create new service to compute every business process needed from front-end or other backend who need this service using pure js function.
* **src/controller** use this package to store any rest/ws controller class for making request to this project.
* **src/dto** use this package to store any DTO used to transport object between layer read _Clean Code Architecture_ for more information on this.
* **src/model** use this package to store any Databases schemas.
* **src/repository** use this package to store any DTO that interact with the database. Please create the abstraction first and then implement it inside **implement** subfolder.

## Tools that might help to run or build this project

- [Docker](https://www.docker.com/) used to help you build this project.

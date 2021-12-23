### Front End
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)

### Back End
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

### Test & Development Tools
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## Other API's and Libraries Used
- Google Calendar API
- Google Maps API
- bcrypt
- Socket.io
- New Relic
- K6

## *See [Project Board](https://trello.com/b/yY2RbvWd/agile-sprint-board) for current project status.*

## About The Project

### Project Summary
Chad's List is a platform to allow users to give unwanted items to the community utilizing a mobile-first design.

### [Login and Register](components/)
- Developed by [Anthony Psyk]
- Users will be able to login or register for the application, they will be able to add a profile photo, email address, and say if they represent a charity origanization or not. Upon clicking the signup button, they will be redirected to the Item View

### [Explore & Search](components/)
- Developed by [Vinh Le, Devon Li]
- User can search items with any of the following inputs: item name, location, and distance.

### [Filter](components/)
- Developed by [Devon Li, David Han]
- Users can filter out items by categories, and the filtered items will be shown on the home page and the map.
- Users can click on a filter button to reveal a sidebar, allowing users to filter by category.

### [Map View](components/)
- Developed by [Vinh Le]
- Users can toggle a map that shows items in relation to their location, based on the search settings provided in the filter and the items listed in Item View.

### [Create a Post](components/)
- Developed by [Ximing Chen]
- Users can post an item with the following inputs: item image, item name, and item descition.

### [Item View](components/)
- Developed by [Ximing Chen, David Han, Devon Li]
- Users can access the item informaiton by clicking on the item card in the home page. A modal will pop up displaying the item images, name, location, and description. The claim button allows users to claim the item in order to pick it up. The message button initiates the chat with the item dornor.

### [Receipts](pages/history/)
- Developed by [Ximing Chen, Yina Xing]
- Users can generate a receipt for their donations claimed by charities. The receipt will have informtion on each item's condition and value so that the user can use it for tax reduction purpose.

### [Claim History](pages/history/)
- Developed by [Yina Xing, Ximing Chen]
- Users can access their claims history, search a claim by name and check the status of the claim. Clicking the name of the item will take user to the item detail modal, where the user can unclaim an item if they do not want it anymore, or message the donor of the item.

### [Donation History](pages/history/)
- Developed by [Yina Xing, Ximing Chen]
- Users can access their donations history, search a donation by name and check the status of the donation. Clicking the name of the item will take user to the item detail modal, where the user can delist an item if it has not been claimed, or message the claimer of the item.

### [Chat](pages/chat)
- Developed by [David Han, Ximing Chen, Devon Li]
- Users are able to message other users once claiming an item. User messages will persist by saving messages in Postgres. Chat conversations will be unique to users based on a unique conversation ID that is generated when user first messages the donor. Socket.io is used to create a real time chat functionality

### [Backend Architecture](backend/) and [Database](backend/)
- Developed by [Mitch Rosenlund, Yina Xing, David Han, Jeffrey Stewart]
- Utilized faker.js library to create mock data for items and users
- Implemented model, view and route folder structure
- Sequelize was used to create and model data
- Implemented user authentication with Json Web Tokens and Bcrypt to hash user passwords
- Authentication middleware was implemented to verify the JWT client side and sending back correct user information on refresh
- Created a chat server that would listen to a socket connection clientside when users start a conversation

## Installation

```html
  Run all commands in root directory

  // install modules
  npm install

  // Start Application
  npm run start

  // Start Development Server
  npm run dev

  // Start Server
  npm run backend

  // Start Chat
  npm run chat

  // Seed pre-customized fake data
  // Navigate to the postgres server
  drop database if exists chadslist;
  create database chadslist;
  // Go back to the root directory
  node backend/db/setup/faker.js
```

## Testing
```html
  // Change into testing directory
  cd client/src/spec

  // Run Jest Test Code
  npm run test

  // Start Instance with New Relic
  npm run newRelic

  // Start Stress Testing with K6
  npm run k6
```


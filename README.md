# My Wallet

An app that helps you keep track of your expenses and profits.

## About

This is an api that get the transaction history from a database.

Below are the implemented features:

- Sign Up
- Persistent login
- Registers cash inflows and outflows

By using this app any user can learn how they've been using their money and always keep track of your balance.

## Technologies

The following tools and frameworks were used in the construction of the project:<br>

<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
</p>

## How to run

1. Clone this repository: git clone https://github.com/rafaelib/my-wallet-api.git
2. Clone the front-end repository at https://github.com/rafaelib/front-my-wallet.git
3. Follow instructions to run front-end at https://github.com/rafaelib/front-my-wallet.git
4. Install dependencies

```bash
npm i
```

5. Create a Database named mywallet using postgreSQL

6. Build the project running

```bash
npm run build
```

7. Create the migrations

```bash
npm run typeorm migration:run
```

8. Run the server with

```bash
npm run dev
```

9. Finally, you can use the front-end to consume this API.

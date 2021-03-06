/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/register', 'AuthenticationController.register').as('register');

  Route.post('/login', 'AuthenticationController.authenticate').as('login');

  Route.delete('/logout', 'AuthenticationController.logout').as('logout');
})
  .prefix('/auth')
  .as('auth');

Route.get('/dashboard', 'DashboardController.index').as('index');

Route.post('/favorite', 'FavoritesController.favorite').as('favorite');

Route.post('/favoritebands', 'FavoritesController.getFavoriteBands').as('favoriteBands');

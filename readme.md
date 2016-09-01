## Project URL: https://farmerstable.herokuapp.com/
## Google API Project Name: tranquil-buffer-133221

Farmer's Table is an application designed to reconnect communities to their local farmers.

## DB
Postgres DB name: 'ftdb'

## API:
The Farmer's Table API makes available data on US farms and registered Farmer's Markets.

Responses are in JSON format.
Requests should be formatted as follows:
<!-- TODO provide API interface-->
routes:
/csa
  /csa/all => returns a list of CSAs
  /csa/details/:id => returns a CSA by ID
/signin
  /signin => provides signin support (validation)
/users  
  /users => provides list of all users
  /users/user/:id => returns a user object by ID
/farms
  /farms/all => provides list of all farms
  /farms/details/:id => provides farm object by farm ID
  /farms/farmers/:id => returns a farm object that a farms owns by passing farmer ID





## BUGLIST
1. Seeds with IDs cause first (n) of new user posts to fail until pkey_id begins incrementing after seed IDs.
2. Prevent access to '/myaccount' if user is not signed in (route auth)

## Haversine formula for lat/lng => miles(https://en.wikipedia.org/wiki/Haversine_formula)
## I think that public/javascripts/controllers.js can be reduced to a single controller; maybe two?

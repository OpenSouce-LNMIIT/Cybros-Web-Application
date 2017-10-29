
![Cybros](https://github.com/phunsukwangdu/image/blob/master/cybros.jpg)

![DUB](https://img.shields.io/dub/l/vibe-d.svg?style=flat) [![Join the chat](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg)](https://gitter.im/LNMIIT-Computer-Club/Lobby)
# Cybros Web Application

Official web application of Cybros.
Website is live now:
https://cybroslnmiit.herokuapp.com/

## Getting Started

### Prerequisites

Nodejs, mongodb

### Installing
```
$ git clone https://github.com/Cybros/Cybros-Web-Application.git
$ cd Cybros-Web-Application
$ npm install
```
## Configure Database server
open in new terminal window
```
$ mongod
```
## Deployment

After configuring database server type code given below in terminal window(other than the one in which mongod server is running)
```
$ npm start
```
you must get something like this
```
$ Magic happens in port:3000
```
Then go to http://localhost:3000/ 

## Managing data

Go to mongo terminal by typing
```
$ mongo
```
Then use database named "Cybros", in this all the user's data is saved in the collection named "users".

OR if you want to generate a ".csv" file use:
```
$ mongoexport --host localhost --db Cybros --collection users --csv --out text.csv --fields username,Password,Email
```
## Email Config
To configure signup authentication from email part you need to replace "YOUR-EMAIL-ID" with your email ID and "PASSWORD" with your password in routes/signup.js. and possibly configure your EMAIL account's security options.

## Create administrator

Go to mongo terminal by typing
```
$ mongo
```
Use the correct database by typing
```
$ use Cybros
```
Now you have to insert an admin data manually in mongoDB
and make sure you make "HasAccess" set to "true" as it is "false" by default
```
db.admins.insert({username:YOURUSERNAME, Password:YOURPASSWORD, HasAccess:true});
```
Admin panel can be accessed from: http://localhost:3000/admin/

## Built With

* [Nodejs](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [JQuery](https://jquery.com/)
* [Bootstrap](http://getbootstrap.com/)

## Contributing

Just open an issue with your suggestion.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


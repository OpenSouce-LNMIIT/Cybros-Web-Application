
![Cybros](https://github.com/phunsukwangdu/image/blob/master/cybros.jpg)

![DUB](https://img.shields.io/dub/l/vibe-d.svg?style=flat) [![Join the chat](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg)](https://gitter.im/LNMIIT-Computer-Club/Lobby)
# Cybros Web Application

Official web application of Cybros.

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
## Create administrator

Go to mongo terminal by typing
```
$ mongo
```
Now you have to insert an admin data mannually in mongoDB
and make sure you make "HasAccess" set to "true" as it is "false" by default
```
db.admins.insert({username:YOURUSERNAME, Password:YOURPASSWORD, Hasaccess:true});
```
Admin panel can be accessed from: http://localhost:3000/admin/

## Built With

* [Nodejs](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [JQuery](https://jquery.com/)
* [Bootstrap](http://getbootstrap.com/)

## Contributing Practices

**Commits**

* Write clear and meaningful git commit messages (Do read http://chris.beams.io/posts/git-commit/)
* Make sure your PR's description contains GitHub's special keyword references that automatically close the related issue when the PR is merged. (More info at https://github.com/blog/1506-closing-issues-via-pull-requests )
* When you make very very minor changes to a PR of yours (like for example fixing a failing Travis build or some small style corrections or minor changes requested by reviewers) make sure you squash your commits afterward so that you don't have an absurd number of commits for a very small fix. (Learn how to squash at https://davidwalsh.name/squash-commits-git )
* When you're submitting a PR for a UI-related issue, it would be really awesome if you add a screenshot of your change or a link to a deployment where it can be tested out along with your PR. It makes it very easy for the reviewers and you'll also get reviews quicker.


**Join the development**

* Before you join development, please set up the project on your local machine, run it and go through the application completely.
* If you would like to work on an issue, drop in a comment at the issue. If it is already assigned to someone, but there is no sign of any work being done, please feel free to drop in a comment so that the issue can be assigned to you if the previous assignee has dropped it entirely.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


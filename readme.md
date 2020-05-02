Hi,
Here are the instructions to clone,run and test the aplicaation.

-CLONING

clone into our local machine using this command:

git clone https://charanjana@bitbucket.org/charanjana/car-rental.git

-RUNNING the Applicaton

After successfully cloning the application.

-Navigate to the project file and execute following commands.

-npm install

 this will install necessary node modules 
 
 -npm start 
 
 this command now starts the application on localhost port 80
 
 -TESTING the local Application API's with postman
 
 -Find the postman collection for testiing the local application in the folder named "postman" in project directory.
 
 -for testing the local apllicaton import "whitepanda local api.postman_collection.json".
 
 -also import the environment "jwt.postman_environment.json"(Necessary for JWT authentication).
 
 NOTE 1:While accessing the Admin API's for the first time, hit the /authenticate API it will let you access remianing admin API's
 
 NOTE 2:please don't change the username and password values in the body while hitting the authenticate API.
 
 
 -TESTING the server Application API's with postman
 
 -Find the postman collection for testiing the local application in the folder named "postman" in project directory.
 
 -for testing the local apllicaton import "whitepanda server api.postman_collection.json".
 
 -also import the environment "jwt.postman_environment.json"(Necessary for JWT authentication).
 
 NOTE 1:While accessing the Admin API's for the first time, hit the /authenticate API it will let you access remianing admin API's
 
 NOTE 2:please don't change the username and password values in the body while hitting the authenticate API.
 
 THANK YOU!
 
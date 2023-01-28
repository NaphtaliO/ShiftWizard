# TeamSoftwareProject

## Frontend
I got started on the frontend. I created some very basic authentication flow. I used reactJS because it's really the easiest thing ever. React is a javascript library from building web UIs. It's not complicated at all beacuse at it's core react is still only HTML and CSS
To run the react application you need to install 
Node 18 from here https://nodejs.org/en/
Then after that you cd into frontend and run "npm install"
after that you run "npm start" its very simple. It should open on it's own.
inputs like name and address can be removed or added it's just a basic implementation to get something working

## Backend
cd into the backend folder
Activate the dev environment on mac with 
**. venv/bin/activate**
or on windows with
**venv\Scripts\activate**

then **pip install -r requirements.txt** to install all the modules in the requirements.txt file

then finally run the server with **flask --app app.py --debug run** this will refresh the server every time you make a change to it

I'm using Flask sqlalchemy to connect to mysql because I couldn't get flask and mysql working in any other way but it works which is the main thing.
Flask sqlalchemy have their own set of APIs for interacting with the database
**I took the liberty of hosting a mysql db to save yous the hassle of installing it locally. It's a fucking hassle but this way its a lot easier**
I referenced their site https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/ which eventually directed me here
https://docs.sqlalchemy.org/en/14/orm/queryguide.html on APIs for querying the database and so on.
It's not too complicated in my opinion have a go at it if you need help then jsut ask
I commented the best I could but if you don't get it then again just ask I'll do my best to explain


### How it works
The user sends inputs like name email password and so on. The server checks if the user exists if not it adds the user to the database and creates a token for authentication and sends the response back i.e. user information plus the token

Same with login. It checks if the user exists then it checks if the password matches with that already stored password in the database if so respond accordingly pretty simple stuff

If you install any new modules with pip you need to say **pip freeze > requirements.txt** to add it to the requirements.txt file
so that others can see it and install it

# Note
After making routes currently there's no UI to send POST or GET request to the server. I advise using an API platform like **Postman**.
Which is what I use. If you have something that you use personally then have a go

Also you can visually look at the db with MySQL Workbench you'll have to install it if you don't have it from last year
db credentials are username: naphtali, password: naphtali123, host: mydb.cg1kk4ysnwdb.eu-west-1.rds.amazonaws.com, port: 3306

# **Ask If you have any questions or if something doesn't work for you**


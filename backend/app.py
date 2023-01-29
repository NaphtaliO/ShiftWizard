from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from bcrypt import gensalt, hashpw, checkpw
import uuid
from createToken import create_jwt

app = Flask(__name__)
CORS(app, support_credentials=True)

db = SQLAlchemy()
# If you want to run on a mysqlclient server runnint locally the URI is generally in this format
# mysql://<username>:<password>@<host>:<port>/<dbname>
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://naphtali:naphtali123@mydb.cg1kk4ysnwdb.eu-west-1.rds.amazonaws.com:3306/ebdb"
db.init_app(app)

from Models import *
# # This is the db model for Organisations you can add or edit later
# class Organisation(db.Model):
#     __tablename__ = "organisations"

#     id = db.Column(db.String(100), primary_key=True, unique=True)
#     name = db.Column(db.String(100))
#     address = db.Column(db.String(100))
#     email = db.Column(db.String(70), unique=True)
#     password = db.Column(db.String(80))

#     def __init__(self, id, name, address, email, password):
#         self.id = id
#         self.name = name
#         self.address = address
#         self.email = email
#         self.password = password

#This will create all tables in our database
with app.app_context():
    db.create_all()


@app.route("/")
def index():
    return "<h1>Hello World!!!<h1>"


@app.route("/api/organisation/signup", methods=['POST'])
def signup():
    data = request.get_json() #Get JSON body from frontend
    name, address, email, password = data.get(
        'name'), data.get('address'), data.get('email'), data.get('password')
    organisationExists = db.session.execute(
        db.select(Organisation).where(Organisation.email == email)).scalar()
    if not organisationExists:
        try:
            # change the string to bytes before using it with bcrypt
            password = password.encode('utf-8')
            salt = gensalt()  # random generated strings
            # adding salt to password and hashing it for security
            hashedPassword = hashpw(password, salt)
            organisation = Organisation(
                id=str(uuid.uuid4()), #Id is a random set of numbers rather than jsut using one number like 1 or two
                name=name,
                address=address,
                email=email,
                password=hashedPassword  # storing hashed password
            )
            db.session.add(organisation)
            db.session.commit()
            # Create toke and send it to the user
            token = create_jwt(organisation.id)
            # Had to change to json manually couldn't find any other way to do it
            return jsonify(id=organisation.id, name=organisation.name, address=organisation.address, email=organisation.email, token=token), 201
        except Exception as e:
            print(e)  # print the exception
            response = {
                "messgae": "An error Occurred. Try Again"
            }
            return jsonify(response), 400
    else:
        response = {
            "message": "User already exists"
        }
        return jsonify(response), 400


@app.route("/api/organisation/login", methods=['POST'])
def login():
    data = request.get_json()  # Get JSON body from frontend
    email, password = data.get('email'), data.get('password')
    try:
        organisation = db.session.execute(db.select(Organisation, Organisation.password).where(Organisation.email == email)).scalar()
        #Checking if the organisation exists. This includes password

        if organisation:
            #Comapring passwords
            hashedPassword = organisation.password.encode('utf-8')  # Encode strings before hashing
            password = password.encode('utf-8') #Encode strings before hashing
            if checkpw(password, hashedPassword):
                token=create_jwt(organisation.id) #Create token and send it to the user
                return jsonify(id=organisation.id, name=organisation.name, address=organisation.address, email=organisation.email, token=token), 201
            else:
                response = {"message" : "Incorrect Password"}
                return(jsonify(response)), 400
        else:
            response = {"message": "Incorrect email"}
            return jsonify(response), 400
    except Exception as e:
        print(e)
        response = {
            "messgae": "An error Occurred. Try Again"
        }
        return jsonify(response), 400
    

@app.route("/api/employee/create", methods=['POST'])
def create_employee():
    data = request.get_json()
    name, email,password, job, organisation_id = data.get(
        'name'), data.get('email'), data.get('password'), data.get('job'), data.get('organisation_id')
    try:
        employee = Employee(
            id=str(uuid.uuid4()),
            name=name,
            job=job,
            email=email,
            password=password,
            organisation_id=organisation_id
        )
        db.session.add(employee)
        db.session.commit()
        return jsonify(id=employee.id, name=employee.name, job=employee.job, email=employee.email,
                        organisation_id=employee.organisation_id), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400

@app.route("/api/roster/create", methods=['POST'])
def create_roster():
    data = request.get_json()
    name = data.get('name')
    try:
        roster = Roster(
            id = str(uuid.uuid4()),
            name=name
        )
        db.session.add(roster)
        db.session.commit()
        return jsonify(id=roster.id, name=roster.name), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400


@app.route("/api/roster/addEmployee", methods=['POST'])
def add_employee_to_roster():
    data = request.get_json()

    roster_id, employee_id = data.get('roster_id'), data.get('employee_id')
    #query roster by id
    try:
        roster = db.session.execute(db.select(Roster).where(Roster.id == roster_id)).scalar()
        employee = db.session.execute(db.select(Employee).where(Employee.id == employee_id)).scalar()
        roster.employees.append(employee)
        db.session.commit()
        return jsonify(messsage = "hello"), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    

@app.route("/api/roster/view", methods=['POST'])
def roster():
    data = request.get_json()

    roster_id = data.get('roster_id')
    # query roster by id
    try:
        roster = Roster.query.options(
            db.joinedload('employees', innerjoin=True).joinedload('shifts')
        ).filter_by(id=roster_id).first()
        
        roster_dict = {
            "id": roster.id,
            'name': roster.name,
            'employees': [employee.to_dict() for employee in roster.employees]
        }

        print(roster_dict)

        #print(vars(roster))
        return jsonify(messsage="hello"), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    
# @app.route("/api/roster/addShift", methods=["POST"])
# def addShift():
#     data = request.get_json()

#     try:
#         pass
#     except Exception as e:
#         print(e)
#         response = {"message": "An error Occurred. Try Again"}
#         return jsonify(response), 400

if __name__ == "__main__":
    app.run(debug=True)

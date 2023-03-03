from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail, Message
from bcrypt import gensalt, hashpw, checkpw
import uuid
from createToken import create_jwt
from RandomPassword import generate_password

app = Flask(__name__)
mail = Mail(app)
CORS(app, support_credentials=True)

db = SQLAlchemy()
# If you want to run on a mysqlclient server locally the URI is generally in this format
# mysql://<username>:<password>@<host>:<port>/<dbname>
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://naphtali:naphtali123@mydb.cg1kk4ysnwdb.eu-west-1.rds.amazonaws.com:3306/ebdb"
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'naphtaliodinakachi@gmail.com'
app.config['MAIL_PASSWORD'] = 'fkwveqfebaxavril'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
db.init_app(app)
mail = Mail(app)

from Models import *

#This will create all tables in our database from Models.py
#If they don't already exist
with app.app_context():
    db.create_all()

# TODO might want to add createdAt dates to models. We'll consider it later
@app.route("/")
def index():
    return "<h1>Hello World!!!<h1>"

@app.route("/sendEmail")
def sendEmail():
    try:
        msg = Message('Welcome to our Organisation', sender='naphtaliodinakachi@gmail.com',
                    recipients=['naphtali2003@gmail.com'])
        msg.body = "This is the email body"
        mail.send(msg)
        return jsonify(message="Sent")
    except Exception as e:
        print(e)
        response = {
            "message": "An error Occurred. Try Again"
        }
        return jsonify(response), 400


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
            return jsonify(id=organisation.id, name=organisation.name, address=organisation.address, email=organisation.email, token=token), 200
        except Exception as e:
            print(e)  # print the exception
            response = {
                "message": "An error Occurred. Try Again"
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
                return jsonify(id=organisation.id, name=organisation.name, address=organisation.address, email=organisation.email, token=token), 200
            else:
                response = {"message" : "Incorrect Password"}
                return(jsonify(response)), 400
        else:
            response = {"message": "Incorrect email"}
            return jsonify(response), 400
    except Exception as e:
        print(e)
        response = {
            "message": "An error Occurred. Try Again"
        }
        return jsonify(response), 400

@app.route("/api/organisation/employees/<organisation_id>", methods=['GET'])
def rosters(organisation_id):
    try:
        list = []
        employees = db.session.execute(db.select(Employee).where(
            Employee.organisation_id == organisation_id)).scalars()
        for employee in employees:
            list.append({"id":employee.id, "name": employee.name, "job": employee.job, "email": employee.email, "organisation_id": employee.organisation_id})
        return jsonify(list), 200
    except Exception as e:
        print(e)
        response = {
            "messgae": "An error Occurred. Try Again"
        }
        return jsonify(response), 400

#TODO check if the employee exists first
#TODO upon creation 
#TODO extra things we might add to an employee like phone number and so on
#TODO check if the roster exists then check if the employee exists
#TODO check if an employee is already in the roster
@app.route("/api/employee/create", methods=['POST'])
def create_employee():
    data = request.get_json()
    name, email, job, organisation_id, roster_id = data.get(
        'name'), data.get('email'), data.get('job'), data.get('organisation_id'), data.get('roster_id')
    try:
        roster = db.session.execute(
            db.select(Roster).where(Roster.id == roster_id)).scalar()
        password = generate_password()
        encodedPassword = password.encode('utf-8')
        salt = gensalt()
        hashedPassword = hashpw(encodedPassword, salt)
        employee = db.session.execute(db.select(Employee).where(Employee.email == str(email))).scalar()
        if employee:
            roster.employees.append(employee)
            db.session.add(employee)
            db.session.commit()
            employeeObject = {
                "id": employee.id,
                "name": employee.name,
                "job": employee.job,
                "email": employee.email,
                "organisation_id": employee.organisation_id
            }
            return jsonify({"roster": roster.to_dict(), "employee": employeeObject, "message": "Successfully Added"}), 200
        else:
            employee = Employee(
                id=str(uuid.uuid4()),
                name=name,
                job=job,
                email=email,
                password=hashedPassword,
                organisation_id=organisation_id,
            )
            
            roster.employees.append(employee)
            db.session.add(employee)
            db.session.commit()
            employeeObject = {
                "id": employee.id,
                "name": employee.name,
                "job": employee.job,
                "email": employee.email,
                "organisation_id": employee.organisation_id
            }
            msg = Message('Welcome to our Organisation', sender='naphtaliodinakachi@gmail.com',
                        recipients=[f'{employee.email}'])
            msg.body = "Below are your login details"
            msg.html = f"""<h3> You have been added to our Organisation </h3>
        <p> Welcome to our organisation we our excited to have you. Below are your log in details </p>
        <p> username: {employee.email}</p>
        <p> password: {password}</p>
        <p> Click <a href = "http://localhost:3000/" target = "_blank"> HERE </a> to login. Make sure to check that you are an employee </p>
        <h3> Do not share this with anybody </h3>"""
            mail.send(msg)
            return jsonify({"roster": roster.to_dict(), "employee": employeeObject, "message": "Successfully Added"}), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400

@app.route("/api/roster/create", methods=['POST'])
def create_roster():
    data = request.get_json()
    name, organisation_id = data.get('name'), data.get('organisation_id')
    try:
        roster = Roster(
            id = str(uuid.uuid4()),
            name=name,
            organisation_id=organisation_id
        )
        db.session.add(roster)
        db.session.commit()
        return jsonify(id=roster.id, name=roster.name), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400    

@app.route("/api/roster/view/<roster_id>", methods=['GET'])
def roster(roster_id):
    roster_id = str(roster_id)
    try:
        roster = db.session.execute(db.select(Roster).where(
            Roster.id == roster_id)).scalar()
        if roster:
            return jsonify(roster.to_dict()), 200
        else: 
            return jsonify({"message": "No such roster"}), 400
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    
#TODO when adding shift check if the employee is free on that day at that time
@app.route("/api/roster/addShift", methods=["POST"])
def addShift():
    data = request.get_json()

    description, start_time, end_time, employee_id, roster_id = data.get('description'), data.get('start_time'), data.get('end_time'), data.get('employee_id'), data.get('roster_id')
    try:
        new_shift = Shift(
            id = str(uuid.uuid4()),
            description=description,
            start_time=start_time,
            end_time=end_time,
            employee_id=employee_id, 
            roster_id=roster_id
        )
        db.session.add(new_shift)
        employee = db.session.execute(db.select(Employee).where(
            Employee.id == employee_id)).scalar()
        employee.shifts.append(new_shift)
        db.session.commit()
        return jsonify(employee=employee.to_dict()), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400

@app.route("/api/editShift", methods=["POST"])
def edit_shift():
    data = request.get_json()

    shift_id, description, start_time, end_time = data.get('shift_id'), data.get('description'), data.get('start_time'), data.get('end_time')
    try:
        shift = db.session.execute(db.select(Shift).where(
            Shift.id == shift_id)).scalar()
        if not shift: 
            return jsonify({"message": "No such shift"}), 400
        shift.description = description
        shift.start_time = start_time
        shift.end_time = end_time
        db.session.commit()
        return jsonify(shift.to_dict()), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    
@app.route("/api/deleteShift/<id>", methods=["DELETE"])
def delete_shift(id):
    try:
        shift = db.session.execute(db.select(Shift).where(Shift.id == str(id))).scalar()
        if not shift:
            return jsonify({"message": "No such shift"}), 400
        db.session.delete(shift)
        db.session.commit()
        return jsonify({"message": "Successfully Deleted"})
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400


@app.route("/api/getAllRosters/<organisation_id>", methods=["GET"])
def get_all_rosters(organisation_id):
    try:
        rosters = db.session.execute(db.select(Roster).where(Roster.organisation_id == str(organisation_id))).scalars()
        rosters_list = []
        for i in rosters:
            rosters_list.append(i.to_dict())
        #print(rosters_list)
        return jsonify(rosters_list), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occured. Try Again"}
        return jsonify(response), 400


@app.route("/api/deleteRoster/<roster_id>", methods=["DELETE"])
def delete_roster(roster_id):
    try:
        roster = db.session.execute(db.select(Roster).where(
            Roster.id == str(roster_id))).scalar()
        if not roster:
            return {"message": "This roster doesn't exist"}, 400
        else:
            shifts = db.session.execute(db.select(Shift).where(Shift.roster_id == str(roster_id))).scalars()
            for shift in shifts:
                db.session.delete(shift)
                db.session.commit()
            db.session.delete(roster)
            db.session.commit()
            return {"message": "Roster Successfuly Deleted"}, 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    
@app.route("/api/deleteEmployee/<id>", methods=["DELETE"])
def delete_employee(id):
    try:
        employee = db.session.execute(db.select(Employee).where(Employee.id == str(id))).scalar()
        if not employee:
            return {"message": "This Employee does not exist"}, 400
        else:
            shifts = db.session.execute(db.select(Shift).where(Shift.employee_id == str(id))).scalars()
            for shift in shifts:
                db.session.delete(shift)
                db.session.commit()
            db.session.delete(employee)
            db.session.commit()
            return {"message": "Employee Successfuly Deleted"}, 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    

#Getting shifts by employee ID
@app.route("/api/getShiftsById/<id>", methods=["GET"])
def getShiftsById(id):
    try:
        shifts = db.session.execute(db.select(Shift).where(Shift.employee_id == str(id))).scalars()
        shifts_list = []
        for i in shifts:
            dictObject = {
                "id": i.id,
                "title": i.description,
                "start": i.start_time,
                "end": i.end_time,
                "employee_id": i.employee_id,
                "roster_id": i.roster_id,
            }
            shifts_list.append(dictObject)
        return jsonify(shifts_list), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    
@app.route("/api/employee/login", methods=['POST'])
def employee_login():
    data = request.get_json()  # Get JSON body from frontend
    email, password = data.get('email'), data.get('password')
    try:
        employee = db.session.execute(
            db.select(Employee, Employee.password).where(Employee.email == email)).scalar()
        # Checking if the employee exists. This includes password

        if employee:
            # Comapring passwords
            hashedPassword = employee.password.encode(
                'utf-8')  # Encode strings before hashing
            # Encode strings before hashing
            password = password.encode('utf-8')
            if checkpw(password, hashedPassword):
                # Create token and send it to the user
                token = create_jwt(employee.id)
                return jsonify(id=employee.id, name=employee.name, email=employee.email, token=token), 200
            else:
                response = {"message": "Incorrect Password"}
                return (jsonify(response)), 400
        else:
            response = {"message": "Incorrect email"}
            return jsonify(response), 400
    except Exception as e:
        print(e)
        response = {
            "message": "An error Occurred. Try Again"
        }
        return jsonify(response), 400

if __name__ == "__main__":
    app.run(debug=True)

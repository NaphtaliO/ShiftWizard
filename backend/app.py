from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail, Message
from bcrypt import gensalt, hashpw, checkpw
import uuid
from createToken import create_jwt
from RandomPassword import generate_password
from functools import wraps
import jwt
from dotenv import load_dotenv
import os

load_dotenv()
secret_key = os.getenv("SECRET_KEY")
uri = os.getenv("SQLALCHEMY_DATABASE_URI")
mail_server = os.getenv("MAIL_SERVER")
mail_username = os.getenv("MAIL_USERNAME")
mail_password = os.getenv("MAIL_PASSWORD")
app = Flask(__name__)
mail = Mail(app)
CORS(app, support_credentials=True)

db = SQLAlchemy()
# If you want to run on a mysqlclient server locally the URI is generally in this format
# mysql://<username>:<password>@<host>:<port>/<dbname>
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config['MAIL_SERVER'] = mail_server
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = mail_username
app.config['MAIL_PASSWORD'] = mail_password
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
db.init_app(app)
mail = Mail(app)

from Models import *

#This will create all tables in our database from Models.py
#If they don't already exist
with app.app_context():
    db.create_all()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'Authorization' in request.headers:
            token = request.headers.get('Authorization').split(' ')[1]
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Authorization token required'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, secret_key, algorithms="HS256")
            current_user = None
            if data.get('type') == "employer":
                current_user = db.session.execute(db.select(Organisation).where(Organisation.id == data.get('user_id'))).scalar()
            elif data.get('type') == "employee":
                current_user = db.session.execute(db.select(Employee).where(Employee.id == data.get('user_id'))).scalar()
        except Exception as e:
            print(e)
            return jsonify({
                'message' : 'Request is not authorized'
            }), 401
        # returns the current logged in users context to the routes
        return  f( *args, **kwargs)
  
    return decorated

# TODO might want to add createdAt dates to models. We'll consider it later
@app.route("/")
def index():
    return "<h1>Hello World!!!<h1>"

@app.route("/sendEmail")
def sendEmail():
    try:
        msg = Message('Welcome to our Organisation', sender='shiftwizardapp@gmail.com',
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
            token = create_jwt(organisation.id, "employer")
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
                token=create_jwt(organisation.id, "employer") #Create token and send it to the user
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
@token_required
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
@token_required
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
            msg = Message('Welcome to our Organisation', sender='shiftwizardapp@gmail.com',
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
@token_required
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
@token_required
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
@token_required
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
        if not employee:
            return jsonify(message="Employee does not exist"), 400
        employee.shifts.append(new_shift)
        db.session.commit()
        msg = Message('New Shift', sender='shiftwizardapp@gmail.com',
                        recipients=[f'{employee.email}'])
        msg.body = "You've been assigned a new shift"
        msg.html = f"""<h3> You have been assigned a new shift.</h3>
        <p> Dear {employee.name}, <br>You've been assigned a new shift </p>
        <p> Description: {new_shift.description}</p>
        <p> Start Time: {new_shift.start_time}</p>
        <p> End Time: {new_shift.end_time}</p>
        <h3> Do not reply to this email </h3>"""
        mail.send(msg)
        return jsonify(employee=employee.to_dict()), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400

@app.route("/api/editShift", methods=["POST"])
@token_required
def edit_shift():
    data = request.get_json()

    shift_id, description, start_time, end_time = data.get('shift_id'), data.get('description'), data.get('start_time'), data.get('end_time')
    try:
        shift = db.session.execute(db.select(Shift).where(
            Shift.id == shift_id)).scalar()
        employee = db.session.execute(db.select(Employee).where(
            Employee.id == shift.employee_id)).scalar()
        if not shift: 
            return jsonify({"message": "No such shift"}), 400
        if not employee: 
            return jsonify({"message": "Employee does not exist"}), 400
        shift.description = description
        shift.start_time = start_time
        shift.end_time = end_time
        db.session.commit()
        msg = Message('Your shift has been edited', sender='shiftwizardapp@gmail.com',
                        recipients=[f'{employee.email}'])
        msg.body = "Your shift has been edited"
        msg.html = f"""<h3> Your shift has been edited.</h3>
        <p> Dear {employee.name}, <br>Your shift has been edited. Your new shift details are as follows </p>
        <p> Description: {shift.description}</p>
        <p> Start Time: {shift.start_time}</p>
        <p> End Time: {shift.end_time}</p>
        <h3> Do not reply to this email </h3>"""
        mail.send(msg)
        return jsonify(shift.to_dict()), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    
@app.route("/api/deleteShift/<id>", methods=["DELETE"])
@token_required
def delete_shift(id):
    try:
        shift = db.session.execute(db.select(Shift).where(Shift.id == str(id))).scalar()
        employee = db.session.execute(db.select(Employee).where(Employee.id == shift.employee_id)).scalar()
        if not shift:
            return jsonify({"message": "No such shift"}), 400
        if not employee: 
            return jsonify({"message": "Employee does not exist"}), 400
        db.session.delete(shift)
        db.session.commit()
        msg = Message('Your shift has been deleted', sender='shiftwizardapp@gmail.com',
                        recipients=[f'{employee.email}'])
        msg.body = "Your shift has been deleted"
        msg.html = f"""<h3> Your shift has been deleted.</h3>
        <p> Dear {employee.name}, <br>Your shift has been deleted. Your are no longer </p>
        <p> Description: {shift.description}</p>
        <p> Start Time: {shift.start_time}</p>
        <p> End Time: {shift.end_time}</p>
        <h3> Do not reply to this email </h3>"""
        mail.send(msg)
        return jsonify({"message": "Successfully Deleted"})
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400


@app.route("/api/getAllRosters/<organisation_id>", methods=["GET"])
@token_required
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
@token_required
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
@token_required
def delete_employee(id):
    try:
        employee = db.session.execute(db.select(Employee).where(Employee.id == str(id))).scalar()
        if not employee:
            return {"message": "This Employee does not exist"}, 400
        else:
            shifts = db.session.execute(db.select(Shift).where(Shift.employee_id == str(id))).scalars()
            requests = db.session.execute(db.select(Request).where(
                Request.employee_id == str(id))).scalars()
            for i in requests:
                db.session.delete(i)
                db.session.commit()
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
@token_required
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
                token = create_jwt(employee.id, "employee")
                return jsonify(id=employee.id, name=employee.name, email=employee.email, organisation_id=employee.organisation_id, token=token), 200
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

@app.route("/api/editOrganisation/<id>", methods=["PATCH"])
@token_required
def edit_organisation(id):
    data = request.get_json()

    name, address = data.get('name'), data.get('address')
    try:
        organisation = db.session.execute(db.select(Organisation).where(
            Organisation.id == id)).scalar()
        if not organisation: 
            return jsonify({"message": "This Organisation account does not exist"}), 400
        organisation.name = name
        organisation.address = address
        db.session.commit()
        return jsonify(id=organisation.id, name=organisation.name, address=organisation.address, email=organisation.email, message="Saved and edited Successfully"), 200 
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    
@app.route("/api/changePassword/<id>", methods=["PATCH"])
@token_required
def change_password(id):
    data = request.get_json()

    current_password, new_password = data.get('currentPassword'), data.get('newPassword')
    if current_password == "" or new_password == "":
        return jsonify(message="Passwords can't be empty")
    try:
        employee = db.session.execute(db.select(Employee, Employee.password).where(
            Employee.id == id)).scalar()
        if not employee: 
            return jsonify({"message": "This Employee account does not exist"}), 400
        hashedPassword = employee.password.encode('utf-8')
        current_password = current_password.encode('utf-8')
        if checkpw(current_password, hashedPassword):
            new_password = new_password.encode('utf-8')
            salt = gensalt()
            new_hashed_password = hashpw(new_password, salt)
            employee.password = new_hashed_password
            db.session.commit()
            msg = Message('Password Change', sender='shiftwizardapp@gmail.com',
                        recipients=[f'{employee.email}'])
            msg.body = "Your password has been changed"
            msg.html = f"""<h3> Your password has been changed </h3>
        <p>Dear {employee.name} <br> your password has been changed</p>
        <p>If this wasn't you quickly report this</p>
        <h3> Do not reply to this email </h3>"""
            mail.send(msg)
            return jsonify(message="Password successfully changed"), 200
        else: 
            return jsonify(message="Current Password is Incorrect"), 400
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400

@app.route("/api/getEmployeeRequests/<id>", methods=["GET"])
@token_required
def get_employee_requests(id):
    try:
        requests = db.session.execute(db.select(Request).where(
            Request.employee_id == id)).scalars()
        requestList = []
        for request in requests:
            requestList.append(request.to_dict())

        return jsonify({"requests": requestList}), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    
@app.route("/api/getOrganisationRequests/<id>", methods=["GET"])
@token_required
def get_organisation_requests(id):
    try:
        requests = db.session.execute(db.select(Request).where(
            Request.organisation_id == id)).scalars()
        requestList = []
        for request in requests:
            requestList.append(request.to_dict())

        return jsonify({"requests": requestList}), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400
    
@app.route("/api/makeRequest", methods=["POST"])
@token_required
def make_request():
    data = request.get_json()
    type_of_request, status, message, employee_id, organisation_id = data.get('type_of_request'), data.get('status'), data.get('message'), data.get('employee_id'), data.get('organisation_id')
    try:
        request1 = Request(
            id = str(uuid.uuid4()),
            type_of_request=type_of_request,
            status=status,
            message=message,
            employee_id=employee_id,
            organisation_id=organisation_id
        )
        db.session.add(request1)
        db.session.commit()
        return jsonify({"request": request1.to_dict()}), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400 
    
@app.route("/api/deleteRequest/<id>", methods=["DELETE"])
@token_required
def delete_request(id):
    try:
        request1 = db.session.execute(db.select(Request).where(Request.id == str(id))).scalar()
        if not request1:
            return {"message": "This request does not exist"}, 400
        db.session.delete(request1)
        db.session.commit()
        return {"message": "Request Successfully Deleted"}, 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occurred. Try Again"}
        return jsonify(response), 400 
    
@app.route("/api/getAllEmployeeRosters/<id>", methods=["GET"])
@token_required
def get_all_employee_rosters(id):
    try:
        # rosters = db.session.execute(db.select(Roster).where(str(id) in Roster.employees)).scalars()
        rosters = db.session.query(Roster).join(EmployeeRoster).filter(EmployeeRoster.employee_id == id).all()
        rosters_list = []
        for i in rosters:
            rosters_list.append(i.to_dict())
        return jsonify(rosters_list), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occured. Try Again"}
        return jsonify(response), 400
    
@app.route("/api/changeRequestStatus/<id>", methods=["PATCH"])
@token_required
def change_request_status(id):
    data = request.get_json()
    status = data.get('status')
    try:
        request1 = db.session.execute(db.select(Request).where(Request.id == str(id))).scalar()
        if not request1:
            return jsonify(message="Request does not exist"), 400
        request1.status = status
        db.session.commit()
        return jsonify({"request": request1.to_dict()}), 200
    except Exception as e:
        print(e)
        response = {"message": "An error Occured. Try Again"}
        return jsonify(response), 400

if __name__ == "__main__":
    app.run(debug=True)

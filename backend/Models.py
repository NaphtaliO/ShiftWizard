from app import db

#TODO might want to add createdAt dates to models. We'll consider it later
class Organisation(db.Model):
    __tablename__ = "organisations"

    id = db.Column(db.String(100), primary_key=True, unique=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    email = db.Column(db.String(70), unique=True)
    password = db.Column(db.String(100))
    employees = db.relationship('Employee', backref='organisation')
    

class Employee(db.Model):
    __tablename__ = "employees"
    id = db.Column(db.String(100), primary_key=True, unique=True)
    name = db.Column(db.String(100), nullable=False)
    job = db.Column(db.String(100))
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100))
    organisation_id = db.Column(db.String(100), db.ForeignKey(
        'organisations.id'), nullable=False)
    # rosters = db.relationship(
    #     'Roster', secondary='employee_rosters', backref='employees')
    shifts = db.relationship('Shift', backref='employee')

    def __init__(self, id, name, job, email, password, organisation_id):
        self.id = id
        self.name = name
        self.job = job
        self.email = email,
        self.password = password,
        self.organisation_id = organisation_id

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "job": self.job,
            "email": self.email,
            "shifts": [shift.to_dict() for shift in self.shifts]
        }

class Shift(db.Model):
    __tablename__ = "shifts"
    id = db.Column(db.String(100), primary_key=True, unique=True)
    description = db.Column(db.String(100))
    start_time = db.Column(db.String(100), nullable=False)
    end_time = db.Column(db.String(100), nullable=False)
    employee_id = db.Column(db.String(100), db.ForeignKey(
        'employees.id'), nullable=False)
    roster_id = db.Column(db.String(100), db.ForeignKey(
        'rosters.id'), nullable=False)

    def __init__(self, id, description, start_time, end_time, employee_id, roster_id):
        self.id = id
        self.description = description
        self.start_time = start_time
        self.end_time = end_time
        self.employee_id = employee_id
        self.roster_id = roster_id

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "startTime": self.start_time,
            "endTime": self.end_time,
            "employee_id": self.employee_id,
            "roster_id": self.roster_id,
        }

class Roster(db.Model):
    __tablename__ = "rosters"
    id = db.Column(db.String(100), primary_key=True, unique=True)
    name = db.Column(db.String(100))
    organisation_id = db.Column(db.String(100), db.ForeignKey('organisations.id'), nullable=False)
    employees = db.relationship(
        'Employee', secondary='employee_roster', backref='roster')

    def __init__(self, id, name, organisation_id):
        self.id = id
        self.name = name
        self.organisation_id = organisation_id

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "organisation_id": self.organisation_id,
            "employees": [employee.to_dict() for employee in self.employees]
        }


class EmployeeRoster(db.Model):
    __tablename__ = "employee_roster"
    employee_id = db.Column(db.String(100), db.ForeignKey('employees.id'), nullable=False )
    roster_id = db.Column(db.String(100), db.ForeignKey('rosters.id'), nullable=False, primary_key=True)

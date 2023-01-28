from app import db


class Organisation(db.Model):
    __tablename__ = "organisations"

    id = db.Column(db.String(100), primary_key=True, unique=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    email = db.Column(db.String(70), unique=True)
    password = db.Column(db.String(100))
    employees = db.relationship('Employee', backref='organisation')

    def __init__(self, id, name, address, email, password):
        self.id = id
        self.name = name
        self.address = address
        self.email = email
        self.password = password


class Employee(db.Model):
    __tablename__ = "employees"
    id = db.Column(db.String(100), primary_key=True, unique=True)
    name = db.Column(db.String(100), nullable=False)
    job = db.Column(db.String(100))
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100))
    organisation_id = db.Column(db.String(100), db.ForeignKey(
        'organisations.id'), nullable=False)
    shifts = db.relationship('Shift', backref='employee')


class Shift(db.Model):
    __tablename__ = "shifts"
    id = db.Column(db.String(100), primary_key=True)
    description = db.Column(db.String(100))
    day = db.Column(db.String(100), nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    employee_id = db.Column(db.String(100), db.ForeignKey(
        'employees.id'), nullable=False)


class Roster(db.Model):
    __tablename__ = "rosters"
    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(100))
    employees = db.relationship('Employee', secondary='employee_roster', lazy='subquery', backref=db.backref('rosters', lazy=True))


class EmployeeRoster(db.Model):
    __tablename__ = "employee_roster"
    id = db.Column(db.String(100), primary_key=True)
    employee_id = db.Column(db.String(100), db.ForeignKey(
        'employees.id'), nullable=False)
    roster_id = db.Column(db.String(100), db.ForeignKey(
        'rosters.id'), nullable=False)

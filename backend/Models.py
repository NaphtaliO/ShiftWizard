from app import db


class Organisation(db.Model):
    __tablename__ = "organisations"

    id = db.Column(db.String(100), primary_key=True, unique=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    email = db.Column(db.String(70), unique=True)
    password = db.Column(db.String(80))
    employees = db.relationship('Employee', backref='organisation')

    def __init__(self, id, name, address, email, password):
        self.id = id
        self.name = name
        self.address = address
        self.email = email
        self.password = password


class Employee(db.Model):
    __tablename__ = "employees"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    employer_id = db.Column(db.Integer, db.ForeignKey(
        'organisation.id'), nullable=False)
    shifts = db.relationship('Shift', backref='employee', lazy=True)


class Roster(db.Model):
    __tablename__ = "rosters"
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey(
        'employee.id'), nullable=False)
    shifts = db.relationship('Shift', backref='roster')


class Shift(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	start_time = db.Column(db.Time, nullable=False)
	end_time = db.Column(db.Time, nullable=False)
	day = db.Column(db.String, nullable=False)
	description = db.Column(db.String)
	employee_id = db.Column(db.Integer, db.ForeignKey(
	    'employee.id'), nullable=False)
	roster_id = db.Column(db.Integer, db.ForeignKey('roster.id'), nullable=False)

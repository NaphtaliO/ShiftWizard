# Shift Wizard - A Free and Open-Source Rostering System

### Contributors
Mark Kilgannon - 120398166\
Robbie O'Sullivan - \
Aideen Murphy - 120323726\
Timothy McGrath - 120354876\
Naphtali Odinakachi - 120432016

Our product is temporarily hosted at these sites
<a href="https://shift-wizard.web.app" target="_blank">Employer's view</a>
<a href="https://shift-wizard-employee.web.app" target="_blank">Employee's view</a>

## Introduction
In today's fast-paced work environment, efficient rostering systems are essential for businesses to manage their staff and resources effectively. A rostering system is a tool that allows employers/organisation to create, manage, and assign shifts to their employees in an organized and streamlined manner as well as to track the hours employees work, assign employees to specific tasks or projects, and generate reports on employee hours and project completion.

All businesses that rely on shift patterns and different number of workers at different times can benefit from an e-rostering system. Importantly, human involvement is still beneficial to rostering processes. Whether you’re talking about e-rostering or auto-rostering, HR specialist or general managers are still in charge. The main distinction is that the logistics often include intricate mathematical computation necessary to determine the rotas or shift schedules, are handled automatically. 
After all, it is vital not just to have the sufficient number of employees per workday, but as well the personnel with specific technical expertise to get specific jobs done and allow businesses work at maximum efficiency. Visualising and planning these rosters manually can be very challenging. 
This report and software aims to create a clear-cutting shift planning web application that relieves managers and HR specialists of difficulties that come with the demands of planning the most complex rostered organisation. Our E-rostering system is designed in the most efficient way possible that will help all businesses that depend on shift schedules, save their time, money, and resources.  


## Background

Work rostering the human resources of a business is more than merely recording each employees working hours. Rostering, when done correctly can be essential for planning how employees work within a firm.
A well planned roster can have an impact on five key areas in a business; employee motivation, performance tracking, attendance, workplace health and safety and productivity levels. 
It is all well and good having qualified staff but if they are unhappy because of the times they are working this can affect their performance. Jobs will be left undone, and attendance will be low. Using a rostering system can help find the specific time of day where each employee works best. When the human resources of a firm are managed fairly and efficiently, employees are far more motivated and productivity levels are met.
Our web application is designed to make the management of employees work schedules easier for HR specialists and general managers. The application will contain two views based on whether you’re a manager or an employee. A login function is required when accessing this application and this will determine what view the user will have access to. 

## Research
To develop our own e-roster management system we first developed a research plan to gain a broader knowledge of the sector. This included both first-hand and second-hand research. Rostering, or personnel scheduling, has gained a lot of research interest since the 1950s (Edie, 1954). Over this time a variety of constraints have formed, from legal and organisation requirements to staff preferences. Different approaches have been taken to tackle these: optimization, meta-heristics, artificial intelligence, decision-support and a hybrid approach of these (Petrovic, 2017).

### Market
There are many systems already on the market that provide roster management for businesses big and small. The top branded products include Sage, Myob, Xero, and Connecteam. The different price points and features are important to consider when choosing the best system to use for your business. Reporting capabilities such as, allowing the employer to separate reports for more detailed analysis of their management is crucial. The system should be user-friendly and customizable to fit with the businesses framework. Some systems have the added benefit of payroll, allowing an employer to deposit payroll to their employees directly. This simplifies the process of collating, producing, and filing taxes for payroll. Another feature many systems have is an instant alert where employees are sent reminders and notifications to notify them if their immediate action is required This can be for example, to review their new shift.

<img src="https://www.allocatesoftware.co.uk/wp-content/uploads/sites/93/2021/03/Rostering-prop-page1.png" width="500">

### Target Customer
An online Roster Management system is a Software as a service (SaaS) product. The target customer and market are small to medium enterprises in the hospitality, retail, entertainment, healthcare, gyms, sports clubs, etc. The system also indirectly effects the employers workers. These are the people that will use the roster system the most so it is important to keep the user in mind when creating a system. 
In healthcare, the industry has had extensive research done on the implications of codifying nurse schedules. In this situation, a non-robust system can have indirect consequences to patient care, work/life balance and hospital budgets (Drake, 2017). Back in 2014, the NHS in the U.K. wanted all clinical staff to be rostered electronically by the year 2021 (Nursing Times, 2021).

### Roster Types
There are three main types of rosters for business operations which are used across all industry types and levels (Square, 2021). First is a Duty roster. These are frequently employed in the hospitality sector and are intended to reduce the number of excessive shifts. In essence, it prevents scheduling an excessive number of employees for the same shift and job duties. A roster system like this is important to combat loosing qualified workers due to low job satisfaction (Heimerl et al., 2020). Flexible rosters are the second type. These are for employees who can work a variety of hours to suit the employer. A staff member may work hours that do not correspond to the business' typical start and end timings if the roster is flexible. This might imply that they are scheduled to work any time within usually a 40-hour work week, for a few hours or a full day. Employees may, for instance, work from 7 a.m. to 4 p.m. rather than the standard 8 a.m. to 5 p.m. The last type is Staggered rosters. These are used where start times are staggered for workers. This roster type is typically used in industries that experience high changing demand of customers throughout the day, such as retail or restaurants. You may have two employees starting work at 9am and finishing at 2pm. Another starts at 11am to 2pm, another at 12am to 3pm, and so on. This gives more flexibility, and makes sure that a staff member is always on during lunch breaks, etc. 



## Use Case
![Use case (1)](https://user-images.githubusercontent.com/114653179/220119895-99662f81-143d-40b7-a384-21cd556b466e.png)
This use case diagram describes how the user interacts with the system. There is two actors that interact with the system, employees and employers. These two actors will interact with a different view of the system. Both actors can log in, and will then be sorted into whether they are employers or employees. 

For an employer logging into the system for the first time, the option to register the account and set up working hours and employee data will be given. This allows for greater automation and ease of use for employers. Once registered, the employer can create a new roster, or interact with an existing roster. 

An employee logging into the system will be able to view the rosters that their employers have created, along with the ability to request a shift change with another employee or the ability to request days off from their employer. If the employee receives a request to swap from another employee, the request will show up on their dashboard. 

## Data Flow
![Data Flow Diagram 2](https://user-images.githubusercontent.com/114653179/218460986-f98d6190-1842-46b0-8710-b1b0aa887c32.png)

This Data Flow diagram shows the flow of information throughout the system. The system has two views to start the data flow, employers and employees. Once they log in, the system sorts them into either an employer or an employee. It does this by directing the person to their relevant login page. Once the system has verified which type of log in has occurred, the user is directed to their dashboard. 

Both types of user can view any active roster. The employer can make changes to the roster, and those changes will be applied to the roster and is automatically available to view to employees. If an employee would like to swap shifts with another employee, they can make requests with available employees. The swap request is sent to the employee selected, and if accepted, is sent to the employer for approval. An option to export the roster is also given to the employer.

## Sequence Diagram
### Employer Sequence Diagram
This diagram shows the ordered interactions which the Employer user can take in time focus. Our system is made up of the Roster System / User Interface, the Systems Database, the Employer Account, and the Individual Rosters. Employers can perform difference opoerations once logged into the system. They can add a new Roster, add an employee to their account, add a timeslot entry to a Rosters, delete a Roster timeslot entry, or delete an entire roster.
![EmployerSequenceDiagram](https://user-images.githubusercontent.com/105229775/218795910-c2617b5c-0227-46e9-ab54-38e010d17b02.png)

### Employee Sequence Diagram
The other user of our system is the Employee of the company / business. This Sequence Diagram has the same objects as the Employer. Employees can perform difference opoerations once logged into their account that has been created for them on the system by the Employer. They can request a day off, request a shift swap with another employee, accept or decline a shift swap from another employee.
![EmployeeSequenceDiagram](https://user-images.githubusercontent.com/105229775/218797242-8ba3811a-f643-42be-8cf4-0fc2a0d3df0a.png)

## ER Diagram
This ER Diagram helps explain the logical structure of the work rostering system. It visualises how the different entities relate to each other.   
Firstly, when a user of the application logs on to use this web application, they must sign in using their username and password. This data is collected and registers whether the account is an employee or an employer. Employees are directed to the employee dashboard. Employers are directed to the employer’s dashboard. 
The employee dashboard contains the active roster being used at that moment. Employees can click into that roster where it reveals it to them in a calendar format. This is where they can avail of our feature of swap requesting. They also export the roster in picture format for printing. 
The employer dashboard contains all the existing rosters created by that employer. The dashboard also lists all the employees in the database that can be added to rosters. Employers can add and delete employees. Lastly, the employee can click in to the rosters where they can edit it. They can add new shifts, delete shifts and also export the roster in to picture format for printing.
![ERD (1)](https://user-images.githubusercontent.com/113925559/218854406-6c3868c6-9745-4d93-9743-59f66873f5b7.png)


## Design
### Path of Development
When setting out our plan to develop this system, we prioritised the foundations of the system first, and built upon them. This list and diagram describe the path of development that we strived to achieve to make development as efficient as possible. This ensured we had as much time as possible to implement features and polish to the product.
![CPD](https://user-images.githubusercontent.com/114653179/218506085-92ebfb08-134d-4445-b7a1-2d96416c9585.png)

<ins>__Features for the Employer view:__</ins>

1-	Login page for employers.

2-	Setting up an account registration for new firm accounts.

3-	Dashboard of employer - Create, delete, view, edit new roster.

4-	Upon roster selection:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(a) A calendar-like view to see each hour and employee details.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(b) Add new employee, delete an employee, add roster times, change times, delete times. 

5-	Delete whole roster – button on dashboard page and inside roster view.

6-	Follow on to point 2 -- Add hours of work when initialling the firm which will be automatically applied on all firm rosters.

<ins>__Features for the Employee view:__</ins>

7-	Login page for employees.

8-	Setting up an account registration for new accounts.

9-	Set up emails to authenticate employees joining a firms network.

10-	View active rosters.

11-	Request shift swap with other employees which must be accepted by the employer.

12-	Request days off, which must be accepted by the employer.

<ins>__Stretch goals__</ins>

13-	Add and edit holidays that the company is closed, closing hours of the firm, etc.

14-	Export roster to PDF or PNG.

15-	Chat function allowing employees to communicate.

### System architecture
The architecture of our web application can be abstracted into three layers: the 'presentation' layer or frontend, the 'logic' layer and the 'data access layer' or backend. This architecture is typical of the majority of modern web applications. 

As shown in the diagram below, the presentation layer is the user interface of the application, which users can interact with via a web browser. This layer is implemented using the ReactJS library. The data access layer consists of the database in which data generated by the users of our application is stored. The team chose to implement a relational database and host it on AWS for ease of access. The logic layer is the part of the backend that communicates with and performs operations on the data stored in the data access layer. This layer is implemented using Flask.

![software architecture drawio](https://user-images.githubusercontent.com/97966316/218335111-4dd13b2f-3cc1-4207-9923-dae1c8242b82.png)

## Implementation
### Technologies/Libraries
- **Front-end Framework:** React
- **Backend Framework:** Flask
- **Programming Languages:** Python, JavaScript
- **RDMS Relational Database Management System:** MySQL
- **ORM (Object Relational Mapping):** Flask-SQLAlchemy
- **SMTP:** Flask-Mail

### React
React is an open-source JavaScript library for building user interfaces. React makes creating user interfaces easy and painless. The way React works is that you define a state(which is just data) and design simple UI components for the state then React will update the component when the state(data) changes. Hence the name **React** i.e. The UI reacts to changes in state. One of our team member uses React frequently to build different projects, so he suggested using it for our project especially when working with data. The rest of the team did some research into React and learned the basics. It was easy to pick up because at its core React is still just HTML and CSS but wrapped with JavaScript to add the incredible functionality.

### Flask 
Flask is a Python web framework for building web applications in Python. It provides a set of tools and libraries that make it easy to create web applications quickly and easily. It is designed to be lightweight and flexible. It was an easy choice for the team when deciding what to use for developing the backend of our product.

We used Flask as our backend framework. It was perfect as it provided simple routing and a way to handle HTTP requests. Flask was used to build the API for our application by connecting to the MySQL database, performing CRUD(Create Read Update Delete) operations, and returning data(responses) we needed in JSON format or python dictionary.

### Database
Our Relational Database Management System was MySQL. We started out by hosting a MySQL server on AWS RDS(Amazon Web Services Relational Database System). We mostly used an ORM(Object Relational Mapping) Flask-SQLAlchemy for database queries they have a set of APIs for doing just this well documented on their website. We have four db models i.e. Employer, Employee, Shifts and Roster. We defined relationships between properties from these models for example Employer can have many employees and an Employee belongs to an Employer etc. They all have unique IDs as primary keys.

Our implementation is very simple, as simple as the way the web works. The frontend send HTTP requests to the backend and the backend responds back with JSON data. React uses JavaScript's built-in fetch() API to send to send a HTTP request to anyone of our many Flask API endpoints. Then Flask receives the request along with JSON data and performs CRUD operations accordinly if everything works perfeclty the the server should respond along with valid HTTP status codes e.g. 200, 400, 404.

![Blank diagram](https://user-images.githubusercontent.com/48455262/222864284-c8511aff-bc01-460d-b308-6c3d7715d3a5.png)


## References
Drake, R.G. (2017) “E-roster policy: Insights and implications of codifying nurse scheduling,” Health Informatics Journal, 25(3), pp. 844–857. Available at: https://doi.org/10.1177/1460458217724579.

Edie, L.C. (1954) “Traffic delays at Toll Booths,” Journal of the Operations Research Society of America, 2(2), pp. 107–138. Available at: https://doi.org/10.1287/opre.2.2.107.

Heimerl, P. et al. (2020) “Factors influencing job satisfaction in hospitality industry,” SAGE Open, 10(4), p. 215824402098299. Available at: https://doi.org/10.1177/2158244020982998.

Nursing Times (2021) Dilemmas of E-rostering old and new: Towards intelligent systems?, Nursing Times. Available at: https://www.nursingtimes.net/clinical-archive/healthcare-it/dilemmas-of-e-rostering-old-and-new-towards-intelligent-systems-07-05-2019/ (Accessed: January 31, 2023).

Petrovic, S. (2017) “‘you have to get wet to learn how to swim’ applied to bridging the gap between research into personnel scheduling and its implementation in practice,” Annals of Operations Research, 275(1), pp. 161–179. Available at: https://doi.org/10.1007/s10479-017-2574-4.

Square (2021) How to roster staff effectively: Types, tips and Guides L Square, Square. Available at: https://squareup.com/au/en/townsquare/roster-staff-effectively (Accessed: January 31, 2023).


<img src="https://user-images.githubusercontent.com/48455262/223453923-423ffe60-693b-4629-bd04-3d3a9f2d1ff6.png"
            width="100" height="100">
# Shift-Wizard - A Free and Open-Source Rostering System

<p align="center"> •
  <a href="#Chapter-1--Introduction">Introduction</a> •
  <a href="#Chapter-2--">Analysis</a> •
  <a href="#Chapter-3--">Design</a> •
  <a href="#Chapter-4--">Implementation</a> •
  <a href="#Extra">Extra Features</a> •
  <a href="#challenges">Challenges</a> •
  <a href="#Conclusion">Conclusion</a> •
  <a href="#References">References</a> •
</p>
        
### Contributors
Mark Kilgannon - 120398166\
Robbie O' Sullivan - 120399733\
Aideen Murphy - 120323726\
Timothy McGrath - 120354876\
Naphtali Odinakachi - 120432016

Our product is currently hosted at these sites
- <a href="https://shift-wizard.web.app" target="_blank" rel="nofollow">Employer's view</a>
- <a href="https://shift-wizard-employee.web.app" target="_blank" rel="nofollow">Employee's view</a>

## Installation Guide
<details>
  <summary>Linux/MacOS/Windows</summary>
  
  - You should be running three instances the backend, employers view frontend and the employee's view frontend
  - You need to install Nodejs. The LTS version preferably, from [here](https://nodejs.org/en/)
  - Run `cd backend` and `pip install -r requirements.txt` in your terminal to install dependencies for the flask backend. You might have trouble with       mysqlclient if you do then you need to install mysql server and add mysql to your PATH.
  - Then run `flask --app app.py --debug run` to start the backend on localhost.
  - assuming still in the backend folder run `cd ../frontend` then `npm install` to install node modules then `npm start` to start the employer's       frontend. 
  - assuming in frontend folder run `cd ../employee` then `npm install` to install node modules then `npm start` to start the employee's frontend. 
  
</details>

# Abstract
In this project we will explore the design and creation of an E-Rostering System. Optimising efficiency is important across all enterprises, in a typical restaurant labour costs can be at least 30% of revenue (Chegini, 2021). It is no surprise therefore, that there is a high level of interest as to how staffing is organised and how it can be used most effectively and efficiently without compromising a high standard of product / service. The project would involve building a frontend for the Employer and Employee, and a backend database that would store the different employee rosters and employee shifts. The hope is to create a system that will make organising employees similar for employers and make it easier for employees to independently manage and understand their work schedule.

# Chapter 1 - Introduction
In today's fast-paced work environment, efficient rostering systems are essential for businesses to manage their staff and resources effectively. A rostering system is a tool that allows employers/organisation to create, manage, and assign shifts to their employees in an organized and streamlined manner as well as to track the hours employees work, assign employees to specific tasks or projects, and generate reports on employee hours and project completion.

All businesses that rely on shift patterns and different number of workers at different times can benefit from an e-rostering system. Importantly, human involvement is still beneficial to rostering processes. Whether you’re talking about e-rostering or auto-rostering, HR specialist or general managers are still in charge. The main distinction is that the logistics often include intricate mathematical computation necessary to determine the rotas or shift schedules, are handled automatically. 
After all, it is vital not just to have the sufficient number of employees per workday, but as well the personnel with specific technical expertise to get specific jobs done and allow businesses work at maximum efficiency. Visualising and planning these rosters manually can be very challenging. 
This report and software aims to create a clear-cutting shift planning web application that relieves managers and HR specialists of difficulties that come with the demands of planning the most complex rostered organisation. Our E-rostering system is designed in the most efficient way possible that will help all businesses that depend on shift schedules, save their time, money, and resources.  

## Background

Work rostering the human resources of a business is more than merely recording each employees working hours. Rostering, when done correctly can be essential for planning how employees work within a firm.
A well planned roster can have an impact on five key areas in a business; employee motivation, performance tracking, attendance, workplace health and safety and productivity levels. 
It is all well and good having qualified staff but if they are unhappy because of the times they are working this can affect their performance. Jobs will be left undone, and attendance will be low. Using a rostering system can help find the specific time of day where each employee works best. When the human resources of a firm are managed fairly and efficiently, employees are far more motivated and productivity levels are met.
Our web application is designed to make the management of employees work schedules easier for HR specialists and general managers. The application will contain two views based on whether you’re a manager or an employee. A login function is required when accessing this application and this will determine what view the user will have access to. 

# Chapter 2 - Analysis
## 2.1 Research
To develop our own e-roster management system we first developed a research plan to gain a broader knowledge of the sector. This included both first-hand and second-hand research. Rostering, or personnel scheduling, has gained a lot of research interest since the 1950s (Edie, 1954). Over this time a variety of constraints have formed, from legal and organisation requirements to staff preferences. Different approaches have been taken to tackle these: optimization, meta-heristics, artificial intelligence, decision-support and a hybrid approach of these (Petrovic, 2017).

## 2.2 Market
There are many systems already on the market that provide roster management for businesses big and small. The top branded products include Xero, RosterElf, Sage, and Connecteam. The different price points and features are important to consider when choosing the best system to use for your business. Reporting capabilities such as, allowing the employer to separate reports for more detailed analysis of their management is crucial. The system should be user-friendly and customizable to fit with the businesses framework. Some systems have the added benefit of payroll, allowing an employer to deposit payroll to their employees directly. This simplifies the process of collating, producing, and filing taxes for payroll. Another feature many systems have is an instant alert where employees are sent reminders and notifications to notify them if their immediate action is required This can be for example, to review their new shift.

Here are two case studies we anaylsed on online roster systems that are marekt leaders at the moment to gain a greater understanding of our competitiors.

### 2.2.1 Case 1:
Xero is a New Zealand–based technology company that provides cloud-based accounting software for small and medium-sized businesses. The company also has a workforce management application called Planday that helps employers to set up a shift work roster system for their business. The benefits of this, is that it can integrate in with their accounting system, so employees can manage their payroll and scheduling all in one place. Xero calculates VAT and files VAT returns online securely with HMRC using software that’s compatible with HMRC systems. As well employees can connect their bank account to Xero and set up bank feeds. Some drawbacks to the Planday application is that it does not suit enterprises with a large number of staff operating from a single location. There are other software that are more convenient that charge by location and allow for an unlimited number of employees to be added. As well, businesses with a small budget who require a free plan do not suit Planday as all their plans are paid for. 

### 2.2.2 Case 2:
RosterElf is an Australian cloud-based staff scheduling tool to assist enterprises. The application allows managers to develop and publish employee rosters, chat with employees, and keep track of employee hours worked. RosterElf also provides features which help to make scheduling more efficient and keep employees satisfied, including shift swapping, automated shift reminders, and real-time reporting. RosterElf reports that they cater for any size of enterprise, including those in retail, hospitality, healthcare, and other industries. Although cheaper than Xero, RosterElf is still a monthly subscription per employee. This does not suit businesses starting out that do not have the budget or a small business with a large amount of overheads already. As well, RosterElf does offer a wide range of customization options, but many businesses rather a clean and simple solution to their employee management problems.

<p align="center">
<img src="https://www.allocatesoftware.co.uk/wp-content/uploads/sites/93/2021/03/Rostering-prop-page1.png" width="500">
</p>

## 2.3 Target Customer
An online Roster Management system is a Software as a service (SaaS) product. The target customer and market are small to medium enterprises in the hospitality, retail, entertainment, healthcare, gyms, sports clubs, etc. The system also indirectly effects the employers workers. These are the people that will use the roster system the most so it is important to keep the user in mind when creating a system. 
In healthcare, the industry has had extensive research done on the implications of codifying nurse schedules. In this situation, a non-robust system can have indirect consequences to patient care, work/life balance and hospital budgets (Drake, 2017). Back in 2014, the NHS in the U.K. wanted all clinical staff to be rostered electronically by the year 2021 (Nursing Times, 2021).

## 2.4 Roster Types
There are three main types of rosters for business operations which are used across all industry types and levels (Square, 2021). First is a Duty roster. These are frequently employed in the hospitality sector and are intended to reduce the number of excessive shifts. In essence, it prevents scheduling an excessive number of employees for the same shift and job duties. A roster system like this is important to combat loosing qualified workers due to low job satisfaction (Heimerl et al., 2020). Flexible rosters are the second type. These are for employees who can work a variety of hours to suit the employer. A staff member may work hours that do not correspond to the business' typical start and end timings if the roster is flexible. This might imply that they are scheduled to work any time within usually a 40-hour work week, for a few hours or a full day. Employees may, for instance, work from 7 a.m. to 4 p.m. rather than the standard 8 a.m. to 5 p.m. The last type is Staggered rosters. These are used where start times are staggered for workers. This roster type is typically used in industries that experience high changing demand of customers throughout the day, such as retail or restaurants. You may have two employees starting work at 9am and finishing at 2pm. Another starts at 11am to 2pm, another at 12am to 3pm, and so on. This gives more flexibility, and makes sure that a staff member is always on during lunch breaks, etc. 

<p align="center">
<img src="https://user-images.githubusercontent.com/105229775/223852361-753cc858-266b-4254-af93-60de9ac63441.png" width="500">
</p>

# Chapter 3 - Design
## 3.1 Path of Development
When setting out our plan to develop this system, we prioritised the foundations of the system first, and built upon them. This list and diagram describe the path of development that we strived to achieve to make development as efficient as possible. This ensured we had as much time as possible to implement features and polish to the product.

<p align="center">
<img src="https://user-images.githubusercontent.com/114653179/218506085-92ebfb08-134d-4445-b7a1-2d96416c9585.png" width="800">
</p>

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

11-	Request to change shift, which must be accepted by the employer.

12-	Request days off or holidays, which must be accepted by the employer.

<ins>__Stretch goals__</ins>

13-	Add and edit holidays that the company is closed, closing hours of the firm, etc.

14-	Export roster to PDF or PNG.

15-	Chat function allowing employees to communicate.

## 3.2 Use Case
This use case diagram describes how the user interacts with the system. There is two actors that interact with the system, employees and employers. These two actors will interact with a different view of the system. Both actors can log in, the employers will log into the employer view, and the employees will log into the employee view. 

For an employer logging into the system for the first time, the employer can create a new roster, which will create a roster in their database. This roster is then viewable on the dashboard, and the employer can edit the employees active on the roster, and their shifts.  

An employee logging into the system will be automatically shown their schedule, which shows their rostered shifts. They will be also able to view the rosters that their employers have created, along with the ability to request a shift change, the ability to request days off from their employer, and the ability to ask for a day off due to sickness or other reasons, with the requesting feature. These requests wil show up in an employers request tab, which they can enter to either accept the request, or deny it.

<p align="center">
<img src="https://user-images.githubusercontent.com/114653179/223481367-3cf30f84-1b0e-43b5-aa80-1ae169b73998.png" width="800">
</p>

## 3.3 Data Flow
This Data Flow diagram shows the flow of information throughout the system. The system has two views to start the data flow, employers and employees. Once the user registers as an employer or an employee, the system displays the users relevent dashboard. 

The employer can first create a roster. They do this by using the option on the dashboard, and after giving the roster a name, can choose to view it. The employer can make changes to the roster, and those changes will be applied automatically. These changes give notifications via email to registered employee's that the changes apply to. The employer can also download an exported roster to print out.

Once an employee logs in, they are greeted with an overview of their schedule. If they would like to view the active roster with all other employees, they can do so by choosing the roster tab. The employee can make a request to their employer for time off for sickness, holidays, if they are not available, or another reason by choosing the "Make a Request" tab. This request is then sent on to the employer to either accept, or deny.

<p align="center">
<img src="https://user-images.githubusercontent.com/114653179/223473291-01773a43-efb8-4ea4-bfe2-6b34107b64cc.png" width="800">
</p>

## 3.4 Sequence Diagram
### 3.4.1 Employer Sequence Diagram
This diagram shows the ordered interactions which the Employer user can take in time focus. Our system is made up of the Roster System / User Interface, the Systems Database, the Employer Account, and the Individual Rosters. Employers can perform difference opoerations once logged into the system. They can add a new Roster, add an employee to their account, add a timeslot entry to a Rosters, delete a Roster timeslot entry, or delete an entire roster.

<p align="center">
<img src="https://user-images.githubusercontent.com/105229775/218795910-c2617b5c-0227-46e9-ab54-38e010d17b02.png" width="800">
</p>

### 3.4.2 Employee Sequence Diagram
The other user of our system is the Employee of the company / business. This Sequence Diagram has the same objects as the Employer. Employees can perform difference opoerations once logged into their account that has been created for them on the system by the Employer. They can request a day off, request a shift swap with another employee, accept or decline a shift swap from another employee.

<p align="center">
<img src="https://user-images.githubusercontent.com/105229775/218797242-8ba3811a-f643-42be-8cf4-0fc2a0d3df0a.png" width="800">
</p>

## 3.5 ER Diagram
This ER Diagram helps explain the logical structure of the work rostering system. It visualises how the different entities relate to each other.   
Firstly, when a user of the application logs on to use this web application, they must sign in using their username and password. This data is collected and registers whether the account is an employee or an employer. Employees are directed to the employee dashboard. Employers are directed to the employer’s dashboard. 
The employee dashboard contains the active roster being used at that moment. Employees can click into that roster where it reveals it to them in a calendar format. This is where they can avail of our feature of swap requesting. They also export the roster in picture format for printing. 
The employer dashboard contains all the existing rosters created by that employer. The dashboard also lists all the employees in the database that can be added to rosters. Employers can add and delete employees. Lastly, the employee can click in to the rosters where they can edit it. They can add new shifts, delete shifts and also export the roster in to picture format for printing.

<p align="center">
<img src="https://user-images.githubusercontent.com/113925559/218854406-6c3868c6-9745-4d93-9743-59f66873f5b7.png" width="800">
</p>

# Chapter 4 - Implementation
<p align="center">
<img src="https://user-images.githubusercontent.com/105229775/224044950-955afed5-9a24-42c7-ae61-bacefc06ddbe.png" width="700">
</p>

## 4.1 Core Technologies
### Technologies/Libraries
- **Front-end Framework:** React
- **Backend Framework:** Flask
- **Programming Languages:** Python, JavaScript
- **RDMS Relational Database Management System:** MySQL
- **ORM (Object Relational Mapping):** Flask-SQLAlchemy
- **SMTP:** Flask-Mail

### 4.1.1 React
React is an open-source JavaScript library for building user interfaces. React makes creating user interfaces easy and painless. The way React works is that you define a state(which is just data) and design simple UI components for the state then React will update the component when the state(data) changes. Hence the name **React** i.e. The UI reacts to changes in state. One of our team member uses React frequently to build different projects, so he suggested using it for our project especially when working with data. The rest of the team did some research into React and learned the basics. It was easy to pick up because at its core React is still just HTML and CSS but wrapped with JavaScript to add the incredible functionality.

### 4.1.2 Flask 
Flask is a Python web framework for building web applications in Python. It provides a set of tools and libraries that make it easy to create web applications quickly and easily. It is designed to be lightweight and flexible. It was an easy choice for the team when deciding what to use for developing the backend of our product.

We used Flask as our backend framework. It was perfect as it provided simple routing and a way to handle HTTP requests. Flask was used to build the API for our application by connecting to the MySQL database, performing CRUD(Create Read Update Delete) operations, and returning data(responses) we needed in JSON format or python dictionary.

### 4.1.3 Database
Our Relational Database Management System was MySQL. We started out by hosting a MySQL server on AWS RDS(Amazon Web Services Relational Database System). We mostly used an ORM(Object Relational Mapping) Flask-SQLAlchemy for database queries they have a set of APIs for doing just this well documented on their website. We have four db models i.e. Employer, Employee, Shifts and Roster. We defined relationships between properties from these models for example Employer can have many employees and an Employee belongs to an Employer etc. They all have unique IDs as primary keys.

Our implementation is very simple, as simple as the way the web works. The frontend send HTTP requests to the backend and the backend responds back with JSON data. React uses JavaScript's built-in fetch() API to send to send a HTTP request to anyone of our many Flask API endpoints. Then Flask receives the request along with JSON data and performs CRUD operations accordinly if everything works perfeclty the the server should respond along with valid HTTP status codes e.g. 200, 400, 404.

![Blank diagram](https://user-images.githubusercontent.com/48455262/222864284-c8511aff-bc01-460d-b308-6c3d7715d3a5.png)

## 4.2 Employer's view

Users should log in or create an account if they do not have one

<img alt="Screenshot" style="display: block;margin-left: auto;margin-right: auto;"
            src="https://user-images.githubusercontent.com/48455262/223737872-8a264652-b6f3-4faa-ae5d-0287fd985e42.png">

After logging in you are presented with you dashboard where you can create, edit, view and/or delete a roster. If you don't have any rosters then you create one with the form on the left. Then Click **VIEW ROSTER** to open the roster

<img alt="Screenshot" style="display: block;margin-left: auto;margin-right: auto;"
            src="https://user-images.githubusercontent.com/48455262/223875214-7556aad2-bfb1-4ecf-820a-bbafa983063a.png">
            
A Roster Generaaly looks like this. It is initially empty but the employer has to populate it with employees and assign shifts to the employee. You can click the print button to print a roster to pdf.

<img alt="Screenshot" style="display: block;margin-left: auto;margin-right: auto;"
            src="https://user-images.githubusercontent.com/48455262/223876774-0cb0e7a4-b35a-43a4-87ac-557bca6c8488.png">

An employee get's their login details sent to them via email when the employer add's them to the organisation/roster. Thier password is random and auto-generated. It can be changed by the employee when they log in.

<img  alt="Screenshot" style="display: block;margin-left: auto;margin-right: auto;"
            src="https://user-images.githubusercontent.com/48455262/223878421-157eb2f1-a244-4fe5-b436-098537fdfc10.png">
            
## 4.3 Employee's view

The employee should log in with login credentials sent to thier email.

![Screenshot 2023-03-09 at 00 09 32](https://user-images.githubusercontent.com/48455262/223881616-9f5d2f09-10dc-4eb5-9b05-ff48e9b7ede3.png)

After that employees are able to view their personal schedule as a calender.

![Screenshot 2023-03-09 at 00 13 30](https://user-images.githubusercontent.com/48455262/223882012-01673389-bfb3-4c4a-a7bc-88da9dac4d95.png)

They can view the full roster made by their manager/employer

![Screenshot 2023-03-09 at 00 16 14](https://user-images.githubusercontent.com/48455262/223882475-f3a2cb25-53b5-47e3-8f69-33e584267fa2.png)

They can also send requests to the employer. Requests for time-off, shift swaps and many more. Requests are pending initially and need approval from the employer

![Screenshot 2023-03-09 at 00 17 24](https://user-images.githubusercontent.com/48455262/223882597-384f8b50-6636-4fcc-9e3b-946e97a7d021.png)


### Hosting
- The Flask Backend is hosted on [heroku](https://heroku.com/).
- The React Frontend is hosted on [Firebase](https://firebase.google.com/).

## Extra Features

- Sending automated emails. Employees are sent their login credentials to thier email. Also every time they are assigned a shift or their shift is edited they are sent an email with the shift details.
- Employer users can edit their profile.
- Employee users are able to change their passwords from the auto-generated password sent to their email

#### Security
- For authentication we used JWT Authentication and token are being stored on the client. JSON Web Tokens are a good way of transmitting information between parties securely because they can be signed, which means you can be sure senders are who they say they are.
- To prevent SQL injections we used an ORM for database querying.
- Passwords in the database are salted and then hashed which makes it harder and impossible to crack.
- All our Flask backend API routes are protected(wrapped with a token_required wrapper). You need a valid token to be able to send requests via the API.

## Challenges

- We had troubles trying to get our app dependencies installed on each of our computers. We were trying to connect to our mysql server and it wasn't working because additional software has to be installed like installing mysql and adding it to PATH. It took a while but we eventually got it installed and working perfectly.

- We had the same issue above when deploying our app to the cloud. Those dependencies wouldn't install automatically on the cloud instance. It took a while but we eventually figured it out. We just had to figure a way to ssh into the linux instance running on the cloud and install everything manually.

- Emails were scarce to work with. An email was created just for our app and our employee models were populated with random emails like jake123@gmail.com. We got our app email blocked by google because those emails even though they seem random actually belong to people and so our email got disabled for spamming. We found a way to work around it by using more random and preposterous emails like test234@widget.game.

## Lessons Learned
1 -	Team Roles and Responsibilites:

Defining team roles and responsibilities was essential for ensuring that everyone knows what they are responsible for and what is expected of them. It also helps prevent confusion and overlapping work. For example, some of our team members had different strengths and weaknesses, such as coding ability, writing ability and idea and feature imagination. By splitting up roles according to these strengths and characteristics, the development ran much smoother and efficient.

2 -	Time Management: 

Time management was crucial for ensuring that the project was completed on schedule. Creating a project timeline, as can be found above in the “Path of Development” section, and setting realistic deadlines helped the team stay on track to complete tasks on a timeframe that suited the quick nature of the module. As can be seen on the plan, the team did not get to complete two of our original stretch goals. We originally planned them as stretch goals with the objective to complete them all, but we knew the short timeframe of the project might not allow for these. In the end, the team was happy to complete one of these stretch goals, but perhaps with better time management, all could have been completed.

3 -	Adaptability: 

No matter how well-planned the project development was, unexpected challenges did arise. For example, availability was a struggle for the group for the first weeks. We had an unfortunate string of illness and absences for the majority of the team on two weeks during the already short project. Thankfully, we as a team were as adaptable as possible, and moved to online collaboration and different meeting times where it was possible to keep the efficiency of the project as high as possible. 

4 -	Documentation and Planning:

Keeping on top of changes in goals and structure would have saved the group time. Retrospective changes needed to be to the software and the report, which took up valuable time that could have been used else ware. Documenting all these changes and decisions would help future developers understand the project and make improvements.

5 -         Communication:

Communication was key. Clearly sharing our ideas and problems with each other allowed the project to progress and grow further. A problem had was a problem shared. At first, we had difficulty in doing this efficiently. Following a hybrid of AGILE and WATERFALL development really helped our communication and teamwork skills, having regular meetings either in person or online with regular contact over messaging through the projects development.  

# Conclusion
In conclusion, the Shift-Wizard e-rostering system offers a range of benefits for firms looking to optimise their workforce scheduling. The system provides a user-friendly interface that allows managers to quickly and easily create, edit, manage employee schedules, and employees to track their rostered shifts easily and intuitively. Additionally, the Shift-Wizard system provides real-time updates and alerts, ensuring that schedules are always up-to-date and that any changes are communicated promptly to employees by email.

Overall, our evaluation of the Shift-Wizard e-rostering system has highlighted its potential to improve workforce management processes, increase staff productivity, and reduce costs associated with manual rostering processes. We recommend that organizations considering implementing an e-rostering system consider Shift-Wizard as a viable option, and evaluate its potential benefits against their own specific needs and requirements.

As we have highlighted in the plan, some strech goals were not met as the team overestimated the time taken on polish of the product. One of these was to add functionality that an employer can add days the the firm is closed, and opening/closing hours. Another was a feature similar to a group chat, implemented in the employee and employer view, allowing either employees to communicate with each other, or employees to get in contact with theie employer to discuss shifts. These can be the first jumpimg on point to any future developers working on our free, open source application. From there on, they can expand on the many different features in the system, giving more functionality to some of the products more elaborate parts.

Development on Shift-Wizard has been an overall great success. We have achieved the vast majority of our goals and delivered a high-quality software solution that would meet the needs of our target market. All members of the team is very happy with the finished product and have learned many programming, team-work, and presentaion skills along the way.


## References
Chegini, A. (2021) What percentage should labor cost be in a restaurant?, Epos Now. Epos Now. Available at: https://www.eposnow.com/ie/resources/what-percentage-should-labor-cost-be-in-a-restaurant/#:~:text=Labour%20is%20often%20one%20of,on%20the%20type%20of%20restaurant. (Accessed: March 7, 2023).

Drake, R.G. (2017) “E-roster policy: Insights and implications of codifying nurse scheduling,” Health Informatics Journal, 25(3), pp. 844–857. Available at: https://doi.org/10.1177/1460458217724579.

Edie, L.C. (1954) “Traffic delays at Toll Booths,” Journal of the Operations Research Society of America, 2(2), pp. 107–138. Available at: https://doi.org/10.1287/opre.2.2.107.

Heimerl, P. et al. (2020) “Factors influencing job satisfaction in hospitality industry,” SAGE Open, 10(4), p. 215824402098299. Available at: https://doi.org/10.1177/2158244020982998.

Nursing Times (2021) Dilemmas of E-rostering old and new: Towards intelligent systems?, Nursing Times. Available at: https://www.nursingtimes.net/clinical-archive/healthcare-it/dilemmas-of-e-rostering-old-and-new-towards-intelligent-systems-07-05-2019/ (Accessed: January 31, 2023).

Petrovic, S. (2017) “‘you have to get wet to learn how to swim’ applied to bridging the gap between research into personnel scheduling and its implementation in practice,” Annals of Operations Research, 275(1), pp. 161–179. Available at: https://doi.org/10.1007/s10479-017-2574-4.

Square (2021) How to roster staff effectively: Types, tips and Guides L Square, Square. Available at: https://squareup.com/au/en/townsquare/roster-staff-effectively (Accessed: January 31, 2023).

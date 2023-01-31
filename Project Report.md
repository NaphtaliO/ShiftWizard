# Introduction
All businesses that rely on shift patterns and different number of workers at different times can benefit from an e-rostering system. Importantly, human involvement is still beneficial to rostering processes. Whether you’re talking about e-rostering or auto-rostering, HR specialist or general managers are still in charge. The main distinction is that the logistics often include intricate mathematical computation necessary to determine the rotas or shift schedules, are handled automatically. 
After all, it is vital not just to have the sufficient number of employees per workday, but as well the personnel with specific technical expertise to get specific jobs done and allow businesses work at maximum efficiency. Visualising and planning these rosters manually can be very challenging. 
This report and software aims to create a clear-cutting shift planning web application that relieves managers and HR specialists of difficulties that come with the demands of planning the most complex rostered organisation. Our E-rostering system is designed in the most efficient way possible that will help all businesses that depend on shift schedules, save their time, money, and resources.  


# Background

Work rostering the human resources of a business is more than merely recording each employees working hours. Rostering, when done correctly can be essential for planning how employees work within a firm.
A well planned roster can have an impact on five key areas in a business; employee motivation, performance tracking, attendance, workplace health and safety and productivity levels. 
It is all well and good having qualified staff but if they are unhappy because of the times they are working this can affect their performance. Jobs will be left undone, and attendance will be low. Using a rostering system can help find the specific time of day where each employee works best. When the human resources of a firm are managed fairly and efficiently, employees are far more motivated and productivity levels are met.
Our web application is designed to make the management of employees work schedules easier for HR specialists and general managers. The application will contain two views based on whether you’re a manager or an employee. A login function is required when accessing this application and this will determine what view the user will have access to. 

# Research
To develop our own e-roster management system we first developed a research plan to gain a broader knowledge of the sector. This included both first-hand and second-hand research. Rostering, or personnel scheduling, has gained a lot of research interest since the 1950s (Edie, 1954). Over this time a variety of constraints have formed, from legal and organisation requirements to staff preferences. Different approaches have been taken to tackle these: optimization, meta-heristics, artificial intelligence, decision-support and a hybrid approach of these (Petrovic, 2017).

## Market
There are many systems already on the market that provide roster management for businesses big and small. The top branded products include Sage, Myob, Xero, and Connecteam. The different price points and features are important to consider when choosing the best system to use for your business. Reporting capabilities such as, allowing the employer to separate reports for more detailed analysis of their management is crucial. The system should be user-friendly and customizable to fit with the businesses framework. Some systems have the added benefit of payroll, allowing an employer to deposit payroll to their employees directly. This simplifies the process of collating, producing, and filing taxes for payroll. Another feature many systems have is an instant alert where employees are sent reminders and notifications to notify them if their immediate action is required This can be for example, to review their new shift.

<img src="https://www.allocatesoftware.co.uk/wp-content/uploads/sites/93/2021/03/Rostering-prop-page1.png" width="1000">

## Target Customer
An online Roster Management system is a Software as a service (SaaS) product. The target customer and market are small to medium enterprises in the hospitality, retail, entertainment, healthcare, gyms, sports clubs, etc. The system also indirectly effects the employers workers. These are the people that will use the roster system the most so it is important to keep the user in mind when creating a system. 
In healthcare, the industry has had extensive research done on the implications of codifying nurse schedules. In this situation, a non-robust system can have indirect consequences to patient care, work/life balance and hospital budgets (Drake, 2017). Back in 2014, the NHS in the U.K. wanted all clinical staff to be rostered electronically by the year 2021 (Nursing Times, 2021).

## Roster Types
There are three main types of rosters for business operations which are used across all industry types and levels (Square, 2021). First is a Duty roster. These are frequently employed in the hospitality sector and are intended to reduce the number of excessive shifts. In essence, it prevents scheduling an excessive number of employees for the same shift and job duties. A roster system like this is important to combat loosing qualified workers due to low job satisfaction (Heimerl et al., 2020). Flexible rosters are the second type. These are for employees who can work a variety of hours to suit the employer. A staff member may work hours that do not correspond to the business' typical start and end timings if the roster is flexible. This might imply that they are scheduled to work any time within usually a 40-hour work week, for a few hours or a full day. Employees may, for instance, work from 7 a.m. to 4 p.m. rather than the standard 8 a.m. to 5 p.m. The last type is Staggered rosters. These are used where start times are staggered for workers. This roster type is typically used in industries that experience high changing demand of customers throughout the day, such as retail or restaurants. You may have two employees starting work at 9am and finishing at 2pm. Another starts at 11am to 2pm, another at 12am to 3pm, and so on. This gives more flexibility, and makes sure that a staff member is always on during lunch breaks, etc. 



# Use Case
![image](https://user-images.githubusercontent.com/114653179/215885357-0b4a5a65-99b0-4d43-8cc4-8874a3dc7edb.png)
This use case diagram describes how the user interacts with the system. There is two actors that interact with the system, employees and employers. These two actors will interact with a different view of the system. Both actors can log in, and will then be sorted into whether they are employers or employees. 

For an employer logging into the system for the first time, the option to register the account and set up working hours and employee data will be given. This allows for greater automation and ease of use for employers. Once registered, the employer can create a new roster, or interact with an existing roster. They can also see any active requests made by employees to swap shift or request days off.

An employee logging into the system will be able to view the rosters that their employers have created, along with the ability to request a shift change with another employee or the ability to request days off from their employer. If the employee receives a request to swap from another employee, the request will show up on their dashboard. 

# References
Drake, R.G. (2017) “E-roster policy: Insights and implications of codifying nurse scheduling,” Health Informatics Journal, 25(3), pp. 844–857. Available at: https://doi.org/10.1177/1460458217724579.

Edie, L.C. (1954) “Traffic delays at Toll Booths,” Journal of the Operations Research Society of America, 2(2), pp. 107–138. Available at: https://doi.org/10.1287/opre.2.2.107.

Heimerl, P. et al. (2020) “Factors influencing job satisfaction in hospitality industry,” SAGE Open, 10(4), p. 215824402098299. Available at: https://doi.org/10.1177/2158244020982998.

Nursing Times (2021) Dilemmas of E-rostering old and new: Towards intelligent systems?, Nursing Times. Available at: https://www.nursingtimes.net/clinical-archive/healthcare-it/dilemmas-of-e-rostering-old-and-new-towards-intelligent-systems-07-05-2019/ (Accessed: January 31, 2023).

Petrovic, S. (2017) “‘you have to get wet to learn how to swim’ applied to bridging the gap between research into personnel scheduling and its implementation in practice,” Annals of Operations Research, 275(1), pp. 161–179. Available at: https://doi.org/10.1007/s10479-017-2574-4.

Square (2021) How to roster staff effectively: Types, tips and Guides L Square, Square. Available at: https://squareup.com/au/en/townsquare/roster-staff-effectively (Accessed: January 31, 2023).


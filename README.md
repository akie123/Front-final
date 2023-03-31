## The healthcare consultation service.

EClinic is a web service that integrates common medical tasks and processes into a uniform system. The project's
aim is to provide functionality which includes registration for a doctor as well as a patient, and it enables doctors
to insert, update, and delete appointment slots. It also allows patients to search for doctors based on their
specialty and book appointments accordingly. The system allows both doctors and patients to cancel their
scheduled appointments, and notifies them whenever an appointment gets cancelled in their notification menu.
In addition to these core features, EClinic also includes an admin panel that enables the management of doctors
and patients, as well as the ability to verify doctors and respond to queries received from the homepage.
The proposed model for EClinic includes several sub-models, including user management, doctor management,
appointment management, and review management. The user management component allows users to register
and login to the system, edit their account information, and delete their account. The doctor management
component allows doctors to be added, edited, and deleted, and allows patients to search for doctors by
specialization. The appointment management component allows patients to schedule, reschedule, and cancel
appointments with doctors, and view their upcoming appointments. The review management component allows
patients to leave reviews and ratings for their doctors.
The EClinic system is also built using MongoDB, Express, and Node.js, which allows for dynamic and flexible
document schemas and seamless integration with JavaScript. The proposed model includes entities such as
users, accounts, doctors, appointments, prescriptions, and reviews, as well as value objects such as contact info,
payment info, specialization, schedule, qualifications, and medicine dosage and frequency. The model also
includes services such as registering and editing users, adding and editing doctors, scheduling and cancelling
appointments, and adding and deleting prescriptions and reviews.
Overall, EClinic is designed to provide a convenient and efficient way for patients to book appointments and
receive medical care from qualified doctors in a simple and secure online environment.
## Working
Open your favorite Terminal and run these commands.

Install All Dependecies:
```sh
npm init install
```

start the react app:

```sh
npm start
```

Run the server(Json Server for mock backend):

```sh
npm run serve-json
```


Now open port number 3000 on your browser(http://localhost:3000/) to view the react app.

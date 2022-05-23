# Wedding Party Website

Wedding party website with a server and a client. The client makes API calls to the server to get information/settings. I have used https://cloud.mongodb.com/ as the database to save/retrieve all of the data.

Basic home page which displays a countdown to the event.

![Alt text](screenshots/home.png?raw=true)

Basic info page which has an embedded map.

![Alt text](screenshots/info.png?raw=true)

This form allows visitors on the site to rsvp. On success the server also sends an email to your email address of choice and the rsvp form data is saved to the database.

![Alt text](screenshots/rsvp.png?raw=true)

The login page allows access to the backend/admin area, which is only permitted if you enter the correct email address and password.

![Alt text](screenshots/login.png?raw=true)

The dashboard admin screen shows all of the rsvp responses received.

![Alt text](screenshots/dashboard.png?raw=true)

The settings admin screen allows the admin to change the wedding date and time this is then saved to the database and the countdown timer on the homepage gets updated accordingly.

![Alt text](screenshots/settings.png?raw=true)
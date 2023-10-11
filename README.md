# Simple booking system built with Vue 3 & Firebase for authentication and storing data.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Roadmap for creating this project

1. Firebase for authentication and data storing.
2. Routing system (Vue Router) in router/index.js for defining paths/pages.
3. Set Register page as default "/" home page for users to register first.
4. Forgot password page for sending the user a link on the email for new password.
5. Navigate user to /dashboard if user registers or log's in.
6. Dashboard gives user an option to register a new booking or see existing bookings.
7. Booking a new appointment sends following data to Firestore:

- date: The date of the appointment. (e.g., "2023-10-05")
- topic: The topic or reason for the appointment. (e.g., "Front-end", "Design")
- location: Where the meeting takes place
- comments: Additional details or comments provided by the user.
- userId: The ID of the user who booked the appointment. This helps in linking the appointment to a specific user.

8. Use VueDatePicker component for as calendar widget.
9. View Bookings: Lets user to see, edit and delete bookings.
10. Editing allows users to edit existing booking through the modal and deleting button deletes existing bookign from the Firebase.

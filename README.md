# RFG                                                                                                                                                                                                              
  
  Website for a friend's restaurant, built in 2024.                                                                                                                                                                     
  ## About                                                                                                                                                                                                           
  
  This was my first React project — I had no prior frontend experience when I started, and learned as I built, using ChatGPT as a pair-programmer. After launch, the restaurant switched to a third-party POS system,
   And I integrated the site with it.

  ## Features

  - Public-facing site: landing page, menu, contact, location
  - Online reservation system with date/time picker
  - Admin panel for managing bookings and seat/table positioning
  - Third-party POS integration (added post-launch)

  ## Stack

  - **Frontend:** React 18 (Create React App), React Router, Tailwind CSS, Axios, Flatpickr / react-datepicker
  - **Backend:** Node.js + Express, MySQL

  ## Running Locally

  ```bash
  npm install
  npm start         # frontend (react-scripts)
  node server.js    # backend API
  ```

  Database connection is configured in `server.js`.

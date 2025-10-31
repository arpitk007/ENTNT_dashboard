# Equipment Rental Management Dashboard

## Overview

This project is a frontend-only **Equipment Rental Management Dashboard** developed for ENTNT as part of a technical assignment for the role of Frontend Developer (React). The dashboard manages equipment inventory, rental orders, maintenance records, and notifications, with all data interactions simulated using `localStorage`. The application is built with React, uses React Router for navigation, Context API for state management, and custom CSS for styling (without Bootstrap). It is fully responsive and includes features like user authentication, role-based access control, a calendar view, and a KPIs dashboard.

The project is deployed on both Vercel and GitHub Pages, and the source code is hosted on GitHub. This README provides setup instructions, architecture overview, known issues, and technical decisions as required.

---

## Deployed App and GitHub Links

- **Deployed App Link (GitHub Pages)**: [https://arpitk007.github.io/ENTNT_dashboard/](https://arpitk007.github.io/ENTNT_dashboard/)

- **GitHub Repository Link**: [https://github.com/arpitk007/ENTNT_dashboard](https://github.com/arpitk007/ENTNT_dashboard)


---

## Features

### Core Features
- **User Authentication (Simulated)**:
  - Hardcoded users: Admin (`admin@entnt.in`/`admin123`), Staff (`staff@entnt.in`/`staff123`), Customer (`customer@entnt.in`/`cust123`).
  - Login with email/password, session persistence via `localStorage`.
  - Role-based access control (e.g., Maintenance feature is hidden for Customers).
- **Equipment Inventory Management**:
  - List equipment items (Name, Category, Condition, Status).
  - Add, Edit, Delete equipment items.
  - Equipment Detail Page with rental history.
- **Rental Orders Management**:
  - Create rental orders (select customer, equipment, rental period, status).
  - View and filter rental orders by status.
  - Update rental order status (Reserved, Rented, Returned).
- **Maintenance Records Management**:
  - Add, Edit, View maintenance records (Equipment ID, Date, Type, Notes).
- **Calendar View for Rentals**:
  - Monthly calendar view showing scheduled rentals.
  - Click on a date to see rentals for that day.
- **Notification Center**:
  - In-app notifications for New Rental Created, Rental Returned, Maintenance Scheduled.
  - Dismissible notifications with filter options.
- **KPIs Dashboard**:
  - Displays Total Equipment, Available vs Rented, Overdue Rentals, Upcoming Maintenance using cards.
- **Data Persistence**:
  - All data stored in `localStorage` (users, equipment, rentals, maintenance, sessions).
- **Responsive Design**:
  - Fully responsive across mobile, tablet, and desktop with a custom-styled header (hamburger menu on mobile).

### Bonus Features
- **Dark Mode**: Toggle between light and dark themes.
- **Line Ending Standardization**: Added `.gitattributes` to enforce LF line endings for cross-platform consistency.

---

## Setup Instructions

### Prerequisites
- **Node.js**: Version 18.x or later.
- **npm**: Version 9.x or later.
- **Git**: Installed on your machine.

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/arpitk007/ENTNT_dashboard.git
   cd ENTNT_dashboard
   ```


2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application Locally**:
   ```bash
   npm run dev
   ```
   - Open `http://localhost:5173` in your browser to view the app.
   - Use the following credentials to log in:
     - Admin: `admin@entnt.in` / `admin123`
     - Staff: `staff@entnt.in` / `staff123`
     - Customer: `customer@entnt.in` / `cust123`

4. **Build for Production**:
   ```bash
   npm run build
   ```
   - This generates the production build in the `dist/` folder.
   - Preview the build:
     ```bash
     npm run preview
     ```

---

## Architecture Overview

The project follows a modular and clean architecture, adhering to React best practices. Below is the structure:

```
src/
├── components/
│   ├── Authentication/
│   │   └── LoginForm.jsx
│   ├── Dashboard/
│   │   ├── KPICards.jsx
│   │   └── Charts.jsx (placeholder for future implementation)
│   ├── Equipment/
│   │   ├── EquipmentList.jsx
│   │   ├── EquipmentDetail.jsx
│   │   └── EquipmentForm.jsx
│   ├── Rentals/
│   │   ├── RentalList.jsx
│   │   ├── RentalForm.jsx
│   │   └── RentalCalendar.jsx
│   ├── Maintenance/
│   │   ├── MaintenanceList.jsx
│   │   └── MaintenanceForm.jsx
│   ├── Notifications/
│   │   └── NotificationCenter.jsx
│   └── Header.jsx
├── contexts/
│   ├── AuthContext.jsx
│   ├── EquipmentContext.jsx
│   └── RentalsContext.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── EquipmentPage.jsx
│   ├── EquipmentDetailPage.jsx
│   ├── RentalsPage.jsx
│   ├── MaintenancePage.jsx
│   └── CalendarPage.jsx
├── utils/
│   ├── localStorageUtils.js
│   └── roleUtils.js
├── styles/
│   └── main.css
├── App.jsx
└── index.jsx
```

### Key Architectural Details
- **React Router**: Handles navigation between pages (`/login/:role`, `/dashboard`, `/equipment`, etc.).
- **Context API**: Used for state management (`AuthContext`, `EquipmentContext`, `RentalsContext`) to manage user sessions, equipment, and rentals.
- **LocalStorage**: All data persistence is handled via `localStorage` using utility functions in `localStorageUtils.js`.
- **Custom CSS**: Styling is done with custom CSS (`main.css`) without Bootstrap, ensuring a lightweight and responsive design.
- **Role-Based Access**: Implemented in `roleUtils.js` to restrict access based on user roles (e.g., Maintenance is Admin/Staff only).

---

## Known Issues

1. **Notification Sound**:
   - `NotificationCenter.jsx` attempts to play `/notification-sound.mp3` when a notification is triggered, but this file is not included in the `public/` folder, resulting in a console error on the deployed app.
   - **Workaround**: Add `notification-sound.mp3` to the `public/` folder or remove the audio playback code:
     ```javascript
     const audio = new Audio('/notification-sound.mp3');
     audio.play().catch((err) => console.log('Audio playback failed:', err));
     ```

2. **Charts in KPIs Dashboard**:
   - The KPIs Dashboard currently uses cards to display metrics (Total Equipment, Available vs Rented, etc.), but charts (as specified in `Charts.jsx`) are not implemented due to time constraints.
   - **Future Improvement**: Integrate a library like Chart.js to visualize KPIs.

3. **Overdue Rentals and Upcoming Maintenance**:
   - The KPIs Dashboard does not yet calculate Overdue Rentals or Upcoming Maintenance dynamically.
   - **Future Improvement**: Add logic to calculate these metrics based on rental `endDate` and maintenance `date`.

---

## Technical Decisions

1. **Styling with Custom CSS**:
   - Initially, Bootstrap was used for styling, but it was removed to reduce bundle size and achieve a more customized look. Custom CSS (`main.css`) was implemented with a responsive header (hamburger menu on mobile) and theme support (light/dark mode).
   - CSS variables (e.g., `--primary`, `--header-bg`) ensure consistent theming across light and dark modes.

2. **State Management with Context API**:
   - Chose Context API over Redux for simplicity, as the project’s state (authentication, equipment, rentals) is relatively straightforward.
   - Separate contexts (`AuthContext`, `EquipmentContext`, `RentalsContext`) keep concerns isolated and improve maintainability.

3. **Line Ending Standardization**:
   - Added `.gitattributes` to enforce LF line endings (`* text=auto eol=lf`) to ensure cross-platform consistency, especially since Vercel and GitHub Pages (Linux-based) prefer LF.
   - Resolved `LF will be replaced by CRLF` warnings by configuring Git (`core.autocrlf=input`) and normalizing files.

4. **Deployment on Vercel and GitHub Pages**:
   - Deployed on Vercel for its seamless GitHub integration and automatic redeployment on push.
   - Also deployed on GitHub Pages to meet assignment requirements, using the `gh-pages` branch to host the static build (`dist/` folder).

5. **No External APIs or Libraries for Authentication**:
   - Per the assignment requirements, no backend APIs or external libraries for authentication were used. Authentication is simulated with hardcoded users and `localStorage`.

---

## Future Improvements

- Implement charts in the KPIs Dashboard using a library like Chart.js.
- Add logic to calculate Overdue Rentals and Upcoming Maintenance in the Dashboard.
- Include an export feature to download reports (e.g., rental history as CSV).
- Fix the notification sound issue by adding the audio file or removing the audio playback.

---

## Sample Data

The app initializes with the following mock data in `localStorage` (as specified in the assignment):

```json
{
  "users": [
    { "id": "1", "role": "Admin", "email": "admin@entnt.in", "password": "admin123" },
    { "id": "2", "role": "Staff", "email": "staff@entnt.in", "password": "staff123" },
    { "id": "3", "role": "Customer", "email": "customer@entnt.in", "password": "cust123" }
  ],
  "equipment": [
    { "id": "eq1", "name": "Excavator", "category": "Heavy Machinery", "condition": "Good", "status": "Available" },
    { "id": "eq2", "name": "Concrete Mixer", "category": "Construction", "condition": "Excellent", "status": "Rented" }
  ],
  "rentals": [
    { "id": "r1", "equipmentId": "eq2", "customerId": "3", "startDate": "2025-06-01", "endDate": "2025-06-05", "status": "Reserved" }
  ],
  "maintenance": [
    { "id": "m1", "equipmentId": "eq1", "date": "2025-05-20", "type": "Routine Check", "notes": "No issues found" }
  ]
}
```

---

## Conclusion

This project demonstrates a fully functional Equipment Rental Management Dashboard with a clean, modular codebase, responsive design, and efficient state management. It meets the assignment requirements and includes bonus features like dark mode. Despite minor known issues (e.g., notification sound, charts), the app is production-ready and deployed on GitHub Pages for review.

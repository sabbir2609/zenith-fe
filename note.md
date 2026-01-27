Dashboard Page : Component

- Welcome message, Weather, Date, Time
- floors, rooms, facilities
- guests, staff, suppliers
- check-in, check-out, billing
- reservations, payments, reports
- maintenance, housekeeping, security
- Events, activities, promotions
- feedback, reviews, ratings
- analytics, insights, trends
- IoT devices, smart systems
- energy management, sustainability
- security, access control
- communication, notifications
- integration with other systems

5 Star Hotel

Floor -> Room Type -> Rooms -> Amanitas
Facility ->

User (Manager/Front-desk/Staff)

\*\*\* User (Guest) -> Room/Facility -> Reserve -> Payment -> Card/Cash/Mobile -> Payment Status

User (Manager) -> Admin
User (Owner) -> Super Admin

User (Staff) -> IDLE/OCCUPIED

                OCCUPIED - > In progress

ROOM (Checked Out) -> System will notify a staff (IDLE) OR Trigger a Queue -> Notify the next IDLE Staff

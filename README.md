# Hotel Management System Frontend

The frontend of a comprehensive hotel management system built with Next.js 14 and a variety of other technologies to provide an efficient and scalable user interface for managing hotel operations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Technology Stack](#technology-stack)
- [License](#license)
- [Contact](#contact)

## Installation

To set up the frontend of the hotel management system, follow these steps:

0. **Install the backend from [here](https://github.com/sabbir2609/zenith-be)**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sabbir2609/zenith-fe
   cd zenith-fe
   ```

2. **Install dependencies**:
   This project uses Yarn for package management. Ensure Yarn is installed on your machine, then install project dependencies.

   ```bash
   yarn install
   ```

3. **Environment variables**:
   Create a `.env.local` file in the project root and set the required environment variables. Example:

   ```bash
   NEXT_PUBLIC_API_URL=<backend-api-url>
   NEXT_PUBLIC_SOCKET_URL=<websocket-url>
   ```

4. **Start the development server**:

   ```bash
   yarn dev
   ```

5. **Build the project for production**:
   ```bash
   yarn build
   ```

## Usage

After installation, you can start the development server using `yarn dev` to see your changes live. Access the project through your browser at `http://localhost:3000`.

- **Logging in**: Use the user authentication system to log in as a guest, staff, or admin. Each role has different access levels.
- **Navigation**: The dashboard provides quick access to key functionalities such as property management, reservation management, and billing.
- **Features**: You can use the UI to perform tasks like adding new properties, managing reservations, checking guests in/out, etc.

## Features

This frontend section of the hotel management system includes the following key features:

- **User Authentication and Authorization**: Support for role-based access control and single sign-on.
- **Dashboard**: An overview of important metrics and quick access to functionalities.
- **Property Management**: Add, edit, and remove hotel properties.
- **Reservation Management**: Search, create, modify, and cancel reservations.
- **Billing and Invoicing**: Generate invoices and support multiple payment methods.
- **Online Booking Engine**: Allow guests to make online reservations with real-time updates.
- **Channel Management**: Integration with third-party booking platforms.
- **Housekeeping Management**: Track room cleaning status and assign tasks.
- **Inventory and Supplies Management**: Manage hotel supplies and set alerts for low inventory.
- **Reporting and Analytics**: Generate and visualize various reports.
- **Multi-language and Multi-currency Support**: Support for multiple languages and currencies.
- **Real-time communication**: Integration with WebSockets for real-time updates.
- **IoT Integration**: Support for MQTT and other IoT protocols for smart device integration.
- **Keyless Entry**: Integrate with smart door lock systems.

## Contributing

We welcome contributions! If you'd like to contribute to this project, please follow these guidelines:

1. **Fork the repository** and create your branch.
2. **Commit your changes** and create a pull request describing your changes.
3. **Follow the code of conduct** and respect the contribution guidelines.

For bug reports and feature requests, please create an issue with a clear description.

## Technology Stack

The frontend of the hotel management system uses the following technology stack to deliver a responsive, scalable, and efficient user interface:

- **Framework**: [Next.js 14](https://nextjs.org/), offering server-side rendering, static site generation, and advanced routing capabilities.
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/), providing a modern and efficient approach to managing application state.
- **Icons**: [Lucide React](https://lucide.dev/docs/usage/react), a customizable icon library for React applications.
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/), for displaying user-friendly notifications.
- **Data Visualization**: [Recharts](http://recharts.org/), a simple and flexible charting library for React.
- **Real-time Communication**: [Socket.io](https://socket.io/), enabling WebSockets for real-time communication between client and server.
- **Theme Management**: [Theme Change](https://www.npmjs.com/package/theme-change), allowing dynamic theme changes in the user interface.
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/), a utility-first CSS framework for building modern user interfaces.
- **Package Manager**: [Yarn](https://yarnpkg.com/), a fast and reliable package manager for managing project dependencies.

These technologies work together to create a robust frontend capable of handling the complex requirements of a hotel management system.

## License

This project is distributed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code with proper attribution.

## Contact

If you have questions or feedback, feel free to reach out:

- **Email**: sabbirhasan2999@gmail.com
- **GitHub**: [Sabbir Hasan Munna](https://github.com/sabbir2609)

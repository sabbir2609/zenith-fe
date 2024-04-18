import Link from "next/link";

export default function Page() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="bg-fixed bg-center bg-cover bg-no-repeat h-screen flex items-center justify-center text-white" style={{ backgroundImage: "url('/static/image/homepage/bg-1.jpg')" }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hotel Management System</h1>
          <p className="text-lg md:text-xl mb-8">Efficiency and precision for your hospitality business</p>
          <a href="#features"
            className="btn btn-primary btn-lg md:text-xl hover:scale-105 transition duration-300 ease-in-out">Explore
            Features</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 p-2">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Key Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-100 rounded-lg p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Reservation Management</h3>
            <p>Effortlessly manage room reservations, check-ins, check-outs, and guest information.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-100 rounded-lg p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Inventory Control</h3>
            <p>Track and manage inventory such as food, beverages, and other hotel supplies.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-100 rounded-lg p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Reporting and Analytics</h3>
            <p>Generate insightful reports and analytics to optimize operations and decision-making.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
          <p className="mb-8">Ready to streamline your hotel management? Reach out to us for more information.</p>
          <Link href="contact"
            className="btn btn-primary btn-lg md:text-xl hover:scale-105 transition duration-300 ease-in-out">
            Contact Now
          </Link>
        </div>
      </section>
    </main>
  );
}
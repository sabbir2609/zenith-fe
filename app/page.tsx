import Link from "next/link";

export default function Page() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="bg-fixed bg-center bg-cover bg-no-repeat min-h-screen flex flex-col lg:justify-between lg:items-start justify-center items-center text-white"
        style={{ backgroundImage: "url('/image/homepage/bg-1.jpg')" }}
      >
        <Link href="/homepage" className="font-semibold hover:underline hover:text-blue-600 p-5 self-end">
          Visit Homepage
        </Link>

        <div className="flex justify-center items-center flex-grow">
          <div className="text-white text-center lg:text-left lg:ms-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Zenith Hotel Management System</h1>
            <p className="text-lg md:text-xl mb-8">Efficiency and precision for your hospitality business</p>
            <Link href="#features"
              className=" p-4 bg-gradient-to-r from-rose-100 to-teal-100 md:text-xl hover:scale-105 transition duration-300 ease-in-out text-gray-900">Explore Features</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 p-2 h-screen justify-center items-center flex flex-col text-white"
        style={{ backgroundImage: "url('/image/homepage/bg-2.jpg')" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">Key Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
          {/* Feature 1 */}
          <div className="rounded-sm p-6 md:p-8 bg-gradient-to-r from-red-500 to-orange-500">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Reservation Management</h3>
            <p>Effortlessly manage room reservations, check-ins, check-outs, and guest information.</p>
          </div>
          {/* Feature 2 */}
          <div className="rounded-sm p-6 md:p-8 bg-gradient-to-r from-red-500 to-orange-500">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Inventory Control</h3>
            <p>Track and manage inventory such as food, beverages, and other hotel supplies.</p>
          </div>
          {/* Feature 3 */}
          <div className="rounded-sm p-6 md:p-8 bg-gradient-to-r from-red-500 to-orange-500">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Reporting and Analytics</h3>
            <p>Generate insightful reports and analytics to optimize operations and decision-making.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-rose-500 text-white py-16 md:py-20 bg-gradient-to-r from-slate-500 to-slate-800">
        <div className="text-center lg:text-start lg:ms-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
          <p className="mb-8">Ready to streamline your hotel management? Reach out to us for more information.</p>
          <Link href="contact"
            className=" -primary -lg rounded-sm md:text-xl hover:scale-105 transition duration-300 ease-in-out">
            Contact Now
          </Link>
        </div>
      </section>
    </main>
  );
}
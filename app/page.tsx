import { Footer, Navbar } from "@/components/homepage/common"


export default function Page() {
  return (
    <div>

      <Navbar />

      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Zenith System</h1>
            <p className="mb-5">Welcome to Zenith System: Your Gateway to Seamless Solutions and Technological Excellence.</p>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}

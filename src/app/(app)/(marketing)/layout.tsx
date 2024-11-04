// import DashBoardNavbar from '@/components/dashboard/DashBoardNavbar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto grid min-h-screen w-full  grid-rows-[1fr_auto] overflow-hidden text-base-content'>
      <Navbar />
      <div className='pb-8 pt-24'>{children}</div>
      <Footer />
    </div>
  )
}

export default DashboardLayout

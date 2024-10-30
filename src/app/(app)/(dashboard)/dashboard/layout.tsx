// import DashBoardNavbar from '@/components/dashboard/DashBoardNavbar'
import Navbar from '@/components/Navbar'
import { BackgroundBeamsWithCollision } from '@/components/common/Background'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <BackgroundBeamsWithCollision>
      <div className='mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[1fr_auto] text-base-content'>
        <Navbar />
        <div className='pb-8 pt-24'>{children}</div>
      </div>
    </BackgroundBeamsWithCollision>
  )
}

export default DashboardLayout

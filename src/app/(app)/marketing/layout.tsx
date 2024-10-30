import { headers } from 'next/headers'

import Branding from '@/components/Branding'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { serverClient } from '@/trpc/serverClient'
import { getCurrentUser } from '@/utils/getCurrentUser'
import { MetadataProvider } from '@/utils/metadataContext'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  const headersList = await headers()
  const user = await getCurrentUser(headersList)

  return (
    <MetadataProvider metadata={metadata}>
      <div className='flex min-h-screen flex-col'>
        <Navbar metadata={metadata} />
        <main className='container mt-16 flex-grow'>{children}</main>
        <Footer metadata={metadata} />
        <Branding />
      </div>
    </MetadataProvider>
  )
}

export default MarketingLayout

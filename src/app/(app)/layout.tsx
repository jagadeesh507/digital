import { env } from '@env'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Toaster } from 'sonner'

import '@/app/(app)/globals.css'
import Provider from '@/trpc/Provider'
import { serverClient } from '@/trpc/serverClient'

const inter = Space_Grotesk({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  try {
    // calling the site-settings to get all the data
    const metadata = await serverClient.siteSettings.getSiteSettings()
    const generalSettings = metadata.general

    const ogImageUrl =
      typeof generalSettings.ogImageUrl === 'string'
        ? generalSettings.ogImageUrl
        : generalSettings.ogImageUrl.sizes?.blogImageSize3?.url!

    const title = {
      default: generalSettings.title,
      template: `%s | ${generalSettings.title}`,
    }
    const description = generalSettings.description
    const ogImage = [
      {
        url: ogImageUrl,
        height: 630,
        width: 1200,
        alt: `og image`,
      },
    ]

    return {
      title,
      description,
      // we're appending the http|https int the env variable
      metadataBase: env.NEXT_PUBLIC_PUBLIC_URL as unknown as URL,
      openGraph: {
        title,
        description,
        images: ogImage,
      },
      twitter: {
        title,
        description,
        images: ogImage,
      },
      keywords: generalSettings.keywords,
    }
  } catch (error) {
    // in error case returning a base metadata object
    return {
      title: 'Create CQL App',
      description: 'Generated by create cql app',
    }
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const metadata = await serverClient.siteSettings.getSiteSettings()
  const generalSettings = metadata.general
  const faviconUrl =
    typeof generalSettings?.faviconUrl === 'string'
      ? generalSettings?.faviconUrl
      : generalSettings?.faviconUrl?.url!

  return (
    <html lang='en' className='dark'>
      <head>
        {/* added a explicit link tag because favicon is coming from site-settings */}
        <link rel='icon' type='image/x-icon' href={faviconUrl} />
      </head>
      <body className={`${inter.className}`}>
        <Provider>{children}</Provider>

        {/* Sonnar toast library */}
        <Toaster richColors />
      </body>
    </html>
  )
}

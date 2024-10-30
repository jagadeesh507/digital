import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { TRPCError } from '@trpc/server'
import ora from 'ora'

import { seedAuthorDetailsPage } from '@/seed/author-details-page'
import { seedAuthors } from '@/seed/authors'
import { seedAuthorsPage } from '@/seed/authors-page'
import { seedBlogDetailsPage } from '@/seed/blog-details-page'
import { seedBlogs } from '@/seed/blogs'
import { seedBlogsPage } from '@/seed/blogs-page'
import { seedContactPage } from '@/seed/contact-page'
import { seedForm } from '@/seed/forms'
import { seedHomePage } from '@/seed/home-page'
import { seedSiteSettings } from '@/seed/site-settings/seed'
import { seedTagDetailsPage } from '@/seed/tag-details-page'
import { seedTags } from '@/seed/tags'
import { seedTagsPage } from '@/seed/tags-page'
import { publicProcedure, router } from '@/trpc'

const payload = await getPayloadHMR({ config: configPromise })

export const seedRouter = router({
  runSeed: publicProcedure.mutation(async () => {
    const spinner = ora({
      text: 'Starting the seeding process...',
      color: 'cyan',
      spinner: 'dots',
    }).start()

    try {
      const pages = await payload.count({
        collection: 'pages',
      })

      // checking if pages are created skipping the seeding process
      if (pages.totalDocs >= 1) {
        return
      }

      await seedHomePage(spinner)
      const tagsPage = await seedTagsPage(spinner)
      const tagsDetailsPage = await seedTagDetailsPage({
        spinner,
        id: tagsPage.id,
      })

      const blogsPage = await seedBlogsPage(spinner)
      const blogsDetailsPage = await seedBlogDetailsPage({
        spinner,
        id: blogsPage.id,
      })

      const authorsPage = await seedAuthorsPage(spinner)
      const authorsDetailsPage = await seedAuthorDetailsPage({
        spinner,
        id: authorsPage.id,
      })
      const forms = await seedForm(spinner)
      const authors = await seedAuthors(spinner)
      const tags = await seedTags(spinner)

      await seedBlogs({ tags, authors, spinner })
      const contactPage = await seedContactPage({ spinner, forms })
      await seedSiteSettings({
        authorDetailsLink: authorsDetailsPage,
        blogDetailsLink: blogsDetailsPage,
        tagDetailsLink: tagsDetailsPage,
        spinner,
        tagsPages: tagsPage,
        blogsPage: blogsPage,
        authorPages: authorsPage,
        contactPage: contactPage,
      })

      return { success: true }
    } catch (error: any) {
      console.error('Error seeding:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }
  }),
})

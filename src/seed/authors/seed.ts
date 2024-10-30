import configPromise from '@payload-config'
import { User } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { authorsData, authorsImageList } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora) => {
  try {
    spinner.start(`Started uploading author images...`)

    const authorsImages: { id: string; name: string }[] = []
    const usersList: User[] = []

    // looping through images list uploading to media collection & pushing the result to authorsImages array
    for await (const details of authorsImageList) {
      const { alt, imageURL, name } = details

      try {
        const authorImage = await payload.create({
          collection: 'media',
          data: {
            alt,
          },
          filePath: imageURL,
        })

        authorsImages.push({ id: authorImage.id, name })
      } catch (error) {
        spinner.fail(`Failed tp upload author images...`)
        throw error
      }
    }
    spinner.succeed(`Completed uploading author images...`)

    spinner.start(`Started creating author accounts...`)
    // lopping through authors creating authors with images and pushing the author details to usersList
    for await (const details of authorsData) {
      const imageId = authorsImages.find(image => {
        return image.name === details.username
      })

      try {
        const user = await payload.create({
          collection: 'users',
          data: {
            ...details,
            imageUrl: imageId?.id ?? '',
          },
          locale: undefined,
          fallbackLocale: undefined,
          overrideAccess: true,
          disableVerificationEmail: true,
          context: {
            preventRoleOverride: true,
          },
        })

        usersList.push(user)
      } catch (error) {
        spinner.fail(`Failed creating author accounts...`)
        throw error
      }
    }

    spinner.succeed(`Successfully created author accounts...`)
    return usersList
  } catch (error) {
    spinner.fail(`Failed creating author accounts...`)
    throw error
  }
}

export default seed

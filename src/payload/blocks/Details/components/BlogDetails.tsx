'use client'

import { Blog } from '@payload-types'
import Link from 'next/link'
import { LiaBlogSolid } from 'react-icons/lia'

import TabComponent, { TabContent } from '@/payload/blocks/common/Tabs'

interface BlogDetailsProps {
  blog: Blog
  blogsData: Blog[]
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog, blogsData }) => {
  const tabs = [
    {
      title: 'Blog Data',
      id: 'BlogData',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: blog,
    },
    {
      title: 'Blogs Data',
      id: 'BlogsData',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: blogsData,
    },
  ]

  return (
    <div className='mx-auto max-h-screen min-h-screen max-w-7xl gap-6 overflow-hidden px-2'>
      <div className='mt-4 flex items-center justify-between'>
        <p className='rounded-rounded-box border-2 border-base-content/10 bg-base-content/20 px-4 py-2'>
          Get Started with src/app/(app)/(marketing)/blog/[blogSlug]
        </p>
        <Link
          href='/blogs'
          className='rounded-rounded-box border-2 border-base-content/10 bg-base-content/20 px-4 py-2'>
          back
        </Link>
      </div>
      <TabComponent tabs={tabs} />
    </div>
  )
}

export default BlogDetails

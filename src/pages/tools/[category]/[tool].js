// src/pages/tools/[category]/[tool].js
import { useRouter } from 'next/router'
import ToolLayout from '@/components/tools/ToolLayout'
import TimerComponent from '@/components/tools/TimerComponent'
import MetaTags from '@/components/seo/MetaTags'
import { getToolData, getAllToolPaths } from '@/data/toolsData'

const ToolPage = ({ toolData }) => {
  const router = useRouter()
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <MetaTags 
        title={toolData.metaTitle} 
        description={toolData.metaDescription}
        keywords={toolData.keywords}
        url={`/tools/${toolData.category}/${toolData.slug}`}
      />
      <ToolLayout tool={toolData}>
        {toolData.component === 'TimerComponent' && <TimerComponent />}
        {/* Add other tool components as needed */}
      </ToolLayout>
    </>
  )
}

export async function getStaticProps({ params }) {
  const toolData = getToolData(params.category, params.tool)
  return {
    props: {
      toolData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllToolPaths()
  return {
    paths,
    fallback: false
  }
}

export default ToolPage

import Link from 'next/link'

export type ResourceTagsProps = {
  nodes: [
    {
      name: string
      link: string
    },
  ]
}

export const ResourceTags = (props: ResourceTagsProps) => {
  const tags = props.nodes
  return (
    <div className="flex gap-[20px] md:flex-wrap md:gap-[10px]">
      {tags.map(tag => (
        <Link
          key={tag.name}
          href={tag.link}
          className="tag border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white transition-colors"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  )
}

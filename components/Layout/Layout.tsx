import { Header, HeaderVariant } from '../Header'
import { Footer } from '../Footer'
import Head from 'next/head'

export type LayoutProps = {
  menuItems?: any
  headerVariant?: HeaderVariant
  form?: any
  seo?: any
  pageClassName?: string
  children: any
}

export function Layout(props: LayoutProps) {
  const title = props?.seo?.title || 'NextWord'
  const metaDesc = props?.seo?.metaDesc || ''
  const canonical = props?.seo?.canonical || ''
  const schema = props?.seo?.schema || ''
  const className = props?.seo?.className || ''
  const variant = props?.headerVariant || 'default'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <meta name="canonical" content={canonical} />
        <script type="application/ld+json">{schema.raw}</script>
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_WORDPRESS_URL}
        ></link>
        <link
          rel="dns-prefetch"
          href={process.env.NEXT_PUBLIC_WORDPRESS_URL}
        ></link>
      </Head>
      {/* <div className={props?.pageClassName || ""}> */}
      <Header menuItems={props.menuItems} form={props.form} variant={variant} />
      <main
        className={`flex flex-col ${
          variant == 'default' && 'mt-[152px] lg:mt-[130px] md:mt-[115px]'
        }
        `}
      >
        {props.children}
      </main>
      <Footer menuItems={props.menuItems} />
      {/* </div> */}
    </>
  )
}

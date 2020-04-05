import Document, { Html, Head, Main, NextScript } from 'next/document'
import Favicons from '../components/head/Favicons'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <Favicons />
          <link rel="sitemap" href="sitemap.xml" type="application/xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' && (
            <>
              <script
                id="chiffre:analytics-config"
                type="application/json"
                dangerouslySetInnerHTML={{
                  __html: `{
                    "publicKey": "pk.ubpO7BF8AslKx8jrfKUMurP3LbhhSCT_NftD4yNiIVk",
                    "pushURL":   "https://push.chiffre.io/BFBcdrA4g06wlbAH"
                  }`,
                }}
              />
              <script
                src="https://embed.chiffre.io/analytics.js"
                async
              ></script>
            </>
          )}
        </body>
      </Html>
    )
  }
}

export default MyDocument

import { ColorModeScript } from '@chakra-ui/react'
import NextDocument ,{ Html, Head, Main, NextScript } from 'next/document'
import { extendTheme } from '@chakra-ui/react'
const config = {
    initialColorMode: 'light',
    useSystemColorMode: false, 
}
import { resetServerContext } from 'react-beautiful-dnd';
const theme = extendTheme({ config })

class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel="shortcut icon" href="/4373151_gitlab_logo_logos_icon.ico" />
        </Head>
        <body>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <Main />
            <NextScript />
          </body>
      </Html>
    )
  }
}

Document.getInitialProps = async (ctx) => {
  resetServerContext()
  return NextDocument.getInitialProps(ctx);
}

export default Document;
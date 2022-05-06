import { ColorModeScript } from '@chakra-ui/react'
import NextDocument ,{ Html, Head, Main, NextScript } from 'next/document'
import { extendTheme } from '@chakra-ui/react'
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false, 
}

const theme = extendTheme({ config })

export default class Document extends NextDocument {
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
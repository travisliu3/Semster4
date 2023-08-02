import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
      <div class="container">
        <div class="row">
          <div class="col"> 
            <Main />
            <NextScript />
          </div>
        </div>
      </div>
      </body>
    </Html>
  )
}

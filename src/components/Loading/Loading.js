import Head from "next/head";
import { Circle } from 'better-react-spinkit'

function Loading() {
         return (
                  <>
                           <Head>
                                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"></link>
                           </Head>
                           <div className='loading-contaianer'>
                                    <Circle></Circle>
                           </div>
                           <style jsx>{`
                                    div {
                                             height: 100vh;
                                             display: flex;
                                             justify-content: center;
                                             align-items: center;
                                    }
                           `}</style>
                  </>
         )
}

export default Loading;

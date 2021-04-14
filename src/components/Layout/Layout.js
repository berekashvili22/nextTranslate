import Head from "next/head";
import { auth } from "../../../firebase";
import styles from "./Layout.module.css";
import Navbar from '../Navbar/Navbar';

export default function Layout({ children, ...rest }) {

         const user = rest.user

         return (
                  <>
                           <Head>
                                    <title>NextTranslate</title>
                                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"></link>
                                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"></link>
                                    <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet"></link>
                                    

                           </Head>
                           <main>
                                    <Navbar user={user} />
                                    {children}

                           </main>
                  </>
         );
};



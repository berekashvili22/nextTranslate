import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { auth, db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { Link } from '@material-ui/core';


export default function Dictionary({ id }) {

         // const [user] = useAuthState(auth);

         const wordListRef = db.collection('word').where('dictionary', '==', id);
         const [wordListSnapshot] = useCollection(wordListRef);



         return (
                  <div className="container w-75">

                           <table class="table mt-5">
                                    <thead>
                                             <tr>
                                                      <th scope="col">From</th>
                                                      <th scope="col">To</th>
                                             </tr>
                                    </thead>
                                    <tbody>
                                             {wordListSnapshot?.docs.map(word => (
                                                      <tr>
                                                               <td>{word.data().orig}</td>
                                                               <td>{word.data().tred}</td>
                                                      </tr>
                                             ))
                                             }

                                    </tbody>
                           </table>

                  </div >

         )
}


export const getServerSideProps = async ({ params }) => {
         const id = params.id

         return {
                  props: {
                           id,
                  },
         }
}
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from '@material-ui/core';

export default function Dictionaries() {
    const [user] = useAuthState(auth);

    const dictListRef = db.collection('dictionary').where('user', '==', user.email);
    const [dictListSnapshot] = useCollection(dictListRef);

    return (
        <div className="container pt-5">
            <div className="row">
                {dictListSnapshot?.docs.map((dict) => (
                    <div className="col-sm">
                        <Link href={`/dictionary/${dict.data().id}`} className="card">
                            <div className="card-body d-flex justify-content-center align-items-center dict-container">
                                <p>{dict.data().to}</p>
                                <p>-</p>
                                <p>{dict.data().from}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

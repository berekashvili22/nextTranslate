import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { auth, db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function Dictionary({ id }) {
    const wordListRef = db.collection('word').where('dictionary', '==', id);
    const [wordListSnapshot] = useCollection(wordListRef);

    const langCode = {
        en: 'English',
        ar: 'Arabic',
        zh: 'Chinese',
        fr: 'French',
        de: 'German',
        hi: 'Hindi',
        ga: 'Irish',
        it: 'Italian',
        ja: 'Japanese',
        ko: 'Korean',
        pt: 'Portuguese',
        ru: 'Russian',
        es: 'Spanish'
    };

    const from = langCode[id.slice(0, 2)];
    const to = langCode[id.slice(2, 4)];

    console.log(from, to);

    return (
        <div className="container w-75">
            <table className="table mt-5  table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">{from}</th>
                        <th scope="col">{to}</th>
                    </tr>
                </thead>
                <tbody>
                    {wordListSnapshot?.docs.map((word, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{word.data().orig}</td>
                            <td>{word.data().tred}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export const getServerSideProps = async ({ params }) => {
    const id = params.id;
    console.log(params);
    return {
        props: {
            id
        }
    };
};

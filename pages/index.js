import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function Home() {
    const [user] = useAuthState(auth);

    // console.log(user)

    const [originalTxt, setOriginalTxt] = useState('');
    const [translatedTxt, setTranslatedTxt] = useState('');
    const [from, setFrom] = useState('en');
    const [to, setTo] = useState('es');

    const dictRef = db.collection('dictionary').where('user', '==', user.email).where('id', '==', `${from}${to}${user.uid}`);
    const [dictSnapshot] = useCollection(dictRef);
    const dicIsEmpty = dictSnapshot ? dictSnapshot.empty : null;

    const addWord = () => {
        if (dicIsEmpty == true) createNewDict();
        if (dicIsEmpty == false) addWordToDict();
        cleanFields();
    };

    // creates new dictionary record in db
    const createNewDict = () => {
        db.collection('dictionary').add({
            id: `${from}${to}${user.uid}`,
            user: user.email,
            from: from,
            to: to
        }),
            setTimeout(() => {
                addWordToDict();
            }, 3000);
    };

    // adds the word to dict
    const addWordToDict = () => {
        db.collection('word').add({
            dictionary: `${from}${to}${user.uid}`,
            orig: originalTxt,
            tred: translatedTxt
        });
    };

    // cleans input and output fields
    const cleanFields = () => {
        setTranslatedTxt('');
        setOriginalTxt('');
        document.getElementById('translateInput').value = '';
    };

    // https://youtu.be/svlEVg0To_c?t=5886
    const translate = async (text, from = 'en', to = 'es') => {
        console.log(text);
        console.log(from);
        console.log(to);
        if (text !== '') {
            try {
                const url = 'https://libretranslate.com/translate';
                const res = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        q: text,
                        source: from,
                        target: to
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });
                var data = await res.json();
                setTranslatedTxt(data['translatedText']);
            } catch (error) {
                setTranslatedTxt('not found');
            }
        } else {
            setTranslatedTxt(null);
        }
    };

    const onInputChange = (e) => {
        setTimeout(() => {
            var input = e.target.value.toLowerCase();
            translate(input, from, to);
            setOriginalTxt(input);
        }, 1000);
    };

    const onFromChange = (e) => {
        e.preventDefault();
        var input = e.target.value;
        if (input != from) {
            setFrom(input);
        }
    };

    const onToChange = (e) => {
        e.preventDefault();
        var input = e.target.value;
        if (input != to) {
            setTo(input);
            setTimeout(() => {
                translate(originalTxt, from, input);
            }, 1000);
        }
    };

    return (
        <div className="home-main-wrap">
            <div className="container w-50 mt-5 pb-5 shadow p-3 mb-5 bg-white rounded translate-wrap">
                <div className="row d-flex justify-content-between mb-3">
                    <div className="col-5">
                        <select className="form-select w-100 no-border" aria-label="Default select example" onChange={onFromChange} defaultValue="en">
                            <option value="en">English</option>
                            <option value="ar">Arabic</option>
                            <option value="zh">Chinese</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="hi">Hindi</option>
                            <option value="ga">Irish</option>
                            <option value="it">Italian</option>
                            <option value="ja">Japanese</option>
                            <option value="ko">Korean</option>
                            <option value="pt">Portuguese</option>
                            <option value="ru">Russian</option>
                            <option value="es">Spanish</option>
                            <option value="auto">Auto Detect (Experimental)</option>
                        </select>
                    </div>
                    <div className="col-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            className="bi bi-arrow-left-right"
                            viewBox="0 0 16 16">
                            <path
                                fill-rule="evenodd"
                                d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
                            />
                        </svg>
                    </div>
                    <div className="col-5">
                        <select className="form-select w-100 no-border" aria-label="Default select example" onChange={onToChange} defaultValue="es">
                            <option value="en">English</option>
                            <option value="ar">Arabic</option>
                            <option value="zh">Chinese</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="hi">Hindi</option>
                            <option value="ga">Irish</option>
                            <option value="it">Italian</option>
                            <option value="ja">Japanese</option>
                            <option value="ko">Korean</option>
                            <option value="pt">Portuguese</option>
                            <option value="ru">Russian</option>
                            <option value="es">Spanish</option>
                            <option value="auto">Auto Detect (Experimental)</option>
                        </select>
                    </div>
                </div>

                <div className="row d-flex justify-content-between">
                    <div className="col-5">
                        <label htmlFor="translateInput" className="form-label text-muted">
                            Input Text
                        </label>
                        <input type="text" className="form-control" id="translateInput" onChange={onInputChange}></input>
                    </div>

                    <div className="col-5">
                        <label htmlFor="targetInput" className="form-label text-muted">
                            Translated
                        </label>
                        <textarea className="form-control" id="targetInput" rows="1" defaultValue={translatedTxt ? translatedTxt : ''}></textarea>
                    </div>
                </div>
                {translatedTxt ? (
                    <div className="saveBtn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="lightgreen"
                            class="bi bi-check-circle-fill"
                            viewBox="0 0 16 16"
                            onClick={addWord}>
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        <p className="text-muted">Save</p>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

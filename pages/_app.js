import '../styles/globals.css'
import Layout from '../src/components/Layout/Layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Login from './login';
import Loading from '../src/components/Loading/Loading';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set({
        email: user.email,
        photoUrl: user.photoURL
      }, { merge: true })
    }
  }, [user])

  if (loading) return <Loading />

  if (!user) return (
    <Layout user={null}>
      <Login />
    </Layout>
  )

  return (
    <Layout user={user}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

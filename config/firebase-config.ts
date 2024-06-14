import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJcc4kLNEw99NGoG2VYT64YBNgJDXfMvY",
  authDomain: "desafio-da-pagina-de-projeto.firebaseapp.com",
  projectId: "desafio-da-pagina-de-projeto",
  storageBucket: "desafio-da-pagina-de-projeto.appspot.com",
  messagingSenderId: "1024725312813",
  appId: "1:1024725312813:web:2ed7b8873bac3bbf4b5fa4"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


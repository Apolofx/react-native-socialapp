import * as FirebaseKeys from './keys';
import firebase from 'firebase';

class Fire {
  constructor() {
    !firebase.app.length ? firebase.initializeApp(FirebaseKeys) : {};
  }

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();

export default Fire;

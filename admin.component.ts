import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
//import { auth } from 'firebase';
//import * as auth from 'firebase/auth';

export interface Item {
  id?:string;
  firstname?:string;
  lastname?:string;
  birthday?: string;
  address?: string;
  zip?: BigInteger;
  city?: string;
  state?:string;
  guardian1cellphone?: BigInteger;
  guardian1workphone?: BigInteger;
  guardian1firstname?: string;
  guardian1lastname?: string;
  guardian2cellphone?: BigInteger;
  guardian2workphone?: BigInteger;
  guardian2firstname?: string;
  guardian2lastname?: string;
  siblingname?: string;
  siblingage?: BigInteger;
  physicianfirstname?: string;
  physicianlastname?: string;
  illness?: string;
  hospital?: string;
  referrerfirstname?: string;
  referrerlastname?: string;
  referrerrelation?: string;
}

export interface Roles { 
    admin?: boolean;
 }
  
export interface User {
    uid: string;
    email: string;
    roles: Roles;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  user$: Observable<User>;
  _db:AngularFirestore;
  authorization: Observable<any[]>;
  items: Observable<any[]>;
  realuser: User;
  admin: true;
  constructor(public auth: AngularFireAuth, firestore: AngularFirestore) {
      this.authorization = firestore.collection('custom-claims').valueChanges();
      this._db = firestore;
      this.user$ = this._db.doc<User>('users/${user.uid}').valueChanges();
      this.user$.subscribe(user => this.realuser = user)
      const userRef: AngularFirestoreDocument<any> = this._db.doc('users/${user.uid}');
      this.items = firestore.collection('referral').valueChanges();
      //this.admin = userRef.get(User);
    }
    login() {
      this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((credential) => {
        this.updateUserData(credential.user)
      });
      
    }
    logout() {
      this.auth.auth.signOut();
    }
    updateUserData(user){
      const userRef: AngularFirestoreDocument<any> = this._db.doc(('users/'+ user.uid));
      const data: User = {
        uid: user.uid,
        email: user.email,
        roles: {
          admin: true
        }
      }
      return userRef.set(data, { merge: true })
    }

    checkAuthorization(user: User):boolean{
      // if (!user) return false
      // const userObs: Observable<User> = this._db.doc<User>('users/${user.uid}').valueChanges();
      // userObs.subscribe(user => this.realuser = user);
      // console.log(userObs);
      return true;
      //return this.realuser.roles.admin
    }

    addItem(firstname: string, lastname: string, birthday: string, address: string, zip: BigInteger, city: string, state:string, phone: BigInteger){
      let itemCollection = this._db.collection<Item>('referral');
      itemCollection.add({ firstname: firstname, lastname: lastname, birthday: birthday, address: address, zip: zip, city: city, state: state, phone:phone});
    }

  ngOnInit(): void {
  }
}

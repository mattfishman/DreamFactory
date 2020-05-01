import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import firebase from 'firebase';

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

@Component({
  selector: 'app-referral-gen-info',
  templateUrl: './referral-gen-info.component.html',
  styleUrls: ['./referral-gen-info.component.css']
})
export class ReferralGenInfoComponent implements OnInit {
  _db:AngularFirestore;
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('referral').valueChanges();
    this._db = firestore;
  }
  addItem(firstname: string, lastname: string, birthday: string, address: string, zip: BigInteger, city: string, state:string, guardian1cellphone: BigInteger, guardian1workphone: BigInteger, guardian1firstname: string, guardian1lastname: string, guardian2cellphone:BigInteger, guardian2workphone: BigInteger, guardian2firstname: string, guardian2lastname: string, siblingname: string, siblingage: BigInteger, physicianfirstname: string, physicianlastname: string, illness:string, hospital:string, referrerfirstname:string, referrerlastname: string, referrerrelation: string){
      let itemCollection = this._db.collection<Item>('referral');
      itemCollection.add({ firstname: firstname, lastname: lastname, birthday: birthday, address: address, zip: zip, city: city, state: state, guardian1cellphone:guardian1cellphone, guardian1workphone: guardian1workphone, guardian1firstname: guardian1firstname, guardian1lastname: guardian1lastname, guardian2cellphone: guardian2cellphone, guardian2workphone: guardian2workphone, guardian2firstname: guardian2firstname, guardian2lastname: guardian2lastname, siblingname: siblingname, siblingage: siblingage, physicianfirstname: physicianfirstname, physicianlastname: physicianlastname, illness: illness, hospital: hospital, referrerfirstname: referrerfirstname, referrerlastname: referrerlastname, referrerrelation: referrerrelation});
    }
  ngOnInit() {
  }

}
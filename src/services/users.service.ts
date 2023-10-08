import { AuthenticationService } from 'src/services/authentication.service';
import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getFirestore,
  getDoc,
  setDoc,
  updateDoc,
  collectionData,
  collectionGroup
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user'
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/item-list/item.model';

@Injectable()
class UsefulService {
}

@Injectable()
class NeedsService {
  constructor(public service: UsefulService) {}
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: Firestore, private AuthenticationService: AuthenticationService) {}

  get currentUserProfile$(): Observable<User | null> {
    return this.AuthenticationService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        console.log("hi");
        return docData(ref) as Observable<User>;
      })
    );
  }

  addUser(user: User): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);

    return from(setDoc(ref, user));
  }

  addItem(item: Item|null, user:User|null): Observable<void> {

    const userDoc = doc(this.firestore, 'users', user!.uid);
    console.log('Adding item', user!.uid, item);
    const itemCollection = collection(userDoc, 'items');
    
  
      const itemDoc = doc(itemCollection);
      return from(setDoc(itemDoc, item))
    
    
  }
  updateItem(item:Item,user: User): Observable<void> {
    const ref = doc(this.firestore, 'items', user.uid);
    return from(updateDoc(ref, { ...item }));
  }
  updateUser(user: User): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

 


}
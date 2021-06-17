import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoListItem } from '../models/models';
import { User } from './user-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseContactorService {
  private COLLECTION_PATH = '/todo-list-items';
  private COLLECTION_PATH_USERS = '/todo-list-users';
  todo_list_items$: Observable<TodoListItem[]>;

  constructor(private firestore: AngularFirestore) {
    this.todo_list_items$ = this.readTodoListItems();
  }
  upsertUserdocument(user: User) {
    this.getDocumentId(this.COLLECTION_PATH_USERS, user.uid)
      .then((value) => {
        if (!value) {
          this.firestore
            .collection(this.COLLECTION_PATH_USERS)
            .doc(this.firestore.createId())
            .set({ id: user.uid })
            .then(() => {
              console.log('Document successfully created!');
              return;
            })
            .catch((error) => {
              console.error('CU2: Error creating document: ', error);
              throw error;
            });
        }
      })
      .catch((reason) => {
        console.error('CU1: Error finding Document Id, during createUserdocument(): ', reason);
        return undefined;
      });
  }
  collectionExists(path: string) {
    this.firestore.collection('');
  }
  createTodoListItem(item: TodoListItem, user: User) {
    this.getDocumentId(this.COLLECTION_PATH_USERS, user.uid)
      .then((docId) => {
        if (docId) {
          docId as string;
          this.firestore.collection(this.COLLECTION_PATH_USERS).doc(docId).collection('todo-list-items');
        }
      })
      .catch((reason) => {
        console.error('CUT1: Error finding Document Id, during createTodoListItem(): ', reason);
        return undefined;
      });

    this.firestore
      .collection(this.COLLECTION_PATH)
      .get()
      .subscribe({
        next: (value) => {
          const id_size = value.size;
          item.id = id_size + 1;
          this.firestore
            .collection(this.COLLECTION_PATH)
            .doc(this.firestore.createId())
            .set(item)
            .then(() => {
              console.log('Document successfully created!');
              return;
            })
            .catch((error) => {
              console.error('C2: Error creating document: ', error);
            });
        },
        error: (error) => {
          console.error('C1: Error reading during creationg of document: ', error);
        },
      });
  }
  updateTodoListItem(new_item: TodoListItem) {
    this.getDocumentId(this.COLLECTION_PATH, new_item.id)
      .then((docId) => {
        this.firestore
          .collection(this.COLLECTION_PATH)
          .doc(docId)
          .set(new_item)
          .then((value) => {
            console.log('Document successfully updated!');
          })
          .catch((reason) => {
            console.error('U2: Error updating document: ', reason);
          });
      })
      .catch((reason) => {
        console.error('U1: Error finding Document Id, during update of document: ', reason);
      });
  }
  deleteTodoListItem(item: TodoListItem) {
    this.getDocumentId(this.COLLECTION_PATH, item.id)
      .then((docId) => {
        this.firestore
          .collection(this.COLLECTION_PATH)
          .doc(docId)
          .delete()
          .then((value) => {
            console.log('Document successfully deleted!');
          })
          .catch((reason) => {
            console.error('D2: Error deleting document: ', reason);
          });
        return undefined;
      })
      .catch((reason) => {
        console.error('D1: Error finding Document Id, during delete of document: ', reason);
        return undefined;
      });
  }
  private getDocumentId(collectionPath: string, itemId: number | string): Promise<string | undefined> {
    return this.firestore
      .collection(collectionPath)
      .ref.where('id', '==', itemId)
      .get()
      .then((value) => {
        let documentId: string | undefined = undefined;
        value.forEach((element) => {
          documentId = element.id;
          return;
        });
        return documentId;
      })
      .catch((reason) => {
        console.log('MISC1 Error Occured while fetching doucment Id', reason);
        throw reason;
      });
  }
  private readTodoListItems(): Observable<TodoListItem[]> {
    return this.firestore
      .collection(this.COLLECTION_PATH)
      .valueChanges()
      .pipe(
        map((value) => {
          (<TodoListItem[]>value).sort((a, b) => {
            if (a.id < b.id) return -1;
            else return 1;
          });
          console.log('Items succefully Read');

          return <TodoListItem[]>value;
        })
      );
  }
}

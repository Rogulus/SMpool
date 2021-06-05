import {Injectable} from "@angular/core";
import {TodoBackendService} from "../TodoBackendService";
import {Observable, Subject} from "rxjs";
import {asObservable} from "./asObservable";
import {BehaviorSubject} from "rxjs";


import {List,Record} from 'immutable';
import {HttpService} from "../http.service";


const UserRecord = Record({
  username: "todo username",
  name: "todo name",
  surname: "todo surname",
  email: "todo email",
  isAdmin: "todo is admin",
});


export class UserRec extends UserRecord {
  constructor(a: Iterable<[string, any]> | Partial<{ username: string; name: string; surname: string; email: string; isAdmin: string; }> | undefined) {
    super(a);
  }
}




@Injectable()
export class UsersStore {

  private _users: BehaviorSubject<List<UserRec>> = new BehaviorSubject<List<UserRec>>(List([]));

  constructor(private http: HttpService) {
    this.loadInitialData();
  }

  get users() {
    return asObservable(this._users);
  }

  loadInitialData() {
    this.todoBackendService.getAllUsers()
      .subscribe(
        res => {
          let todos = (<Object[]>res.json()).map((todo: any) =>
            new UserRec({id:todo.id, description:todo.description,completed: todo.completed}));

          this._users.next(List(todos));
        },
        err => console.log("Error retrieving Todos")
      );

  }

  addTodo(newUser:UserRec):Observable<UserRec> {

    let obs = this.todoBackendService.saveTodo(newTodo);

    obs.subscribe(
      res => {
        this._users.next(this._users.getValue().push(newTodo));
      });

    return obs;
  }

  toggleTodo(toggled:UserRec): Observable<UserRec> {
    let obs: Observable = this.todoBackendService.toggleTodo(toggled);

    obs.subscribe(
      res => {
        let todos = this._users.getValue();
        let index = todos.findIndex((todo: Todo) => todo.id === toggled.id);
        let todo:Todo = todos.get(index);
        this._users.next(todos.set(index, new Todo({id:toggled.id, description:toggled.description, completed:!toggled.completed}) ));
      }
    );

    return obs;
  }


  deleteTodo(deleted:UserRec): Observable<UserRec> {
    let obs: Observable<UserRec> = this.todoBackendService.deleteTodo(deleted);

    obs.subscribe(
      res => {
        let todos: List<UserRec> = this._users.getValue();
        let index = todos.findIndex((todo) => todo.id === deleted.id);
        this._users.next(todos.delete(index));

      }
    );

    return obs;
  }


}

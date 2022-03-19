import User from './user';

export default class UserList {
  private list: User[] = [];

  constructor() {}

  public add(user: User): User {
    this.list.push(user);
    console.log(this.list);
    return user;
  }

  public updateName(id: string, name: string): void {
    const foundIndex = this.list.findIndex((user) => user.id === id);
    if (foundIndex !== -1) {
      this.list[foundIndex].name = name;
    }
    console.log(this.list);
  }

  public getList(): User[] {
    return this.list;
  }

  public getUser(id: string): User | undefined {
    return this.list.find((user) => user.id === id);
  }

  public getUsersInRoom(room: string): User[] {
    return this.list.filter((user) => user.room === room);
  }

	public removeUser(id: string): User | undefined {
		const tempUser = this.getUser(id);
    if (tempUser) {
		  this.list = this.list.filter(user => user.id !== id);
    }
		return tempUser;
	}
}

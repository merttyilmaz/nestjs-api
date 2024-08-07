import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john@gmail.com', role: 'INTERN' },
    { id: 2, name: 'Jane Doe', email: 'jane@gmail.com', role: 'ENGINEER' },
    { id: 3, name: 'Alice Hestia', email: 'alice@gmail.com', role: 'ADMIN' },
    {
      id: 4,
      name: 'Bob Dylan',
      email: 'bob@gmail.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Charlie Puth',
      email: 'charlie@gmail.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: CreateUserDto) {
    const findUserByHighestId = [...this.users].sort((a, b) => b.id - a.id)[0];
    console.log(findUserByHighestId);
    this.users.push({
      id: findUserByHighestId.id + 1,
      ...user,
    });
    return user;
  }

  update(id: number, userUpdate: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== removedUser.id);

    return removedUser;
  }
}

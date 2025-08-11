import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Brian Lee",
            "email": "brian.lee@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "Cynthia Smith",
            "email": "cynthia.smith@example.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "David Kim",
            "email": "david.kim@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "Eva Martinez",
            "email": "eva.martinez@example.com",
            "role": "ADMIN"
        }
    ]

    findAll(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
        if (role) {
            const rolesArr = this.users.filter(user => user.role === role);

            if (rolesArr.length === 0) throw new NotFoundException('User role not found');

            return rolesArr; 
        }

        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    create(createUserDTO: CreateUserDTO) {
        const userById = this.users.sort((a, b) => b.id - a.id);

        const newUser = {
            id: userById[0].id + 1,
            ...createUserDTO
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDTO: UpdateUserDTO) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDTO };
            }

            return user;
        });

        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }
}

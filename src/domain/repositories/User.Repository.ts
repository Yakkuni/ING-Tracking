import { User }  from '../entities/User';

export interface UserRepository {
    
    //CREATE
    create(user: User): Promise<void>;

    //READ
    findAll(): Promise<User[]>
    //UPDATE

    //DELETE

}
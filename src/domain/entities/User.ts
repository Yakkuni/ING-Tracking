import  validator from "validator";
import bcrypt from "bcrypt";

export type UserProps = {
    userName: string,
    email: string,
    password: string,
    id: string,
}

export class User{

    private constructor( private readonly props: UserProps){}

    public static create(userName: string, email: string, password: string){

        // Validations//

        //Email is email?
        if (!validator.isEmail(email)) {
            throw new Error("Email is Invalid!");
            
        }
        //username is empty?
        if(!validator.isEmpty(userName.trim())){
            throw new Error("Username can not be empty!");
        }

        //password have a 6 characters?
        if (!validator.isLength(password, { min: 6})) {
            throw new Error("Your password must be at least 6 characters long!");
        }

        //password contains at least one uppercase letter?
        if(!validator.matches(password, /[A-Z]/)){
            throw new Error("Your password must contain at least one uppercase letter!");
        }

        //password have a special character?
        if (!validator.matches(password, /[^A-Za-z0-9]/)) {
            throw new Error("Your password must contain at least one special character!");
        }

        //password have a number?
        if(!validator.matches(password, /[0-9]/)){
            throw new Error("Your password must contain at least one number!");
        }
        // End of Validations//

        //Create a id
        const id = crypto.randomUUID().toString()
        //Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        //encapsulate props
        const props: UserProps = {
            userName, 
            email, 
            password: hashedPassword, 
            id }

        //Returns a new User with the props
        return new User(props)
    }

    public static assemble(props: UserProps){

        return new User(props)
    }

}

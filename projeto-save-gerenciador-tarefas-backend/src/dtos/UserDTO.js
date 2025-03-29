export class CreateUserDTO {
    constructor({ name, email, password }) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
  }

export class UpdateUserDTO {
    constructor({ name, email }) {
        this.name = name;
        this.email = email;
    }
}
  
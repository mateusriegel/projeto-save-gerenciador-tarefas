export class CreateTaskDTO {
    constructor({ description, date }) {
      this.description = description;
      this.date = date;
    }
  }
  
  export class UpdateTaskDTO {
    constructor({ description, date }) {
      this.description = description;
      this.date = date;
    }
  }
  
  export class UpdateTaskStatusDTO {
    constructor({ status }) {
      this.status = status;
    }
  }
  
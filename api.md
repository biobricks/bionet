# API Documentation
An [Application Programming Interface](https://en.wikipedia.org/wiki/Application_programming_interface) (API) that receives requests from the [React](https://reactjs.org/) [client](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) and responds with [JSON](https://www.json.org/) data.  

# Modules
The API includes the following third-party [Node JS](https://nodejs.org) Modules:  
[bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password Hashing - Besides incorporating a salt to protect against rainbow table attacks, bcrypt is an adaptive function: over time, the iteration count can be increased to make it slower, so it remains resistant to brute-force search attacks even with increasing computation power.  
[body-parser](https://www.npmjs.com/package/body-parser) - Express [middleware](https://en.wikipedia.org/wiki/Middleware) to handle incoming requests and their payload or 'body'.  
[express](https://www.npmjs.com/package/express) - Web [server](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) framework for [Node JS](https://nodejs.org).  
[express-bearer-token](https://www.npmjs.com/package/express-bearer-token) - Attempts to extract a authorization token from incoming requests.  
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Signs and verifies [JSON Web Tokens](https://jwt.io/) (JWT).  
[mongoose](https://www.npmjs.com/package/mongoose) - A [MongoDB](https://www.mongodb.com/) [object modeling](https://en.wikipedia.org/wiki/Object-modeling_technique) tool designed to work in an [asynchronous](https://en.wikipedia.org/wiki/Asynchronous_method_invocation) environment.  
[passport](https://www.npmjs.com/package/passport) - Express-compatible authentication middleware.  
[passport-local](https://www.npmjs.com/package/passport-local) - Passport strategy for authentication with a username and password.  

# Models
The [MongoDB](https://www.mongodb.com/) [Object Models](https://en.wikipedia.org/wiki/Object-modeling_technique) or 'Models' are found within the ```./api/models``` directory and contains the following models:

## User

### User Schema
The structure or [schema](https://en.wikipedia.org/wiki/Database_schema) of a User:
```js
{
  createdAt    : { type: String, default: new Date() },
  updatedAt    : { type: String, default: new Date() },
  isAdmin      : { type: Boolean, default: false },
  username     : { type: String, required: true, index: { unique: true }},
  password     : String,
  name         : { type: String, required: true },
  email        : { type: String, required: true, index: { unique: true }},
  imageUrl     : { type: String, default: "" }
}
```

### User Attributes
**createdAt** - A javascript Date object representing when the User was created.  
**updatedAt** - A javascript Date object representing when the User was last updated.  
**isAdmin** - A boolean (true/false) representing whether or not the User has administrator priviledges.  
**username** - A text field used to identify the user.  
**password** - A salted and encrypted password.  
**name** - The real name of the User.  
**email** - The Users email address.  
**imageUrl** - A link to an image to be used for the Users profile.  


## Lab

### Lab Schema
The structure or [schema](https://en.wikipedia.org/wiki/Database_schema) of a Lab:
```js
{
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  name         : { type: String, required: true },
  description  : { type: String, default: "" },
  innerWidth   : { type: Number, default: 1, min: 1 },
  innerHeight  : { type: Number, default: 1, min: 1 },
  children     : { type: Object, default: {} },
  users        : [{ type: String, ref: "User"}],
  joinRequests : [{ type: String, ref: "User"}]
}
```

### Lab Attributes
**createdAt** - A javascript Date object representing when the Lab was created.  
**createdBy** - The ID of the User that created the Lab.  
**updatedAt** - A javascript Date object representing when the Lab was last updated.  
**updatedBy** - The ID of the User that last updated the Lab.  
**name** - The name of the Lab.  
**description** - A short description of the Lab.  
**innerWidth** - A number that represents the grid cell width of the inside of the Lab.  
**innerHeight** - A number that represents the grid cell height of the inside of the Lab.  
**children** - A placeholder javascript object that is populated with a [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG) of the Containers and Physicals found within the Lab.  The DAG contains a large amount of information that is constantly changing so this data is not saved to persistence but assembled upon request for the Lab.  
**users** - An 'array' or list of User IDs that represent the members of the Lab.  
**joinRequests** - An array of User IDs that represent the Users requesting membership to the Lab.  



## Container

### Container Schema
The structure or [schema](https://en.wikipedia.org/wiki/Database_schema) of a Container:
```js
{
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  name         : { type: String, required: true },
  description  : { type: String, default: "" },
  lab          : { type: String, ref: "Lab", required: true }, 
  parent       : { type: String, ref: "Container" },
  parentX      : { type: Number, default: 1 },
  parentY      : { type: Number, default: 1 },
  parentZ      : { type: Number, default: 1 },
  innerWidth   : { type: Number, default: 1, min: 1 },
  innerHeight  : { type: Number, default: 1, min: 1 },
  width        : { type: Number, default: 1 },
  height       : { type: Number, default: 1 },
  children     : Object,
  category     : { type: String, default: "" },
  bgColor      : { type: String, default: "#00D1FD" },
  breadcrumbs  : []
}
```

### Container Attributes
**createdAt** - A javascript Date object representing when the Container was created.  
**createdBy** - The ID of the User that created the Container.  
**updatedAt** - A javascript Date object representing when the Container was last updated.  
**updatedBy** - The ID of the User that last updated the Container.  
**name** - The name of the Container.  
**description** - A short description of the Container.  
**lab** - The ID of the Lab that houses the Container.  
**parent** - The ID of the 'parent' Container that houses the Container, if one exists. If no parent Container ID exists, it is assumed the parent container is the Lab.  
**parentX** - The 2D/3D X location coordinate within the Containers parent.  
**parentY** - The 2D/3D Y location coordinate within the Containers parent.  
**parentZ** - The 2D/3D Z location coordinate within the Containers parent.  
**innerWidth** - A number that represents the grid cell width of the inside of the Container.  
**innerHeight** - A number that represents the grid cell height of the inside of the Container.  
**width** - A number that represents the grid cell width of the Container inside its parent Container or Lab.  
**height** - A number that represents the grid cell height of the Container inside its parent Container or Lab.  
**children** - A placeholder javascript object that is populated with a [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG) of the Containers and Physicals found within the Container.  The DAG contains a large amount of information that is constantly changing so this data is not saved to persistence but assembled upon request for the Container.  
**category** - A text field for sorting various types of Containers.  
**bgColor** - A color field representing the background color of the Container when shown in a grid as a child of its parent Lab or Container.  
**breadcrumbs** - A placeholder array that holds the parent record tree from the current Container up to its Lab.



## Virtual

### Virtual Schema
The structure or [schema](https://en.wikipedia.org/wiki/Database_schema) of a Virtual:
```js
{
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  name         : { type: String, unique: true, required: true },
  description  : { type: String, default: "" },
  isAvailable  : { type: Boolean, default: false },
  provenance   : { type: String },
  genotype     : { type: String },
  sequence     : { type: String },
  fgSubmitted  : { type: Boolean, default: false },
  fgStage      : { type: Number, default: 0 },
  category     : { type: String, required: true }
}
```




## Physical

### Physical Schema
The structure or [schema](https://en.wikipedia.org/wiki/Database_schema) of a Physical:
```js
{
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  name         : { type: String, required: true },
  description  : { type: String, default: "" },
  lab          : { type: String, ref: "Lab", required: true }, 
  parent       : { type: String, ref: "Container" },
  parentX      : { type: Number, default: 1 },
  parentY      : { type: Number, default: 1 },
  parentZ      : { type: Number, default: 1 },
  virtual      : { type: String, ref: "Virtual", required: true },
  width        : { type: Number, default: 1 },
  height       : { type: Number, default: 1 }
}
```




#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```



## step1 
add JWT_SECRET to the env

controllers

auth.js
register, login
------------
jobs.jos
createJob
getalljobs
deleteJob
getJob
update

-----------
router
auth.js
post('/register)
post('/login)

jobs.js
('/') -> get all jobs
('/:id') for get, update delete

-------------
app

app.use('/api/v1/auth')
app.use('/api/v1/job')


----------------
Create user model
user.model

name, email, password


## step2
In the register function await User.create()
check if name , email etc is not present send the bad request
user.create({...req.body})


the password we will encrypt using bcrypt js

do the bcrypt in the userSchema.pre('save', async function() {})

const = await bcrypt.genSalt(10)
salt hashedPassword = await bcrypt.hash(password, salt)
tempUser  = { name, email, password: hashedPassword }

IN the auth.js

after user create -> get the token -> jwt.sign({userId:user._id, name:user.name}, 'jwtSecret', {expiresIN: '30d'})

res.status(statusCode.CREATED.json({user: { name: user.name}, token)

in the user schema 
#UserSchema.methods.getName = fn() {
#return this.name }

UserSchema.methods.createJWT = fn () {
return wt.sign({userId:this._id, name:this.name}, 'jwtSecret', {expiresIN: '30d'})

so in the auth.js only need to call create JWT

we can use allsecret website to generate a jwt secret online

we can meve the expiresIN in the process.env


## step 3
In the controller in the login function 

{ email, pass } = req.body

check if no email or password -> send bad request

const user = await User.findOne({email}) -> if no user thow unathenticatedError -> which is a custom error

if user is there get token 
token = user.createJWT()
res.status(StatusCode.okay).json({user: { name: user.name }, token })


NOTE: In the pstman body 

In this function, we compare the password
FOr this in the user schema, have a method comparePassword

comparePassword = async function (candidate password) {
  ismatch = await bcrypt.comapre(candid_password, this.password)
}


## step 4 
Have the authentication middleware -> reffer to previous project
just veriy the jwt token

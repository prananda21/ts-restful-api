# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
	"username": "example",
	"password": "example",
	"name": "example"
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "example",
		"name": "example"
	}
}
```

Response Body (Failure) :

```json
{
	"errors": "Username must not blank" // example
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
	"username": "example",
	"password": "example"
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "example",
		"name": "example",
		"token": "uuid"
	}
}
```

Response Body (Failure) :

```json
{
	"errors": "username or password is incorrect"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": {
		"username": "example",
		"name": "example"
	}
}
```

Response Body (Failure) :

```json
{
	"errors": "username or password is incorrect"
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"password": "example", // optional
	"name": "example" // optional
}
```

Response Body (Success) :

```json
{
	"data": {
		"username": "example",
		"name": "example"
	}
}
```

Response Body (Failure) :

```json
{
	"errors": "unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": "OK"
}
```

Response Body (Failure) :

```json
{
	"errors": "unauthorized"
}
```

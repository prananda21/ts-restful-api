# Contact API Spec

## Create Contact

Endpoint : POST api/contacts

Request Header :

- X-API-TOKEN : token

Request Body:

```json
{
	"first_name": "example",
	"last_name": "example",
	"email": "example@example.com",
	"phone_number": 0811111111111 // example
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1, // example
		"first_name": "example",
		"last_name": "example",
		"email": "example@example.com",
		"phone_number": 0811111111111 // example
	}
}
```

Response Body (Failure) :

```json
{
	"errors": "first_name must not blank" // example
}
```

## Get Contact

Endpoint : GET api/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": {
		"id": 1, // example
		"first_name": "example",
		"last_name": "example",
		"email": "example@example.com",
		"phone_number": 0811111111111 // example
	}
}
```

Response Body (Failure) :

```json
{
	"errors": "contact is not found" // example
}
```

## Update Contact

Endpoint : PUT api/contacts/:id

Request Header :

- X-API-TOKEN : token

Request Body:

```json
{
	"first_name": "example",
	"last_name": "example",
	"email": "example@example.com",
	"phone_number": 0811111111111 // example
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1, // example
		"first_name": "example",
		"last_name": "example",
		"email": "example@example.com",
		"phone_number": 0811111111111 // example
	}
}
```

Response Body (Failure) :

```json
{
	"errors": "first_name must not blank" // example
}
```

## Remove Contact

Endpoint : DELETE api/contacts/:id

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
	"errors": "contact is not found" // example
}
```

## Search Contact

Endpoint : GET api/contacts

Query Parameter :

- name : string, contact first_name or contact last_name, optional
- phone_number : string, contact phone_number, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": [
		{
			"id": 1, // example
			"first_name": "example",
			"last_name": "example",
			"email": "example@example.com",
			"phone_number": 0811111111111 // example
		}
		{
			"id": 2, // example
			"first_name": "example",
			"last_name": "example",
			"email": "example@example.com",
			"phone_number": 0811111111111 // example
		}
	],
    "paging": {
        "current_page": 1,
        "total_pages": 10,
        "size": 10
    }
}
```

Response Body (Failure) :

```json
{
	"errors": "unauthorized" // example
}
```

# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"street": "Jalan example",
	"city": "example",
	"province": "example",
	"country": "example",
	"postal_code": "1234"
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"street": "Jalan example",
		"city": "example",
		"province": "example",
		"country": "example",
		"postal_code": "1234"
	}
}
```

Response Body (Failure) :

```json
{
	"errors": "street and city are required"
}
```

## Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"street": "Jalan example",
		"city": "example",
		"province": "example",
		"country": "example",
		"postal_code": "1234"
	}
}
```

Response Body (Failure) :

```json
{
	"errors": "address is not found"
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
	"street": "Jalan example",
	"city": "example",
	"province": "example",
	"country": "example",
	"postal_code": "1234"
}
```

Response Body (Success) :

```json
{
	"data": {
		"id": 1,
		"street": "Jalan example",
		"city": "example",
		"province": "example",
		"country": "example",
		"postal_code": "1234"
	}
}
```

Response Body (Failure) :

```json
{
	"errors": "street and city are required"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

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
	"errors": "address is not found"
}
```

## List Address

Endpoint : GET /api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
	"data": [
		{
			"id": 1,
			"street": "Jalan example",
			"city": "example",
			"province": "example",
			"country": "example",
			"postal_code": "1234"
		},
		{
			"id": 2,
			"street": "Jalan example",
			"city": "example",
			"province": "example",
			"country": "example",
			"postal_code": "1234"
		}
	]
}
```

Response Body (Failure) :

```json
{
	"errors": "contact is not found"
}
```

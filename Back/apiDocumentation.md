# API Documentation

## Authentication Routes

### POST /api/auth/login

**Description:** Login user

**Request Body:**

```json
{
	"email": "string",
	"password": "string"
}
```

**Response:**

- 200 OK: Returns the user data and a login success message.
  ```json
  {
  	"message": "Login successful",
  	"data": {
  		"id": "string",
  		"email": "string",
  		"name": "string",
  		"phoneNumber": "string",
  		"createdAt": "string",
  		"updatedAt": "string"
  	}
  }
  ```
- 400 Bad Request: Returns an error message if the email or password is incorrect.
  ```json
  {
  	"error": "string"
  }
  ```

### POST /api/auth/register

**Description:** Register new user

**Request Body:**

```json
{
	"name": "string",
	"email": "string",
	"password": "string",
	"phoneNum": "string"
}
```

**Response:**

- 201 Created: Returns the user data and a success message.
  ```json
  {
  	"message": "User registered successfully",
  	"data": {
  		"id": "string",
  		"email": "string",
  		"name": "string",
  		"phoneNumber": "string",
  		"createdAt": "string",
  		"updatedAt": "string"
  	}
  }
  ```
- 400 Bad Request: Returns an error message if any field is missing or the user already exists.
  ```json
  {
  	"error": "string"
  }
  ```

### GET /api/auth/logout

**Description:** Logout user

**Response:**

- 200 OK: Returns a logout success message.
  ```json
  {
  	"message": "Logout successful"
  }
  ```

## Salon Routes

### GET /api/salons

**Description:** Get all salons

**Response:**

- 200 OK: Returns all salons.
  ```json
  {
  	"message": "All salons",
  	"data": [
  		{
  			"id": "string",
  			"name": "string",
  			"description": "string",
  			"address": "string",
  			"city": "string",
  			"phoneNumber": "string",
  			"pictures": [
  				{
  					"id": "string",
  					"url": "string",
  					"salonId": "string",
  					"createdAt": "string",
  					"updatedAt": "string"
  				}
  			],
  			"ownerId": "string",
  			"createdAt": "string",
  			"updatedAt": "string",
  			"rating": "number"
  		}
  	]
  }
  ```

### GET /api/salons/:id

**Description:** Get salon by ID

**Response:**

- 200 OK: Returns the salon data.
  ```json
  {
  	"id": "string",
  	"name": "string",
  	"description": "string",
  	"address": "string",
  	"city": "string",
  	"phoneNumber": "string",
  	"pictures": [
  		{
  			"id": "string",
  			"url": "string",
  			"salonId": "string",
  			"createdAt": "string",
  			"updatedAt": "string"
  		}
  	],
  	"ownerId": "string",
  	"createdAt": "string",
  	"updatedAt": "string",
  	"rating": "number"
  }
  ```
- 404 Not Found: Returns an error message if the salon is not found.
  ```json
  {
  	"error": "Salon not found"
  }
  ```

### POST /api/salons

**Description:** Create a new salon

**Request Body:**

```json
{
	"name": "string",
	"description": "string",
	"address": "string",
	"city": "string",
	"phoneNumber": "string",
	"pictures": ["string"]
}
```

**Response:**

- 201 Created: Returns the created salon data.
  ```json
  {
  	"id": "string",
  	"name": "string",
  	"description": "string",
  	"address": "string",
  	"city": "string",
  	"phoneNumber": "string",
  	"pictures": [
  		{
  			"id": "string",
  			"url": "string",
  			"salonId": "string",
  			"createdAt": "string",
  			"updatedAt": "string"
  		}
  	],
  	"ownerId": "string",
  	"createdAt": "string",
  	"updatedAt": "string",
  	"rating": "number"
  }
  ```
- 400 Bad Request: Returns an error message if any field is missing or the user already has a salon.
  ```json
  {
  	"error": "string"
  }
  ```

### PUT /api/salons/:id

**Description:** Update a salon

**Request Body:**

```json
{
	"name": "string",
	"description": "string",
	"address": "string",
	"city": "string",
	"phoneNumber": "string"
}
```

**Response:**

- 200 OK: Returns the updated salon data.
  ```json
  {
  	"id": "string",
  	"name": "string",
  	"description": "string",
  	"address": "string",
  	"city": "string",
  	"phoneNumber": "string",
  	"ownerId": "string",
  	"createdAt": "string",
  	"updatedAt": "string",
  	"rating": "number"
  }
  ```
- 400 Bad Request: Returns an error message if any field is missing.
  ```json
  {
  	"error": "string"
  }
  ```
- 403 Forbidden: Returns an error message if the user is not authorized to update the salon.
  ```json
  {
  	"error": "string"
  }
  ```
- 404 Not Found: Returns an error message if the salon is not found.
  ```json
  {
  	"error": "Salon not found"
  }
  ```

### DELETE /api/salons/:id

**Description:** Delete a salon

**Response:**

- 200 OK: Returns a success message.
  ```json
  {
  	"message": "Salon deleted successfully"
  }
  ```
- 404 Not Found: Returns an error message if the salon is not found.
  ```json
  {
  	"error": "Salon not found"
  }
  ```

### POST /api/salons/:id/pictures

**Description:** Add pictures to a salon

**Request Body:**

```json
{
	"pictures": ["string"]
}
```

**Response:**

- 200 OK: Returns a success message.
  ```json
  {
  	"message": "Pictures added successfully"
  }
  ```
- 403 Forbidden: Returns an error message if the user is not authorized to update the salon.
  ```json
  {
  	"error": "string"
  }
  ```
- 404 Not Found: Returns an error message if the salon is not found.
  ```json
  {
  	"error": "Salon not found"
  }
  ```

### DELETE /api/salons/pictures/:pictureId

**Description:** Delete a picture from a salon

**Response:**

- 200 OK: Returns a success message.
  ```json
  {
  	"message": "Picture deleted successfully"
  }
  ```
- 403 Forbidden: Returns an error message if the user is not authorized to update the salon.
  ```json
  {
  	"error": "string"
  }
  ```
- 404 Not Found: Returns an error message if the picture or salon is not found.
  ```json
  {
  	"error": "Picture not found"
  }
  ```

## Service Routes

### GET /api/service

**Description:** Get all services

**Response:**

- 200 OK: Returns all services.
  ```json
  {
  	"message": "All services",
  	"data": [
  		{
  			"id": "string",
  			"name": "string",
  			"description": "string",
  			"price": "number",
  			"pointPrice": "number",
  			"duration": "number",
  			"category": "string",
  			"inHouse": "boolean",
  			"createdAt": "string",
  			"updatedAt": "string"
  		}
  	]
  }
  ```

### POST /api/service

**Description:** Create a new service

**Request Body:**

```json
{
	"name": "string",
	"description": "string",
	"price": "number",
	"pointPrice": "number",
	"duration": "number",
	"category": "string",
	"inHouse": "boolean"
}
```

**Response:**

- 201 Created: Returns the created service data.
  ```json
  {
  	"id": "string",
  	"name": "string",
  	"description": "string",
  	"price": "number",
  	"pointPrice": "number",
  	"duration": "number",
  	"category": "string",
  	"inHouse": "boolean",
  	"createdAt": "string",
  	"updatedAt": "string"
  }
  ```
- 400 Bad Request: Returns an error message if any field is missing or invalid.
  ```json
  {
  	"error": "string"
  }
  ```

### GET /api/service/:id

**Description:** Get service by ID

**Response:**

- 200 OK: Returns the service data.
  ```json
  {
  	"id": "string",
  	"name": "string",
  	"description": "string",
  	"price": "number",
  	"pointPrice": "number",
  	"duration": "number",
  	"category": "string",
  	"inHouse": "boolean",
  	"createdAt": "string",
  	"updatedAt": "string"
  }
  ```
- 404 Not Found: Returns an error message if the service is not found.
  ```json
  {
  	"error": "Service not found"
  }
  ```

### PUT /api/service/:id

**Description:** Update a service

**Request Body:**

```json
{
	"name": "string",
	"description": "string",
	"price": "number",
	"pointPrice": "number",
	"duration": "number",
	"category": "string",
	"inHouse": "boolean"
}
```

**Response:**

- 200 OK: Returns the updated service data.
  ```json
  {
  	"id": "string",
  	"name": "string",
  	"description": "string",
  	"price": "number",
  	"pointPrice": "number",
  	"duration": "number",
  	"category": "string",
  	"inHouse": "boolean",
  	"createdAt": "string",
  	"updatedAt": "string"
  }
  ```
- 400 Bad Request: Returns an error message if any field is missing or invalid.
  ```json
  {
  	"error": "string"
  }
  ```
- 403 Forbidden: Returns an error message if the user is not authorized to update the service.
  ```json
  {
  	"error": "string"
  }
  ```
- 404 Not Found: Returns an error message if the service is not found.
  ```json
  {
  	"error": "Service not found"
  }
  ```

### DELETE /api/service/:id

**Description:** Delete a service

**Response:**

- 200 OK: Returns a success message.
  ```json
  {
  	"message": "Service deleted successfully"
  }
  ```
- 403 Forbidden: Returns an error message if the user is not authorized to delete the service.
  ```json
  {
  	"error": "string"
  }
  ```
- 404 Not Found: Returns an error message if the service is not found.
  ```json
  {
  	"error": "Service not found"
  }
  ```

### GET /api/service/salon/:id

**Description:** Get all services of a salon

**Response:**

- 200 OK: Returns all services of the salon.
  ```json
  {
  	"message": "All services of the salon",
  	"data": [
  		{
  			"id": "string",
  			"name": "string",
  			"description": "string",
  			"price": "number",
  			"pointPrice": "number",
  			"duration": "number",
  			"category": "string",
  			"inHouse": "boolean",
  			"createdAt": "string",
  			"updatedAt": "string"
  		}
  	]
  }
  ```
- 404 Not Found: Returns an error message if the salon or services are not found.
  ```json
  {
  	"error": "Salon or services not found"
  }
  ```

### GET /api/service/salon/:salonId/category/:category

**Description:** Get all services of a salon by category

**Response:**

- 200 OK: Returns all services of the salon by category.
  ```json
  {
  	"message": "All services of the salon by category",
  	"data": [
  		{
  			"id": "string",
  			"name": "string",
  			"description": "string",
  			"price": "number",
  			"pointPrice": "number",
  			"duration": "number",
  			"category": "string",
  			"inHouse": "boolean",
  			"createdAt": "string",
  			"updatedAt": "string"
  		}
  	]
  }
  ```
- 404 Not Found: Returns an error message if the salon, category, or services are not found.
  ```json
  {
  	"error": "Salon, category, or services not found"
  }
  ```

## Reservation Routes

### GET /api/reservation

**Description:** Get all reservations

**Response:**

- 200 OK: Returns all reservations.
  ```json
  {
  	"message": "All reservations",
  	"data": [
  		{
  			"id": "string",
  			"startTime": "string",
  			"endTime": "string",
  			"status": "string",
  			"price": "number",
  			"paymentType": "string",
  			"customerId": "string",
  			"serviceId": "string",
  			"salonId": "string",
  			"createdAt": "string",
  			"updatedAt": "string",
  			"coupon": "string"
  		}
  	]
  }
  ```

### GET /api/reservation/user/:id

**Description:** Get all reservations by user ID

**Response:**

- 200 OK: Returns all reservations by user ID.
  ```json
  {
  	"message": "All reservations by user ID",
  	"data": [
  		{
  			"id": "string",
  			"startTime": "string",
  			"endTime": "string",
  			"status": "string",
  			"price": "number",
  			"paymentType": "string",
  			"customerId": "string",
  			"serviceId": "string",
  			"salonId": "string",
  			"createdAt": "string",
  			"updatedAt": "string",
  			"coupon": "string"
  		}
  	]
  }
  ```

### GET /api/reservation/confirmed

**Description:** Get all confirmed reservations

**Response:**

- 200 OK: Returns all confirmed reservations.
  ```json
  {
  	"message": "All confirmed reservations",
  	"data": [
  		{
  			"id": "string",
  			"startTime": "string",
  			"endTime": "string",
  			"status": "string",
  			"price": "number",
  			"paymentType": "string",
  			"customerId": "string",
  			"serviceId": "string",
  			"salonId": "string",
  			"createdAt": "string",
  			"updatedAt": "string",
  			"coupon": "string"
  		}
  	]
  }
  ```

### GET /api/reservation/cancelled

**Description:** Get all cancelled reservations

**Response:**

- 200 OK: Returns all cancelled reservations.
  ```json
  {
  	"message": "All cancelled reservations",
  	"data": [
  		{
  			"id": "string",
  			"startTime": "string",
  			"endTime": "string",
  			"status": "string",
  			"price": "number",
  			"paymentType": "string",
  			"customerId": "string",
  			"serviceId": "string",
  			"salonId": "string",
  			"createdAt": "string",
  			"updatedAt": "string",
  			"coupon": "string"
  		}
  	]
  }
  ```

### GET /api/reservation/history

**Description:** Get reservation history

**Response:**

- 200 OK: Returns reservation history.
  ```json
  {
  	"message": "Reservation history",
  	"data": [
  		{
  			"id": "string",
  			"startTime": "string",
  			"endTime": "string",
  			"status": "string",
  			"price": "number",
  			"paymentType": "string",
  			"customerId": "string",
  			"serviceId": "string",
  			"salonId": "string",
  			"createdAt": "string",
  			"updatedAt": "string",
  			"coupon": "string"
  		}
  	]
  }
  ```

### GET /api/reservation/available/:day/:month

**Description:** Get available hours for a specific day and month

**Response:**

- 200 OK: Returns available hours.
  ```json
  {
    "availableHours": [number]
  }
  ```

### GET /api/reservation/:id

**Description:** Get reservation by ID

**Response:**

- 200 OK: Returns the reservation data.
  ```json
  {
  	"message": "Reservation successfully found",
  	"reservation": {
  		"id": "string",
  		"startTime": "string",
  		"endTime": "string",
  		"status": "string",
  		"price": "number",
  		"paymentType": "string",
  		"customerId": "string",
  		"serviceId": "string",
  		"salonId": "string",
  		"createdAt": "string",
  		"updatedAt": "string",
  		"coupon": "string"
  	}
  }
  ```
- 404 Not Found: Returns an error message if the reservation is not found.
  ```json
  {
  	"error": "Reservation not found"
  }
  ```

### POST /api/reservation/:serviceId

**Description:** Create a new reservation

**Request Body:**

```json
{
	"startTime": "string",
	"coupon": "string",
	"paymentType": "string"
}
```

**Response:**

- 201 Created: Returns the created reservation data.
  ```json
  {
  	"message": "Reservation created",
  	"data": {
  		"id": "string",
  		"startTime": "string",
  		"endTime": "string",
  		"status": "string",
  		"price": "number",
  		"paymentType": "string",
  		"customerId": "string",
  		"serviceId": "string",
  		"salonId": "string",
  		"createdAt": "string",
  		"updatedAt": "string",
  		"coupon": "string"
  	},
  	"checkout": "string"
  }
  ```
- 400 Bad Request: Returns an error message if any field is missing or invalid.
  ```json
  {
  	"error": "string"
  }
  ```

### PUT /api/reservation/:id

**Description:** Update a reservation

**Request Body:**

```json
{
	"status": "string"
}
```

**Response:**

- 200 OK: Returns the updated reservation data.
  ```json
  {
  	"message": "Reservation Updated successfully",
  	"updatedReservation": {
  		"id": "string",
  		"startTime": "string",
  		"endTime": "string",
  		"status": "string",
  		"price": "number",
  		"paymentType": "string",
  		"customerId": "string",
  		"serviceId": "string",
  		"salonId": "string",
  		"createdAt": "string",
  		"updatedAt": "string",
  		"coupon": "string"
  	}
  }
  ```
- 400 Bad Request: Returns an error message if any field is missing or invalid.
  ```json
  {
  	"error": "string"
  }
  ```
- 404 Not Found: Returns an error message if the reservation is not found.
  ```json
  {
  	"error": "Reservation not found"
  }
  ```

### DELETE /api/reservation/:id

**Description:** Delete a reservation

**Response:**

- 200 OK: Returns a success message.
  ```json
  {
  	"message": "Reservation deleted successfully"
  }
  ```
- 404 Not Found: Returns an error message if the reservation is not found.
  ```json
  {
  	"error": "Reservation not found"
  }
  ```

## Other Routes

### GET /

**Description:** Welcome route

**Response:**

- 200 OK: Returns "Hello World".
  ```json
  {
  	"message": "Hello World"
  }
  ```

### Other Routes

(not tested yet)

- `/api/chargily`: Chargily routes
- `/api/review`: Review routes (Private)
- `/api/coupon`: Coupon routes (Private)

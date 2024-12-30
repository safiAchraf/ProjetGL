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

### GET /api/salons  OR /visitor/salons

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

### GET /api/salons/:id   or salon/:id

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

### GET /api/service  OR /visitor/services

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

### GET /api/service/:id  OR /visitor/services/:id

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

### GET /api/reservation/user

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

### GET /api/reservation/available/:salonId/:day/:month

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
	"inHouse" : boolean
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

### PUT /api/reservation/:reservationid

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

### DELETE /api/reservation/:reservationid

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

# Coupon API Documentation

## Endpoints

### Get All Coupons
**URL:** `/api/coupon/`

**Method:** `GET`

**Description:** Retrieves all coupons.

**Response:**
- **200 OK:** 
  ```json
  {
    "msg": "All coupons",
    "data": [
      {
        "id": "string",
        "code": "string",
        "discount": "number",
        "salonId": "string",
        "createdAt": "string",
        "updatedAt": "string"
      },
      ...
    ]
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "No coupons found"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Create New Coupon
**URL:** `/api/coupon/:salonid`

**Method:** `POST`

**Description:** Creates a new coupon for a salon.

**Request Body:**
```json
{
  "code": "string",
  "discount": "number"
}
```

**Response:**
- **201 Created:** 
  ```json
  {
    "msg": "Coupon created",
    "data": {
      "id": "string",
      "code": "string",
      "discount": "number",
      "salonId": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **400 Bad Request:** 
  ```json
  {
    "msg": "Missing required fields"
  }
  ```
- **403 Forbidden:** 
  ```json
  {
    "error": "You are not authorized to create coupons for this salon"
  }
  ```
- **409 Conflict:** 
  ```json
  {
    "error": "Coupon already exists"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Update Coupon
**URL:** `/api/coupon/:couponid`

**Method:** `PUT`

**Description:** Updates an existing coupon.

**Request Body:**
```json
{
  "code": "string",
  "discount": "number"
}
```

**Response:**
- **200 OK:** 
  ```json
  {
    "msg": "Coupon updated",
    "data": {
      "id": "string",
      "code": "string",
      "discount": "number",
      "salonId": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **403 Forbidden:** 
  ```json
  {
    "error": "You are not authorized to update this coupon"
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "Coupon not found"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Delete Coupon
**URL:** `/api/coupon/:couponid`

**Method:** `DELETE`

**Description:** Deletes an existing coupon.

**Response:**
- **200 OK:** 
  ```json
  {
    "msg": "Coupon deleted"
  }
  ```
- **403 Forbidden:** 
  ```json
  {
    "error": "You are not authorized to delete this coupon"
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "Coupon not found"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Get Coupon
**URL:** `/api/coupon/:couponid`

**Method:** `GET`

**Description:** Retrieves a specific coupon by ID.

**Response:**
- **200 OK:** 
  ```json
  {
    "id": "string",
    "code": "string",
    "discount": "number",
    "salonId": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "Coupon not found"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Get Salon Coupons
**URL:** `/api/coupon/salon/:salonid`

**Method:** `GET`

**Description:** Retrieves all coupons for a specific salon.

**Response:**
- **200 OK:** 
  ```json
  {
    "msg": "All coupons of the salon",
    "data": [
      {
        "id": "string",
        "code": "string",
        "discount": "number",
        "salonId": "string",
        "createdAt": "string",
        "updatedAt": "string"
      },
      ...
    ]
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "Salon not found"
  }
  ```
  ```json
  {
    "error": "No coupons found for this salon"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```
  

  # Review API Documentation

## Endpoints

### Get All Reviews
**URL:** `/api/review/`

**Method:** `GET`

**Description:** Retrieves all reviews.

**Response:**
- **200 OK:** 
  ```json
  {
    "msg": "All Reviews",
    "data": [
      {
        "id": "string",
        "rating": "number",
        "comment": "string",
        "customerId": "string",
        "salonId": "string",
        "createdAt": "string",
        "updatedAt": "string"
      },
      ...
    ]
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "Reviews not found"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Create New Review
**URL:** `/api/review/:salonid`

**Method:** `POST`

**Description:** Creates a new review for a salon.

**Request Body:**
```json
{
  "rating": "number",
  "comment": "string"
}
```

**Response:**
- **201 Created:** 
  ```json
  {
    "msg": "Review posted",
    "data": {
      "id": "string",
      "rating": "number",
      "comment": "string",
      "customerId": "string",
      "salonId": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **400 Bad Request:** 
  ```json
  {
    "msg": "Missing required fields"
  }
  ```
- **401 Unauthorized:** 
  ```json
  {
    "msg": "You can't review your own salon"
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "msg": "Salon not found"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Update Review
**URL:** `/api/review/:reivewid`

**Method:** `PUT`

**Description:** Updates an existing review.

**Request Body:**
```json
{
  "rating": "number",
  "comment": "string"
}
```

**Response:**
- **200 OK:** 
  ```json
  {
    "msg": "Review updated",
    "data": {
      "id": "string",
      "rating": "number",
      "comment": "string",
      "customerId": "string",
      "salonId": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **401 Unauthorized:** 
  ```json
  {
    "msg": "You are not authorized to update comments other than yours"
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "no review found"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Delete Review
**URL:** `/api/review/:reviewid`

**Method:** `DELETE`

**Description:** Deletes an existing review.

**Response:**
- **200 OK:** 
  ```json
  {
    "msg": "Review deleted"
  }
  ```
- **401 Unauthorized:** 
  ```json
  {
    "msg": "You are not authorized to delete comments other than yours"
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "Review not found"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Get Review
**URL:** `/api/review/:reviewid`

**Method:** `GET`

**Description:** Retrieves a specific review by ID.

**Response:**
- **200 OK:** 
  ```json
  {
    "id": "string",
    "rating": "number",
    "comment": "string",
    "customerId": "string",
    "salonId": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "Review not found"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Get Personal Reviews
**URL:** `/api/review/personalReviews`

**Method:** `GET`

**Description:** Retrieves all reviews made by the authenticated user.

**Response:**
- **200 OK:** 
  ```json
  {
    "msg": "All reviews you have made",
    "data": [
      {
        "id": "string",
        "rating": "number",
        "comment": "string",
        "customerId": "string",
        "salonId": "string",
        "createdAt": "string",
        "updatedAt": "string"
      },
      ...
    ]
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "You haven't made any reviews"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Get Salon Reviews
**URL:** `/api/review/salonReviews/:salonid`

**Method:** `GET`

**Description:** Retrieves all reviews for a specific salon.

**Response:**
- **200 OK:** 
  ```json
  {
    "msg": "All reviews you have made",
    "data": [
      {
        "id": "string",
        "rating": "number",
        "comment": "string",
        "customerId": "string",
        "salonId": "string",
        "createdAt": "string",
        "updatedAt": "string"
      },
      ...
    ]
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "No reviews have been made about this salon"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Get Personal Salon Reviews
**URL:** `/api/review/personalSalonReviews/:salonid`

**Method:** `GET`

**Description:** Retrieves all reviews made by the authenticated user for a specific salon.

**Response:**
- **200 OK:** 
  ```json
  {
    "msg": "All reviews you have made for this salon",
    "data": [
      {
        "id": "string",
        "rating": "number",
        "comment": "string",
        "customerId": "string",
        "salonId": "string",
        "createdAt": "string",
        "updatedAt": "string"
      },
      ...
    ]
  }
  ```
- **404 Not Found:** 
  ```json
  {
    "error": "You haven't made any reviews about this salon"
  }
  ```
- **500 Internal Server Error:** 
  ```json
  {
    "error": "string"
  }
  ```

### Other Routes

(not tested yet)

- `/api/chargily`: Chargily routes

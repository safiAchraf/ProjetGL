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
- 400 Bad Request: Returns an error message if the email or password is incorrect.

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
- 400 Bad Request: Returns an error message if any field is missing or the user already exists.

### GET /api/auth/logout

**Description:** Logout user

**Response:**
- 200 OK: Returns a logout success message.

## Salon Routes

### GET /api/salons

**Description:** Get all salons

**Response:**
- 200 OK: Returns all salons.

### GET /api/salons/:id

**Description:** Get salon by ID

**Response:**
- 200 OK: Returns the salon data.
- 404 Not Found: Returns an error message if the salon is not found.

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
- 400 Bad Request: Returns an error message if any field is missing or the user already has a salon.

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
- 400 Bad Request: Returns an error message if any field is missing.
- 403 Forbidden: Returns an error message if the user is not authorized to update the salon.
- 404 Not Found: Returns an error message if the salon is not found.

### DELETE /api/salons/:id

**Description:** Delete a salon

**Response:**
- 200 OK: Returns a success message.
- 404 Not Found: Returns an error message if the salon is not found.

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
- 403 Forbidden: Returns an error message if the user is not authorized to update the salon.
- 404 Not Found: Returns an error message if the salon is not found.

### DELETE /api/salons/pictures/:pictureId

**Description:** Delete a picture from a salon

**Response:**
- 200 OK: Returns a success message.
- 403 Forbidden: Returns an error message if the user is not authorized to update the salon.
- 404 Not Found: Returns an error message if the picture or salon is not found.

## Service Routes

### GET /api/service

**Description:** Get all services

**Response:**
- 200 OK: Returns all services.

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
- 400 Bad Request: Returns an error message if any field is missing or invalid.

### GET /api/service/:id

**Description:** Get service by ID

**Response:**
- 200 OK: Returns the service data.
- 404 Not Found: Returns an error message if the service is not found.

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
- 400 Bad Request: Returns an error message if any field is missing or invalid.
- 403 Forbidden: Returns an error message if the user is not authorized to update the service.
- 404 Not Found: Returns an error message if the service is not found.

### DELETE /api/service/:id

**Description:** Delete a service

**Response:**
- 200 OK: Returns a success message.
- 403 Forbidden: Returns an error message if the user is not authorized to delete the service.
- 404 Not Found: Returns an error message if the service is not found.

### GET /api/service/salon/:id

**Description:** Get all services of a salon

**Response:**
- 200 OK: Returns all services of the salon.
- 404 Not Found: Returns an error message if the salon or services are not found.

### GET /api/service/salon/:salonId/category/:category

**Description:** Get all services of a salon by category

**Response:**
- 200 OK: Returns all services of the salon by category.
- 404 Not Found: Returns an error message if the salon, category, or services are not found.

## Reservation Routes

### GET /api/reservation

**Description:** Get all reservations

**Response:**
- 200 OK: Returns all reservations.

### GET /api/reservation/user/:id

**Description:** Get all reservations by user ID

**Response:**
- 200 OK: Returns all reservations by user ID.

### GET /api/reservation/confirmed

**Description:** Get all confirmed reservations

**Response:**
- 200 OK: Returns all confirmed reservations.

### GET /api/reservation/cancelled

**Description:** Get all cancelled reservations

**Response:**
- 200 OK: Returns all cancelled reservations.

### GET /api/reservation/history

**Description:** Get reservation history

**Response:**
- 200 OK: Returns reservation history.

### GET /api/reservation/available/:day/:month

**Description:** Get available hours for a specific day and month

**Response:**
- 200 OK: Returns available hours.

### GET /api/reservation/:id

**Description:** Get reservation by ID

**Response:**
- 200 OK: Returns the reservation data.
- 404 Not Found: Returns an error message if the reservation is not found.

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
- 400 Bad Request: Returns an error message if any field is missing or invalid.

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
- 400 Bad Request: Returns an error message if any field is missing or invalid.
- 404 Not Found: Returns an error message if the reservation is not found.

### DELETE /api/reservation/:id

**Description:** Delete a reservation

**Response:**
- 200 OK: Returns a success message.
- 404 Not Found: Returns an error message if the reservation is not found.

## Other Routes

### GET /

**Description:** Welcome route

**Response:**
- 200 OK: Returns "Hello World".

### Other Routes
(not tested yet)

- `/api/chargily`: Chargily routes
- `/api/review`: Review routes (Private)
- `/api/coupon`: Coupon routes (Private)

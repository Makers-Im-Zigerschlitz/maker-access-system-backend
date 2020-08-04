# API Documentation

Where full URLs are provided in responses they will be rendered as if service
is running on 'http://localhost:3000/'.

## Open Endpoints

Open endpoints require no Authentication.

* [Authenticate](auth/post-dologin.md) : `POST /auth/dologin/`
* [Get authentication state](auth/get.md) : `GET /auth/`

## Endpoints that require Authentication

Closed endpoints require a valid session-cookie. This cookie is automatically
issued by the backend.

### Current User related

Each endpoint manipulates or displays information related to the User whose
session is provided with the request:

* [Get user info](auth/me/get.md) : `GET /auth/me/`
* [Set password](auth/me/post-setpass.md) : `POST /auth/me/setpass`

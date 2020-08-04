# Show Current User

Get the details of the currently Authenticated User along with basic
subscription information.

**URL** : `/auth/me/`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

The response is filled with data of the current user.

```json
{
    "uid": 0,
    "username": "test",
    "password": "<hash>",
    "level": 0
}
```

## Failure Response

**Code** : `401 UNAUTHORIZED`

**Content examples**

If the user is not authorized, he won' receive any body.

```
401 UNAUTHORIZED
```

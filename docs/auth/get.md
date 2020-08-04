# Show Current User

Get the details of the currently Authenticated User along with basic
subscription information.

**URL** : `/auth/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a authenticated user, the following JSON-response will be sent:

```json
{
    "isAuthenticated": true
}
```

If the user has no valid session, the following response will be sent:

```json
{
    "isAuthenticated": false
}
```

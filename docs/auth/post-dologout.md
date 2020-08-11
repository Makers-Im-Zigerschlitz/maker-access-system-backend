# Logout

This is the route to deauthenticate the current user

**URL** : `/auth/dologout/`

**Method** : `POST`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "successful": true
}
```

## Error Response

This is the response, when the user wasn't logged in.

**Code** : `401 UNAUTHORIZED`

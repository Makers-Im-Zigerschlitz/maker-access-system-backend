# Login

Used to collect a Token for a registered User.

**URL** : `/auth/me/setpass/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "password": "abcd1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "successful": true
}
```

## Error Response

**Code** : `200 OK`

**Content example**

```json
{
    "successful": false
}
```

## UNAUTHORIZED Response

**Condition** : If user is not authenticated.

**Code** : `401 UNAUTHORIZED`

**Content** :

```
401 UNAUTHORIZED
```

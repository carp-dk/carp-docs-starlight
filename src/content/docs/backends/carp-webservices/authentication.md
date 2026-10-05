---
title: "Authentication"
description: "Dart client for CARP Web Services (CAWS)."
sidebar:
  label: Authentication
  order: 3
---

Authentication is done using the `CarpAuthService` singleton, which is configured using the `CarpAuthProperties` properties:

```dart
// The authentication configuration
late CarpAuthProperties authProperties = CarpAuthProperties(
  authURL: uri,
  clientId: 'my-client-id',
  redirectURI: Uri.parse('my-redirect-uri:/my-path'),
  anonymousRedirectURI: Uri.parse('my-redirect-uri:/my-anonymous-user-path'),
  // For authentication at CAWS the path is '/auth/realms/Carp'
  discoveryURL: uri.replace(pathSegments: [
    'auth',
    'realms',
    'Carp',
  ]),
);

await CarpAuthService().configure(authProperties);
```

Basic authentication is using the CAWS Keycloak login page, which the system opens when running:

```dart
CarpUser user = await CarpAuthService().authenticate();
```

This [`CarpUser`](https://pub.dev/documentation/carp_webservices/latest/carp_auth_carp_auth/CarpUser-class.html) object contains the OAuth token in the `token` (of type [`OAuthToken`](https://pub.dev/documentation/carp_webservices/latest/carp_auth_carp_auth/OAuthToken-class.html)) parameter.
Since the `CarpUser` object can be serialized to JSON, the user and the (valid) OAuth token can be stored on the phone.

The OAuth token can be refreshed by calling the `refresh()` method:

```dart
await CarpAuthService().refresh()
```

This method returns a `CarpUser`, with a new access token.

To authenticate using username and password without opening the web view, use the `authenticateWithUsernamePassword` method:

```dart
CarpUser user = await CarpAuthService().authenticateWithUsernamePassword('username', 'password');
```

To authenticate using a magic link (e.g., as read from a QR code) use the `authenticateWithMagicLink` method. This method takes the URL as a `String` parameter, authenticates the user, and generates and returns a `CarpUser` object.

```dart
CarpUser user = await CarpAuthService().authenticateWithMagicLink(qrcode);
```

## How the two login flows differ

There are two ways a user ends up with a token, and they are handled by different code paths:

| | Browser login (`authenticate()`) | Magic link (`authenticateWithMagicLink()`) |
|---|---|---|
| Grant | OAuth2 authorization code, scope `openid offline_access` | Keycloak *action token* (`/login-actions/action-token`) |
| Token exchange | `OidcUserManager` (package `oidc`) | `FlutterAppAuth().token()` directly |
| Response | `access_token`, `refresh_token`, `id_token` | `access_token`, `refresh_token` — **no `id_token`** |
| Who holds the user | `OidcUserManager.currentUser` | `CarpAuthService._currentUser` only |

The action-token flow is not a negotiated OpenID grant, so Keycloak never attaches the `openid` scope
and never issues an `id_token` — neither at login nor on refresh. `oidc_core` requires an `id_token`
to build an `OidcUser`, which is why the magic-link path cannot go through the manager at all
(`manager.refreshToken(overrideRefreshToken: ...)` gets a token back but fails on the missing `id_token`).

`refresh()` therefore picks the path based on who owns the user:

- `manager.currentUser != null` → `manager.refreshToken()` (browser login; `id_token` present).
- otherwise, with a stored `refreshToken` → `FlutterAppAuth().token(grantType: 'refresh_token')`,
  and the `CarpUser` is rebuilt from the access-token JWT claims (same as at magic-link login).

Both paths emit `AuthEvent.refreshed` on success and `AuthEvent.failed` otherwise. Refresh tokens are
single-use, so concurrent `refresh()` calls (e.g. several uploads hitting 403 at once) share one in-flight future.

Listen on `authStateChanges` to persist the new token — the service does not store anything itself.

To log out, just call the `logout` or `logoutNoContext` methods:

```dart
await CarpAuthService().logout()
```

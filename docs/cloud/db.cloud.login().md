---
layout: docs-dexie-cloud
title: "db.cloud.login()"
---

Log in a user.

Trigger an authentication flow defined by the configuration options [fetchTokens](db.cloud.configure()#fetchtokens) and [customLoginGui](db.cloud.configure()#customlogingui). If the requested email or userId is already known, provide one of them as argument.

If no arguments are provided and a user is already logged in, the returned promise will resolve immediately without any action. If an email or userId argument is passed that is different from the currently logged in user, a new login flow will start for the new user and the old user will be logged out.

## Dependencies

```
npm i dexie dexie-cloud-addon
```

## Parameters

| Parameter     | Type     | Explanation                                                                     |
| ------------- | -------- | ------------------------------------------------------------------------------- |
| email?        | string   | Email of requested user to login. Optional                                      |
| userId?       | string   | UserID of requested user to login. Optional                                     |
| grant_type?   | string   | Provide `'demo'` for demo user, or `'otp'` to force OTP login                   |
| provider?     | string   | OAuth provider name to initiate OAuth flow (e.g., `'google'`, `'github'`)       |
| redirectPath? | string   | Custom redirect path after OAuth authentication (relative or absolute URL)     |
| oauthCode?    | string   | Dexie Cloud authorization code from OAuth callback (for completing OAuth flow) |


## Syntax

```ts
// Show login dialog and wait for user to complete authentication
await db.cloud.login();

// Pre-fill email for OTP login
await db.cloud.login({ email: 'someone@company.com' });

// Login a demo user (must be imported via CLI first)
await db.cloud.login({ grant_type: 'demo', email: 'alice@demo.local' });
```

## OAuth / Social Login

For OAuth-based authentication (Google, GitHub, Microsoft, Apple, or custom providers), use the `provider` parameter:

> **Prerequisites:** OAuth providers must first be configured in [Dexie Cloud Manager](https://manager.dexie.cloud). Navigate to your database, go to the **Authentication** section, and add the OAuth providers you want to support. See [Configuring OAuth Providers](authentication#configuring-oauth-providers) for detailed setup instructions.

```ts
// Initiate OAuth login with Google
await db.cloud.login({ provider: 'google' }); // assuming google provider is configured

// Login with Microsoft and redirect to a specific page after auth
await db.cloud.login({ 
  provider: 'microsoft',
  redirectPath: '/dashboard'
});

// Force OTP login even if OAuth providers are available
await db.cloud.login({ grant_type: 'otp' });
```

Available built-in providers: `google`, `github`, `microsoft`, `apple`

For custom OAuth2 providers, use the provider name you configured (e.g., `okta`, `auth0`).

### How OAuth Login Works

When you call `db.cloud.login({ provider: 'google' })`:

1. The page redirects to the OAuth provider's authorization page
2. User authenticates and grants consent
3. Provider redirects back to Dexie Cloud, which exchanges codes
4. User is redirected back to your app with a `dxc-auth` query parameter
5. The dexie-cloud-addon automatically detects and processes this parameter
6. Tokens are stored securely and the URL is cleaned up

No dedicated callback route is needed—this works on any page of your app.

### Capacitor / Native Apps

For Capacitor or native mobile apps, use a custom URL scheme:

```js
// Open OAuth login with custom scheme redirect
await db.cloud.login({ 
  provider: 'google',
  redirectPath: 'myapp://'
});
```

Handle the deep link callback:

```js
import { App } from '@capacitor/app';
import { handleOAuthCallback } from 'dexie-cloud-addon';

App.addListener('appUrlOpen', async ({ url }) => {
  const callback = handleOAuthCallback(url);
  if (callback) {
    // Complete the OAuth flow
    await db.cloud.login({ 
      oauthCode: callback.code, 
      provider: callback.provider 
    });
  }
});
```

See [Authentication](authentication#social-authentication-oauth) for more details on configuring OAuth providers.

## Return Value

`Promise<void>`


# See also

[db.cloud.logout()](db.cloud.logout())
[db.cloud.getAuthProviders()](db.cloud.getAuthProviders())
[Authentication](authentication)


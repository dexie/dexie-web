---
layout: docs-dexie-cloud
title: "db.cloud.getAuthProviders()"
---

Query the available authentication providers configured for the database.

Returns information about which OAuth providers are configured and whether OTP (email) authentication is enabled. This is useful for building custom login UIs that display provider-specific buttons.

## Dependencies

```
npm i dexie dexie-cloud-addon
```

## Syntax

```ts
const { providers, otpEnabled } = await db.cloud.getAuthProviders();
```

## Return Value

`Promise<AuthProvidersResponse>`

```ts
interface AuthProvidersResponse {
  /** List of available OAuth providers */
  providers: OAuthProviderInfo[];
  /** Whether OTP (email) authentication is enabled */
  otpEnabled: boolean;
}

interface OAuthProviderInfo {
  /** Provider type: 'google' | 'github' | 'microsoft' | 'apple' | 'custom-oauth2' */
  type: string;
  /** Provider identifier used in login calls */
  name: string;
  /** Human-readable display name */
  displayName: string;
  /** URL to provider icon */
  iconUrl?: string;
  /** OAuth scopes requested from the provider */
  scopes?: string[];
}
```

## Example

### Building a Custom Login UI

```tsx
import { useState, useEffect } from 'react';
import { db } from './db';

function LoginScreen() {
  const [providers, setProviders] = useState([]);
  const [otpEnabled, setOtpEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.cloud.getAuthProviders()
      .then(({ providers, otpEnabled }) => {
        setProviders(providers);
        setOtpEnabled(otpEnabled);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="login-screen">
      <h2>Sign In</h2>
      
      {/* OAuth Provider Buttons */}
      {providers.map(provider => (
        <button 
          key={provider.name}
          onClick={() => db.cloud.login({ provider: provider.name })}
          className="oauth-button"
        >
          {provider.iconUrl && (
            <img src={provider.iconUrl} alt="" width={20} height={20} />
          )}
          Continue with {provider.displayName}
        </button>
      ))}

      {/* Divider if both OAuth and OTP are available */}
      {providers.length > 0 && otpEnabled && (
        <div className="divider">or</div>
      )}

      {/* Email OTP Option */}
      {otpEnabled && (
        <button 
          onClick={() => db.cloud.login({ grant_type: 'otp' })}
          className="email-button"
        >
          Continue with Email
        </button>
      )}
    </div>
  );
}
```

### Checking Provider Availability

```ts
const authProviders = await db.cloud.getAuthProviders();

// Check if Google login is available
const hasGoogle = authProviders.providers.some(p => p.type === 'google');

// Check if any OAuth provider is available
const hasOAuth = authProviders.providers.length > 0;

// Check if OTP is the only option
const otpOnly = !hasOAuth && authProviders.otpEnabled;
```

## Remarks

- This method fetches provider information from the Dexie Cloud server
- If OAuth is disabled via `db.cloud.configure({ socialAuth: false })`, it returns an empty providers array without making a network request
- If the server doesn't support OAuth (older versions), it gracefully falls back to OTP-only
- The method handles network errors gracefully and falls back to OTP-only authentication

## See Also

- [db.cloud.login()](db.cloud.login())
- [Authentication](authentication#social-authentication-oauth)

---
layout: docs-dexie-cloud
title: 'Authentication in Dexie Cloud'
---

<div class="shoutouts" style="text-align: left; margin: 20px 0 35px 0;">
   <p>Zero config, registrationless, passwordless</p>
   <p>Social login with Google, GitHub, Microsoft, Apple</p>
   <p>Easy to replace with your own authentication</p>
   <p>Long-lived sessions & cryptographically protected tokens</p>
</div>
<hr/>

This page describes authentication in Dexie Cloud, including the default email OTP authentication, social login with OAuth providers, and how to replace authentication with your own solution. We also explain how access tokens are protected using the latest security standards in web browsers.

If you are new to Dexie Cloud, please visit the [Dexie Cloud landing page](/cloud/).

If you prefer to jump right in to samples, here some shortcuts:

- [Example zero config setup](#zero-config-setup)
- [Social Authentication (OAuth)](#social-authentication-oauth)
- [Example customizing login GUI](#customizing-login-gui)
- [Example auth integration](<db.cloud.configure()#example-integrate-custom-authentication>)
- [Customizing email templates](custom-emails)

## Introduction

Dexie Cloud is for writing offline capable applications, which means that the typical use case is long-lived authentication sessions that lasts for months or until the user actively logs out from it.

Dexie Cloud supports multiple authentication methods:

1. **Email OTP (One-Time Password)** - The default zero-config authentication
2. **Social/OAuth Authentication** - Login with Google, GitHub, Microsoft, Apple, or custom OAuth2 providers
3. **Custom Authentication** - Integrate your own authentication solution

In the default setup, users will only need to authenticate the very first time they visit your app. There is no registration step for your users and they won't need to create any password. The authentication step will result in a securely stored, non-exportable crypto key in IndexedDB that can reauthenticate future sync calls automatically without requiring further user interaction.

## Zero config setup

If you just enable dexie-cloud-addon the way it is explained on [the landing page](/cloud/) you will be using the default email OTP authentication and you will not need your own server endpoint. Your app can be hosted on any site, such as a static site on GitHub Pages or similar and yet be able to authenticate users and sync data with your cloud database.

## Social Authentication (OAuth)

Dexie Cloud supports social login through OAuth 2.0 / OpenID Connect providers. This allows your users to authenticate using their existing accounts from:

- **Google** - Login with Google accounts
- **GitHub** - Login with GitHub accounts
- **Microsoft** - Login with Microsoft/Azure AD accounts
- **Apple** - Login with Apple ID
- **Custom OAuth2** - Any OAuth 2.0 / OpenID Connect compliant provider (Okta, Auth0, Keycloak, etc.)

### How It Works

When using OAuth authentication, Dexie Cloud acts as an OAuth proxy between your application and the identity provider. This architecture provides several benefits:

1. **Simplified redirect URLs** - You only need to configure Dexie Cloud's callback URL with the provider, not every page in your app
2. **Enhanced security** - OAuth tokens from providers never reach your client; only Dexie Cloud tokens are issued
3. **PKCE support** - All OAuth flows use PKCE (Proof Key for Code Exchange) for enhanced security
4. **No dedicated callback route needed** - The dexie-cloud-addon handles the OAuth callback automatically

### Configuring OAuth Providers

OAuth providers are configured per-database through the [Dexie Cloud Manager](https://manager.dexie.cloud). Navigate to your database and find the **Authentication** section.

For each provider you want to enable:

1. **Create OAuth credentials** with the provider:
   - [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - [GitHub Developer Settings](https://github.com/settings/developers)
   - [Microsoft Azure Portal](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
   - [Apple Developer Portal](https://developer.apple.com/account/resources/identifiers/list/serviceId)

2. **Configure the redirect URI** in your OAuth provider settings:
   ```
   https://<your-db-id>.dexie.cloud/oauth/callback/<provider>
   ```
   For example: `https://z0lesejpr.dexie.cloud/oauth/callback/google`

3. **Add the provider** in Dexie Cloud Manager with:
   - Client ID
   - Client Secret
   - Scopes (optional, defaults are provided)

### Custom OAuth2 Providers

For enterprise SSO or custom identity providers, you can configure a custom OAuth2 provider:

| Setting | Description |
|---------|-------------|
| Name | A unique identifier for the provider (e.g., `okta`, `auth0`) |
| Display Name | User-friendly name shown in login UI |
| Client ID | OAuth client ID from your provider |
| Client Secret | OAuth client secret |
| Authorization Endpoint | URL for user authorization |
| Token Endpoint | URL for token exchange |
| User Info Endpoint | URL to fetch user profile |
| JWKS URI | (Optional) JSON Web Key Set URL for ID token verification |
| User ID Field | Field name for the user identifier (e.g., `sub`, `id`) |
| Use PKCE | Whether to use PKCE (recommended, default: true) |

### Using OAuth in Your Application

Once OAuth providers are configured, the default login GUI will automatically display them alongside email OTP. Users can choose their preferred login method.

#### Programmatic OAuth Login

You can initiate OAuth login programmatically using `db.cloud.login()` with a provider hint:

```js
// Initiate OAuth login with Google
await db.cloud.login({ provider: 'google' });
```

This will redirect the user to the OAuth provider's login page. After successful authentication, the user is automatically redirected back to your app and logged in.

Available built-in providers: `google`, `github`, `microsoft`, `apple`

For custom OAuth2 providers, use the provider name you configured (e.g., `okta`, `auth0`).

##### Login Options

| Option | Type | Description |
|--------|------|-------------|
| `provider` | string | OAuth provider name to initiate OAuth flow |
| `email` | string | Pre-fill email for OTP authentication |
| `grant_type` | `'otp'` \| `'demo'` | Force specific authentication type |
| `redirectPath` | string | Custom redirect path after OAuth (relative or absolute URL) |

```js
// Login with Microsoft and redirect to a specific page after auth
await db.cloud.login({ 
  provider: 'microsoft',
  redirectPath: '/dashboard'
});

// Force OTP login even if OAuth providers are available
await db.cloud.login({ grant_type: 'otp' });

// Pre-fill email for OTP login
await db.cloud.login({ email: 'user@example.com' });
```

#### Fetching Available Providers

Use `db.cloud.getAuthProviders()` to fetch the list of enabled authentication methods:

```js
const { providers, otpEnabled } = await db.cloud.getAuthProviders();

// providers: Array of available OAuth providers
// [{ type: 'google', name: 'google', displayName: 'Google', iconUrl: '...' }, ...]

// otpEnabled: boolean indicating if email OTP is available
```

This is useful for building custom login UIs that show provider-specific buttons:

```tsx
function LoginButtons() {
  const [providers, setProviders] = useState([]);
  const [otpEnabled, setOtpEnabled] = useState(true);

  useEffect(() => {
    db.cloud.getAuthProviders().then(({ providers, otpEnabled }) => {
      setProviders(providers);
      setOtpEnabled(otpEnabled);
    });
  }, []);

  return (
    <div>
      {providers.map(provider => (
        <button 
          key={provider.name}
          onClick={() => db.cloud.login({ provider: provider.name })}
        >
          <img src={provider.iconUrl} alt="" />
          Sign in with {provider.displayName}
        </button>
      ))}
      {otpEnabled && (
        <button onClick={() => db.cloud.login({ grant_type: 'otp' })}>
          Sign in with Email
        </button>
      )}
    </div>
  );
}
```

### Capacitor / Native Apps

For Capacitor or native mobile apps, use a custom URL scheme for the redirect:

```js
// Open OAuth login with custom scheme redirect
await db.cloud.login({ 
  provider: 'google',
  redirectPath: 'myapp://'
});
```

Register a deep link handler to complete the login:

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

### User Identity with OAuth

By default, Dexie Cloud uses the user's verified email address as the user ID (the `sub` claim in tokens). This ensures consistent identity across different authentication methods—a user who logs in with Google and later with email OTP will be recognized as the same user if they share the same email.

For enhanced privacy, you can configure your database to use opaque user IDs instead. In this mode, the email is hashed to produce a non-reversible identifier. Configure this in Dexie Cloud Manager under Authentication Settings.

## Customizing login GUI

If nothing is configured, dexie-cloud-addon will provide a default login GUI when a login is required. If you don't need to replace the default OTP authentication but still need to control the GUI of the default OTP solution, it can be customized by as follows:

1. Configure it to disable built-in GUI: `db.cloud.configure({customLoginGui: true})`
2. Observe `db.cloud.userInteraction` somewhere the root component of your app so that it is always listened to. Whenever this observable emits something else than undefined, show a dialog that corresponds to what it requests.

Here's an example based on dexie-cloud-addon@4.0.1 or later.

```tsx
import { useState } from 'react'
import { useObservable } from 'dexie-react-hooks'
import { db } from './db' // A module that exports the Dexie instance with dexie-cloud-addon attached.
import {
  resolveText,
  DXCInputField,
  DXCUserInteraction,
  DXCOption,
} from 'dexie-cloud-addon'
import styled from 'styled-components'

/** Example login dialog
 *
 * This component showcases how to provide a custom login GUI for login dialog.
 * The principle is simple:
 *   * We use useObservable() to observe `db.cloud.userInteraction` into local variable ui.
 *   * If it is undefined, the system does not need to show any dialog (which is the most common case)
 *   * Else if ui is truthy, it will have the following properties:
 *     * ui.type = type of dialog ('email', 'otp', 'message-alert' or 'logout-confirmation')
 *     * ui.title = the suggested title of the dialog. You can use it or use your own based on ui.type.
 *     * ui.alerts = array of alerts (warnings, errors or information messages to show to user). This array
 *       may be present in any type of dialog.
 *     * ui.fields = input fields to collect from user. This is an object where key is the field name and
 *       value is a field description (DXCInputField)
 *     * ui.options = optional array of selectable options (e.g., OAuth providers). Each option has:
 *       - name: field name for the result
 *       - value: value to return when selected
 *       - displayName: human-readable label
 *       - iconUrl: optional URL to an icon image
 *       - styleHint: optional hint like 'google', 'github', 'microsoft', 'apple', 'otp'
 *     * ui.submitLabel = A suggested text for the submit / OK button
 *     * ui.cancelLabel = undefined if no cancel button is appropriate, or a suggested text for the cancel button.
 *     * ui.onSubmit = callback to call when fields have been collected from user OR when an option is selected.
 *       Accepts an object where key is the field/option name and value is the collected/selected value.
 *     * ui.onCancel = callback to call if user clicks cancel button.
 */
export function MyLoginGUI() {
  const ui = useObservable(db.cloud.userInteraction)
  if (!ui) return null // No user interaction is requested.
  return <MyLoginDialog ui={ui} />
}

export function MyLoginDialog({ ui }: { ui: DXCUserInteraction }) {
  const [params, setParams] = useState<{ [param: string]: string }>({})

  const fieldEntries = Object.entries(ui.fields || {}) as [string, DXCInputField][]
  const hasFields = fieldEntries.length > 0
  const hasOptions = ui.options && ui.options.length > 0

  // Handler for option clicks - calls onSubmit with { [option.name]: option.value }
  const handleOptionClick = (option: DXCOption) => {
    ui.onSubmit({ [option.name]: option.value })
  }

  return (
    <MyDialogStyling>
      <div className="fullscreen darken" />
      <div className="fullscreen dlg-outer">
        <div className="dlg-inner">
          <h2>My Custom Login Prompt</h2>
          <h3>{ui.title}</h3>
          {ui.alerts?.map((alert, i) => (
            <p key={i} className={`alert-${alert.type}`}>
              {resolveText(alert)}
            </p>
          ))}

          {/* Render OAuth provider options if present */}
          {hasOptions && (
            <div className="options-container">
              {ui.options!.map((option) => (
                <button
                  key={`${option.name}-${option.value}`}
                  type="button"
                  className={`option-btn ${option.styleHint ? `option-${option.styleHint}` : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.iconUrl && (
                    <img src={option.iconUrl} alt="" className="option-icon" />
                  )}
                  <span>{option.displayName}</span>
                </button>
              ))}
            </div>
          )}

          {/* Show divider if we have both options and fields */}
          {hasOptions && hasFields && (
            <div className="divider">
              <span>or</span>
            </div>
          )}

          {/* Render form fields if present */}
          {hasFields && (
            <form
              onSubmit={(ev) => {
                ev.preventDefault()
                ui.onSubmit(params)
              }}
            >
              {fieldEntries.map(
                ([fieldName, { type, label, placeholder }], idx) => (
                  <label key={idx}>
                    {label ? `${label}: ` : ''}
                    <input
                      type={type}
                      name={fieldName}
                      autoFocus={idx === 0}
                      placeholder={placeholder}
                      value={params[fieldName] || ''}
                      onChange={(ev) => {
                        const value = ev.target.value
                        setParams({
                          ...params,
                          [fieldName]: value,
                        })
                      }}
                    />
                  </label>
                )
              )}
              <div className="dxc-buttons">
                <button type="submit">{ui.submitLabel}</button>
                {ui.cancelLabel && (
                  <button type="button" onClick={ui.onCancel}>
                    {ui.cancelLabel}
                  </button>
                )}
              </div>
            </form>
          )}

          {/* If no fields, just show cancel button */}
          {!hasFields && ui.cancelLabel && (
            <div className="dxc-buttons">
              <button type="button" onClick={ui.onCancel}>
                {ui.cancelLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </MyDialogStyling>
  )
}

// Dialog styling
const MyDialogStyling = styled.div`
  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .darken {
    opacity: 0.5;
    background-color: #000;
    z-index: 150;
    backdrop-filter: blur(2px);
    webkit-backdrop-filter: blur(2px);
  }
  .dlg-outer {
    z-index: 150;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .dlg-inner {
    position: relative;
    color: #222;
    background-color: #fff;
    padding: 30px;
    margin-bottom: 2em;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    border: 3px solid #3d3d5d;
    border-radius: 8px;
    box-shadow: 0 0 80px 10px #666;
    width: auto;
    font-family: sans-serif;
  }
  .options-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 16px;
  }
  .option-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  .option-btn:hover {
    background-color: #f5f5f5;
  }
  .option-icon {
    width: 20px;
    height: 20px;
  }
  .option-google { border-color: #4285f4; }
  .option-github { border-color: #333; }
  .option-microsoft { border-color: #00a4ef; }
  .option-apple { border-color: #000; }
  .divider {
    display: flex;
    align-items: center;
    margin: 16px 0;
  }
  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
  .divider span {
    padding: 0 12px;
    color: #888;
    font-size: 14px;
  }
  .dlg-input {
    height: 35px;
    width: 17em;
    border-color: #ccf4;
    outline: none;
    font-size: 17pt;
    padding: 8px;
  }
  .alert-error {
    color: red;
    font-weight: bold;
  }
  .alert-warning {
    color: #f80;
    font-weight: bold;
  }
  .alert-info {
    color: black;
  }
`
```

## Default Authentication from a user's perspective

1. User goes to your webapp the very first time (as authentication lasts for months by default)
2. User is prompted for email address.
3. User get an email containing a one-time password such as `ABC123`.
4. User enters the OTP.
5. User is in.

After this initial step, user does not need to reauthenticate for months unless he or she actively logs out from your app. The long session timeout is designed for typical offline-first applications that require this.

## Encrypting your offline data

For more sensitive applications, instead of limiting the session timeout (which by design should be long for offline first apps), your app could choose to encrypt sensitive data and require a password from your user for decryption. There are two dexie compatible open source libraries that adds encryption to Dexie: [dexie-encrypted](https://github.com/mark43/dexie-encrypted) with the steps described in [this issue comment](https://github.com/dexie/Dexie.js/issues/1604#issuecomment-1237065115) and [dexie-easy-encrypt](https://github.com/jaetask/dexie-easy-encrypt). By encrypting the sensisitve parts of the offline data you protect the data much better than short session timeouts, that would require resync more often.

Dexie Cloud will focus on making encryption easier to integrate going forward, with built-in support for local offline authentication, but if you need a working solution today, I would recommend the solution with dexie-encrypted as described above and provide some custom way of deriving an encryption key from a user password or similar. If you could wait with encryption until we have a more integrated solution, that might be even better as your encrypted data might need to be migrated if you later on decide to switch encryption solution.

## Replace authentication with custom authentication

The transport security will still be the same if you replace the default authentication - tokens will still be protected by CryptoKeys. The difference is only how the authentication takes place - the step that is required for Dexie Cloud to negotiate the token flow.

To replace authentication, see [the following sample](<db.cloud.configure()#example-integrate-custom-authentication>).

## Tokens

Every Dexie Cloud Database has a token endpoint that gives out tokens for client applications. A successful authentication will result in a new token returned. Dexie Cloud also gives out refresh tokens. Refresh tokens are accompanied with an RSA keypair stored on the client. The private key is protected from being
copied - stored as a CryptoKey instance in IndexedDB. Dexie cloud will only accept refresh tokens if they
are accompanied with a valid signature from the client's private key - a signature of the refresh token
content concatenated with current timestamp.

No matter if you have integrated your own authentication system, or use the built-in OTP authentication, security tokens will be generated by Dexie Cloud and their refresh tokens will be securely protected on the client by the RSA keypair. This is important as the refresh token is long-lived and must not be possible
to copy over to another device.

### The secure flow of retrieving and storing tokens

1. Client generates a new local non-exportable RSA keypair and stores it in IndexedDB.
2. Client request token from Dexie Cloud (using OTP auth OR via server-to-server requests (custom auth)). The token request is accompanied with the public key from the local keypair.
3. Server generates a short-lived access token and a long lived refresh token.

### The secure flow of refreshing tokens

1. Client requests a new access token from Dexie Cloud by sending the refresh token together with the current timestamp + signature of (refresh token + current timestamp).
2. Server verifies that signature is valid and that the timestamp is within current time +/- a margin for clock differences.
3. Server generates new access token from the claims in the refresh token.

### 3 ways of obtaining the tokens

Every Dexie Cloud database URL has a token endpoint that can give out tokens for a client. In order to do so, it will either require an authorization code from a successful authorization flow, OR a signed refresh-token, or accept a client_id and client_secret together with the email and name claims. The latter way is the way to use when you want to integrate an existing authentication solution to be able to authenticate users to use Dexie Cloud.

#### Default OTP Autentication

When the Dexie Cloud server endpoint verifies the user's email itself, you will not need a server for your own app - it is enough that the client talks directly to the Dexie Cloud server endpoint in order to establish a secure OTP flow and get the security token from it.

#### Custom Authentication

When you have an existing authentication solution using a server-side framework and programming language of your own choice, and you want to integrate that solution to authenticate users for your Dexie Cloud application, you will need to write a new endpoint into your existing server-side authentication server that, using your client_id and client_secret can request token from Dexie Cloud for the user you have already authenticated.

See [Example auth integration](<db.cloud.configure()#example-integrate-custom-authentication>).

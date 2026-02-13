---
layout: docs-dexie-cloud
title: "Add public data"
---

The public realm (`rlm-public`) is a special realm that makes data visible to all users of your database. This is useful for shared reference data like product catalogs, configuration, or any data that should be readable by everyone.

## Important: Public Realm Requires CLI or REST API

**The public realm can only be modified via the [CLI](cli) or [REST API](rest-api)** — not from a web client using sync.

This is because modifying `rlm-public` requires the `GLOBAL_WRITE` scope, which is not granted to normal user tokens. This design ensures that public data is managed by administrators rather than end users.

To add or update public data, use one of these methods:
- **CLI**: `npx dexie-cloud import` (shown below)
- **REST API**: Use server-to-server calls with an API token that has `GLOBAL_WRITE` scope

## Adding Public Data via CLI

Use the [dexie-cloud CLI](cli) to import data into the public realm as follows:

1. Use [npx dexie-cloud databases](cli#databases) to verify you are connected to the correct DB. If not, use [npx dexie-cloud connect](cli#connect) to connect to it. If you have no DB, use [npx dexie-cloud create](cli#create) to create one.
2. Create a JSON file (let's name it "publicData.json"):
    ```
    {
      "data": {
        "rlm-public": {
          "products": {
            "prd1": {
              "price": 60,
              "title": "Black T-shirt, size M",
              "description": "A nice black T-shirt (medium)"
            },
            "prd2": {
              "price": 70,
              "title": "Blue Jeans",
              "description": "Plain blue jeans"
            }
          }
        }
      }
    }
    ```
3. Import the file
    ```
    npx dexie-cloud import publicData.json
    ```


## List current public data

1. `npx dexie-cloud export --data --realmId rlm-public existingData.json`
2. `more existingData.json`

## How to delete, update or manage data using the CLI

See [cli#import](cli#import)

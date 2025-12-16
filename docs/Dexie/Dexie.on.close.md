---
layout: docs
title: 'Dexie.on.close'
---

### Syntax

```javascript
db.on("close", () => console.log("db was closed"));
```

### Description

The "close" event occurs if database is forcibly closed from external action. From dexie@4.1.0, this event is also fired as a CustomEvent when db.close() is called explicitely or implicitely and not just when forcibly closed from outside.

See corresponding docs on MDN: https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/close_event

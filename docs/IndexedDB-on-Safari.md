---
layout: docs
title: 'IndexedDB on Safari'
---

## Safari versions below 8

* No support for indexedDB
* There's a shim that builds indexedDB support on top of WebSQL: [IndexedDBShim](https://github.com/axemclion/IndexedDBShim).

## Safari version 8.x

* Native support for indexedDB but has lots of [issues](http://www.raymondcamden.com/2014/09/25/IndexedDB-on-iOS-8-Broken-Bad):
  1. Transactions can only target a single object store at a time.
  2. Primary keys must be unique **across** different objects stores.
  3. Compound indexes or primary keys are not supported.
  4. [MultiEntry](/docs/MultiEntry-Index) indexes not supported.

## Safari version >= 10.1

Native support for IndexedDB 2.0. Lots of issues solved and performance boosted. 

A list of Safari related issues that has been reported can be found [here](safari-issues.md)

## Safari version >= 14

Fast and stable IndexedDB support. A few race condition issues that Dexie can workaround. For the most stable Safari support, use Dexie 4 (`npm install dexie@latest`).
It works around the most major Safari issue and it continuously runs its unit tests on Safari browsers in Lambdatest for every commit.

## Safari version 15, 16, 17, 18

Fast and performant IndexedDB support, but some instability issues when tabs wakes up from backround (See Dexie issue [#2008](https://github.com/dexie/Dexie.js/issues/2008))

## Modern Safari (version >= 26)

Support for most IndexedDB 3.0 features except getAllRecords() and reverse ordered getAllKeys() but dexie works around the lacking IndexedDB support. Some of the severe instability issues has been solved in Mars 2026 (https://bugs.webkit.org/show_bug.cgi?id=309386).

## Chrome and Opera on IOS

Due to Apples restricted policies for iOS, Chrome and Opera running on iOS is actually a Safari browser in the backend pretending to be Chrome or Opera. Thus, it's IndexedDB is actually provided by Safari even on Chrome, Opera or Firefox, see [issue #110](https://github.com/dexie/Dexie.js/issues/110).


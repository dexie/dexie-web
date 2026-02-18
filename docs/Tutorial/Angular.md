---
layout: docs
title: 'Get started with Dexie in Angular'
---
{% raw %}

<div style="opacity: 0.8; padding: 40px 0 40px 0">
  <img src="/assets/images/angular.svg" style="width:50px;margin: 0 10px 0 0">
  <span>+</span>
  <img src="/assets/images/logo-dexie-black.svg" style="width: 200px;">    
</div>

# 1. Create an Angular project

Here we refer to Angular's own [Getting Started](https://angular.dev/installation) page.

<br/>

# 2. Install dexie

```bash
npm install dexie
```

# 3. Create a file `db.ts`

Applications typically have one single Dexie instance declared as its own module. This is where you declare which tables you need and how each table shall be indexed. A Dexie instance is a singleton throughout the application - you do not need to create it on demand. Export the resulting `db` instance from your module so that you can use it from your services to write or query data.

Using Dexie's [EntityTable](/docs/EntityTable) type gives you a clean, typed interface for your tables.

```ts
// db.ts
import Dexie, { type EntityTable } from 'dexie';

export interface TodoList {
  id: number;
  title: string;
}

export interface TodoItem {
  id: number;
  todoListId: number;
  title: string;
  done: boolean;
}

const db = new Dexie('AngularTodoApp') as Dexie & {
  todoLists: EntityTable<TodoList, 'id'>;
  todoItems: EntityTable<TodoItem, 'id'>;
};

db.version(1).stores({
  todoLists: '++id',
  todoItems: '++id, todoListId',
});

// Populate with sample data on first run
db.on('populate', async () => {
  const todoListId = await db.todoLists.add({
    title: 'To Do Today',
  });
  await db.todoItems.bulkAdd([
    { todoListId, title: 'Feed the birds', done: false },
    { todoListId, title: 'Watch a movie', done: false },
    { todoListId, title: 'Have some sleep', done: false },
  ]);
});

export { db };
```

# 4. Turn App into an Offline ToDo app

This example uses Angular 17+ features:
- **Standalone components** (no NgModule required)
- **Signals** with `toSignal()` for reactive data
- **New control flow** syntax (`@for`, `@if`, `@empty`)
- **Signal inputs** with `input.required<T>()`

For older Angular versions (< 17), see the [legacy example](#legacy-angular-example) below.

```ts
// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { liveQuery } from 'dexie';
import { db, TodoList } from './db';
import { ItemListComponent } from './item-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ItemListComponent],
  template: `
    <main>
      <h1>Dexie.js + Angular Todo App</h1>

      @for (list of todoLists(); track list.id) {
        <app-item-list [todoList]="list" />
      }

      <form (ngSubmit)="addNewList()">
        <input
          type="text"
          [(ngModel)]="newListName"
          name="listName"
          placeholder="New list name..."
        />
        <button type="submit">Add List</button>
      </form>
    </main>
  `,
})
export class AppComponent {
  newListName = '';

  // Convert Dexie's liveQuery observable to Angular signal
  todoLists = toSignal(
    from(liveQuery(() => db.todoLists.toArray())),
    { initialValue: [] as TodoList[] }
  );

  async addNewList() {
    if (!this.newListName.trim()) return;
    await db.todoLists.add({ title: this.newListName });
    this.newListName = '';
  }
}
```

# 5. Add the ItemList component

```ts
// item-list.component.ts
import { Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { liveQuery } from 'dexie';
import { db, TodoItem, TodoList } from './db';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="todo-list">
      <h2>{{ todoList().title }}</h2>

      <ul>
        @for (item of items(); track item.id) {
          <li [class.done]="item.done">
            <label>
              <input
                type="checkbox"
                [checked]="item.done"
                (change)="toggleItem(item)"
              />
              {{ item.title }}
            </label>
            <button (click)="deleteItem(item.id)">×</button>
          </li>
        } @empty {
          <li class="empty">No items yet</li>
        }
      </ul>

      <form (ngSubmit)="addItem()">
        <input
          type="text"
          [(ngModel)]="newItemTitle"
          name="itemTitle"
          placeholder="Add new item..."
        />
        <button type="submit">Add</button>
      </form>
    </section>
  `,
})
export class ItemListComponent {
  // Signal input (Angular 17+)
  todoList = input.required<TodoList>();

  newItemTitle = '';

  // Computed signal for the list ID
  private todoListId = computed(() => this.todoList().id);

  // LiveQuery as signal - automatically updates when data changes
  items = toSignal(
    from(liveQuery(() => 
      db.todoItems.where({ todoListId: this.todoList().id }).toArray()
    )),
    { initialValue: [] as TodoItem[] }
  );

  async addItem() {
    if (!this.newItemTitle.trim()) return;
    await db.todoItems.add({
      todoListId: this.todoListId(),
      title: this.newItemTitle,
      done: false,
    });
    this.newItemTitle = '';
  }

  async toggleItem(item: TodoItem) {
    await db.todoItems.update(item.id, { done: !item.done });
  }

  async deleteItem(id: number) {
    await db.todoItems.delete(id);
  }
}
```

# 6. Bootstrap the application

```ts
// main.ts
import 'zone.js';  // Required for Angular change detection
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

## How liveQuery works with Angular Signals

The key pattern is converting Dexie's `liveQuery()` observable to an Angular signal using `toSignal()`:

```ts
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { liveQuery } from 'dexie';

// In your component:
items = toSignal(
  from(liveQuery(() => db.todoItems.toArray())),
  { initialValue: [] }
);
```

This gives you:
- **Automatic updates** when database changes
- **Zone.js integration** for change detection
- **Signal-based reactivity** for optimal performance

[View the full sample on GitHub](https://github.com/dexie/Dexie.js/tree/master/samples/angular)

---

## Legacy Angular Example

For Angular versions before 17, you can use the traditional approach with NgModule and the async pipe:

<details>
<summary>Click to expand legacy example</summary>

### db.ts (same as above)

### app.component.ts

```ts
import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, TodoList } from './db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  todoLists$ = liveQuery(() => db.todoLists.toArray());
  listName = 'My new list';

  async addNewList() {
    await db.todoLists.add({ title: this.listName });
  }

  identifyList(index: number, list: TodoList) {
    return `${list.id}${list.title}`;
  }
}
```

### app.component.html

```html
<h1>Todo App</h1>

<div *ngFor="let todoList of todoLists$ | async; trackBy: identifyList">
  <app-itemlist [todoList]="todoList"></app-itemlist>
</div>

<label>
  Add new list:
  <input [(ngModel)]="listName" />
</label>
<button (click)="addNewList()">Add new list</button>
```

### app.module.ts

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ItemListComponent } from './itemlist.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ItemListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

</details>

{% endraw %}

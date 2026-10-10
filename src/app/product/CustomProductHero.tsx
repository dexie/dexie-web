"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import TypeWriter from "@/components/content/shared/TypeWriter";
import CodeBlock from "@/components/content/shared/CodeBlock";

// Framework examples showcasing Dexie.js support
const frameworkExamples = [
  {
    id: "react",
    name: "React",
    logo: "/assets/images/icons/react-svgrepo-com.svg",
    code: `import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

export function TaskList() {
  const tasks = useLiveQuery(
    () => db.tasks.orderBy("created").toArray()
  );

  return (
    <ul>
      {tasks?.map(task => 
        <li key={task.id}>{task.title}</li>
      )}
    </ul>
  );
}`,
    description: "Perfect integration with React hooks and state management",
  },
  {
    id: "vue",
    name: "Vue",
    logo: "/assets/images/icons/vue-svgrepo-com.svg",
    zoom: 0.85,
    code: `<template>
  <div>
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "./db";

export default {
  setup() {
    return {
      tasks: useObservable(
        liveQuery(() => db.tasks.orderBy("created").toArray())
      )
    };
  }
};
</script>`,
    description: "Reactive data binding with Vue's composition API",
  },
  {
    id: "svelte",
    name: "Svelte",
    logo: "/assets/images/icons/svelte-svgrepo-com.svg",
    code: `<script>
  import { liveQuery } from "dexie";
  import { db } from "./db";
  
  let tasks = liveQuery(
    () => db.tasks.orderBy("created").toArray()
  );
</script>

<div>
  <h2>Tasks</h2>
  <ul>
    {#each ($tasks || []) as task (task.id)}
      <li>{task.title}</li>
    {/each}
  </ul>
</div>`,
    description: "Effortless reactivity with Svelte's reactive statements",
  },
  {
    id: "angular",
    name: "Angular",
    logo: "/assets/images/icons/angular-svgrepo-com.svg",
    zoom: 0.9,
    code: `import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from './db';

@Component({
  selector: 'task-list',
  template: \`
    <h2>Tasks</h2>
    <ul>
      <li *ngFor="let task of tasks$ | async">
        {{ task.title }}
      </li>
    </ul>
  \`
})
export class TaskListComponent {
  tasks$ = liveQuery(() => listTasks());
}

async function listTasks() {
  return await db.tasks.orderBy("created").toArray();
}`,
    description:
      "Seamless integration with Angular's reactive forms and observables",
  },
  {
    id: "vanilla",
    name: "Vanilla JS",
    logo: "/assets/images/icons/javascript-svgrepo-com.svg",
    code: `import { liveQuery } from "dexie";
import { db } from "./db";

// Subscribe to live updates
const subscription = liveQuery(
  () => db.tasks.orderBy("created").toArray()
).subscribe(tasks => {
  // Update DOM when data changes
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = tasks
    .map(task => \`<li>\${task.title}</li>\`)
    .join('');
});

// Clean up when done
// subscription.unsubscribe();`,
    description:
      "Pure JavaScript with reactive queries - no framework required",
  },
  {
    id: "sync",
    name: "Dexie Cloud",
    logo: "/assets/favicon/favicon-white.svg",
    zoom: 0.85,
    commandLineCode: `npx dexie-cloud create
npx dexie-cloud whitelist http://localhost:3000
npm install dexie
npm install dexie-cloud-addon`,
    code: `import { Dexie } from "dexie";
import dexieCloud from "dexie-cloud-addon";

const db = new Dexie('SyncedTasks', {addons: [dexieCloud]});

db.version(1).stores({
  tasks: '@id, title, created' // '@' = auto-generated global ID
});

// Connect your dexie-cloud database:
db.cloud.configure({
  databaseUrl: "https://<yourdatabase>.dexie.cloud",
  requireAuth: true // optional
});

// Now your tasks sync automatically!
await db.tasks.add({
  title: "Synced task",
  created: new Date()
});`,
    description:
      "Real-time sync and collaboration - start local, add sync when ready",
  },
];

// Styled components for the new hero
const CustomHeroSection = styled(Box)(({ theme }) => ({
  background: 'url("/assets/images/dexie-bg.jpg") center/cover no-repeat',
  color: "white",
  ...theme.applyStyles("light", {
    color: "var(--dexie-text)",
  }),
  padding: theme.spacing(6, 0),
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  minHeight: "100vh",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 0),
    height: "90vh",
    minHeight: "auto",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, var(--dexie-surface-deep) 0%, var(--dexie-surface-deep) 100%)",
    opacity: 0.9,
    zIndex: 1,
  },
  "> *": {
    position: "relative",
    zIndex: 2,
  },
}));

const FrameworkCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 0.5),
  margin: 0,
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: theme.spacing(1),
  cursor: "pointer",
  transition: "all 0.3s ease",
  minWidth: 50,
  flexShrink: 0,
  textAlign: "center",
  "&:hover, &.active": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: theme.palette.primary.light,
    boxShadow: `0 8px 24px rgba(0, 0, 0, 0.3)`,
  },
  ...theme.applyStyles("light", {
    backgroundColor: "rgba(17, 18, 20, 0.03)",
    border: "1px solid rgba(17, 18, 20, 0.1)",
    "&:hover, &.active": {
      backgroundColor: "rgba(17, 18, 20, 0.06)",
      borderColor: theme.palette.primary.main,
      boxShadow: `0 8px 24px rgba(0, 0, 0, 0.12)`,
    },
  }),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    minWidth: 80,
    borderRadius: theme.spacing(2),
  },
}));

export default function CustomProductHero() {
  const [selectedFramework, setSelectedFramework] = useState("react");
  const currentExample = frameworkExamples.find(
    (f) => f.id === selectedFramework,
  );

  return (
    <CustomHeroSection>
      <Box
        sx={{
          maxWidth: {
            xs: "100%",
            sm: "1400px",
          },
          margin: "0 auto",
          px: { xs: 2, md: 3 },
          py: { xs: 8, md: 18 },
          paddingTop: { xs: 12, md: 18 }, // Extra top padding on mobile for header
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 6 },
          alignItems: { xs: "center", md: "flex-start" },
          minHeight: { xs: "100vh", md: "auto" },
        }}
      >
        {/* Left side - Hero text */}
        <Box
          sx={{
            flex: 1,
            maxWidth: { xs: "100%", md: "50%" },
            textAlign: { xs: "center", md: "left" },
            width: "100%",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 500,
              fontSize: { xs: "8vw", sm: "2.5rem", md: "60px" },
              lineHeight: { xs: 1.2, md: "72px" },
              mb: 3,
            }}
          >
            The smarter way to use
            <br />
            <TypeWriter
              colorClass=""
              strings={[
                "IndexedDB",
                "Browser Storage",
                "Local Databases",
                "Offline Data",
                "Sync & Collaboration",
                "Authentication",
              ]}
              breakRows={false}
            />
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              opacity: 0.9,
              mb: { xs: 3, md: 4 },
              lineHeight: 1.4,
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
            }}
          >
            Works with any JavaScript framework. Start local, add sync when
            ready. No complicated setup, no learning curve - just natural,
            intuitive code.
          </Typography>

          <Box sx={{ mb: { xs: 2, md: 4 } }} />

          {/* Framework logos */}
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              opacity: 0.8,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Works with your favorite framework:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              gap: { xs: 0.8, md: 1 },
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
              overflowX: { xs: "auto", md: "visible" },
              width: "100%",
              minWidth: 0,
              zoom: { xs: 0.6, md: 0.9 },
            }}
          >
            {frameworkExamples
              .filter((f) => f.id !== "sync")
              .map((framework) => (
                <FrameworkCard
                  key={framework.id}
                  className={selectedFramework === framework.id ? "active" : ""}
                  onClick={() => setSelectedFramework(framework.id)}
                >
                  <Box sx={{ mb: { xs: 0.5, md: 1 } }}>
                    <Image
                      src={framework.logo}
                      alt={framework.name}
                      width={24}
                      height={24}
                      style={{
                        width: "auto",
                        height: "auto",
                        maxWidth: "24px",
                        maxHeight: "24px",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "inherit",
                      fontWeight: 500,
                      fontSize: { xs: "0.6rem", md: "0.75rem" },
                      lineHeight: 1,
                    }}
                  >
                    {framework.name}
                  </Typography>
                </FrameworkCard>
              ))}

            {/* Progression indicator */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: { xs: 1, md: 2 },
                opacity: 0.6,
                flexShrink: 0,
              }}
            >
              <ArrowForwardIcon
                sx={{
                  fontSize: { xs: 16, md: 24 },
                  color: "inherit",
                }}
              />
            </Box>

            {/* Cloud functionality */}
            <Box>
              {frameworkExamples
                .filter((f) => f.id === "sync")
                .map((framework) => (
                  <FrameworkCard
                    key={framework.id}
                    className={
                      selectedFramework === framework.id ? "active" : ""
                    }
                    onClick={() => setSelectedFramework(framework.id)}
                  >
                    <Box sx={{ mb: { xs: 0.5, md: 1 } }}>
                      <Image
                        src={framework.logo}
                        alt={framework.name}
                        width={24}
                        height={24}
                        style={{
                          width: "auto",
                          height: "auto",
                          maxWidth: "24px",
                          maxHeight: "24px",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "inherit",
                        fontWeight: 500,
                        fontSize: { xs: "0.6rem", md: "0.75rem" },
                        lineHeight: 1,
                      }}
                    >
                      {framework.name}
                    </Typography>
                  </FrameworkCard>
                ))}
            </Box>
          </Box>
        </Box>

        {/* Right side - Code example */}
        <Box
          sx={{
            flex: 1,
            mt: { xs: 2, md: -5 },
            maxWidth: { xs: "100%", md: "50%" },
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: { xs: "static", md: "sticky" },
              top: 20,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Image
                src={currentExample?.logo || frameworkExamples[0].logo}
                alt={currentExample?.name || frameworkExamples[0].name}
                width={24}
                height={24}
                style={{ marginRight: 8 }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 0,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                {currentExample?.name} Example
              </Typography>
            </Box>

            <Box
              sx={{
                zoom: {
                  xs: currentExample?.zoom
                    ? currentExample?.zoom - 0.2
                    : 1 - 0.2,
                  sm: currentExample?.zoom ? currentExample?.zoom : 1,
                },
                "& .MuiBox-root": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
                overflowX: { xs: "auto", md: "hidden" },
              }}
            >
              {currentExample?.id === "sync" &&
                currentExample.commandLineCode && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <CodeBlock
                      language="bash"
                      showLineNumbers={false}
                      commandLine={true}
                      commandPrompt="~/web-app $"
                      code={currentExample.commandLineCode}
                    />
                    <CodeBlock
                      language="javascript"
                      showLineNumbers={true}
                      code={currentExample?.code || frameworkExamples[0].code}
                    />
                  </Box>
                )}
              {currentExample?.id !== "sync" && (
                <CodeBlock
                  language="javascript"
                  showLineNumbers={true}
                  code={currentExample?.code || frameworkExamples[0].code}
                />
              )}
            </Box>

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                opacity: 0.8,
                fontStyle: "italic",
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "0.85rem", md: "0.9rem" },
              }}
            >
              {currentExample?.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CustomHeroSection>
  );
}

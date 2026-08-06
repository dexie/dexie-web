"use client";

import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import CodeBlock from "@/components/content/shared/CodeBlock";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{
        maxWidth: { xs: "calc(100% - 32px)", md: "100%" }, // Prevent overflow due to padding
        overflowX: { xs: "auto", md: "hidden" },
      }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function HeroContent() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        zoom: "0.9 !important",
        // This panel always renders on its own fixed dark backdrop (matching
        // the Prism "material-dark" code theme) regardless of the site's
        // light/dark color mode, the same way GitHub/VS Code docs keep code
        // blocks dark-themed everywhere. This is especially important in
        // light mode, where the hero background is now a vibrant colorful
        // photo — syntax-highlighted code would be unreadable directly on
        // top of it without a solid container.
        backgroundColor: "#1a1a1a",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
        p: 2,
        "& .MuiBox-root": {
          p: "0px !important",
        },
      }}
    >
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            // .tpl-minimal-tabs styling
            display: "inline-block",
            fontSize: "15px",
            fontWeight: 500,
            textTransform: "uppercase",
            textAlign: "center",
            letterSpacing: "1px",
            border: "none",
            minHeight: "auto",
            mb: 2,
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTabs-flexContainer": {
              gap: "5px", // padding between tabs
            },
            "& .MuiTab-root": {
              // .tpl-minimal-tabs > li > a styling. Panel is always dark, so
              // inactive tab labels are a muted light gray (readable but
              // clearly lower-emphasis than the active tab).
              padding: "5px 20px !important",
              textDecoration: "none",
              color: "rgba(255, 255, 255, 0.55)",
              background: "none",
              border: "1px solid transparent",
              borderRadius: "100px !important",
              minWidth: "auto",
              minHeight: "auto",
              textTransform: "uppercase",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "1px",
              transition: "all 0.3s ease",

              // Hover state. This panel always renders on a fixed dark
              // background regardless of site color mode, so tab colors are
              // hardcoded light (NOT var(--dexie-bright), which flips to dark
              // in light mode and made the inactive tabs invisible).
              "&:hover": {
                background: "none",
                borderColor: "rgba(255, 255, 255, 0.5)",
                color: "#ffffff",
              },

              // Active/selected state
              "&.Mui-selected": {
                border: "1px solid rgba(255, 255, 255, 0.9) !important",
                background: "rgba(255, 255, 255, 0.08) !important",
                color: "#ffffff !important",
                cursor: "default",

                "&:hover": {
                  border: "1px solid rgba(255, 255, 255, 0.9) !important",
                  color: "#ffffff !important",
                },
              },
            },
          }}
        >
          <Tab label="Database" {...a11yProps(0)} />
          <Tab label="Query" {...a11yProps(1)} />
          <Tab label="liveQuery" {...a11yProps(2)} />
          <Tab label="Cloud" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CodeBlock
          language="js"
          showLineNumbers={true}
          highlightLines={[3, 6, 7, 8]}
          code={`import { Dexie } from "dexie";

const db = new Dexie('MyDatabase');

// Declare tables, IDs and indexes
db.version(1).stores({
  friends: '++id, name, age'
});`}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CodeBlock
          language="js"
          showLineNumbers={true}
          code={`// Find some old friends
const oldFriends = await db.friends
  .where('age').above(75)
  .toArray();

// or make a new one
await db.friends.add({
  name: 'Camilla',
  age: 25,
  street: 'East 13:th Street',
  picture: await getBlob('camilla.png')
});
`}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CodeBlock
          language="js"
          showLineNumbers={true}
          highlightLines={[2, 5, 6, 7, 8, 16, 17, 18, 19, 20]}
          code={`export function FriendList () {
  const friends = useLiveQuery(async () => {
    // Query the DB using our promise based API.
    // The end result will magically become observable.
    return await db.friends
    .where("age")
    .between(18, 65)
    .toArray();
  });

  return 
    <>
      <h2>Friends</h2>
      <ul>
        {
          friends?.map(friend =>
            <li key={friend.id}>
              {friend.name}, {friend.age}
            </li>
          )
        }
      </ul>
    </>;
}`}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
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
            code={`npx dexie-cloud create
npx dexie-cloud whitelist http://localhost:3000
npm install dexie
npm install dexie-cloud-addon`}
          />

          <CodeBlock
            language="js"
            showLineNumbers={true}
            code={`import { Dexie } from "dexie";
import dexieCloud from "dexie-cloud-addon";

const db = new Dexie('SyncedFriends', {addons: [dexieCloud]});

db.version(1).stores({
  friends: '@id, name, age' // '@' = auto-generated global ID
});

// Connect your dexie-cloud database:
db.cloud.configure({
  databaseUrl: "https://<yourdatabase>.dexie.cloud",
  requireAuth: true // optional
});`}
          />
        </Box>
      </TabPanel>
    </Box>
  );
}

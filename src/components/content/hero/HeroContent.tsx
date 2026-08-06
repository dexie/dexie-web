"use client"

import { Box, Tabs, Tab } from "@mui/material"
import { useState } from "react"
import CodeBlock from "@/components/content/shared/CodeBlock"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

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
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function HeroContent() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        width: "100%",
        zoom: "0.9 !important",
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
              // .tpl-minimal-tabs > li > a styling
              padding: "5px 20px !important",
              textDecoration: "none",
              color: "var(--dexie-bright)", // .light-content .tpl-minimal-tabs > li > a
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

              // Hover state
              "&:hover": {
                background: "none",
                borderColor: "rgba(255, 255, 255, 0.3)", // approximation of var(--color-dark-4)
                color: "var(--dexie-bright)",
              },

              // Active/selected state
              "&.Mui-selected": {
                border: "1px solid var(--dexie-bright) !important",
                background: "none !important",
                color: "var(--dexie-bright) !important",
                cursor: "default",

                "&:hover": {
                  border: "1px solid var(--dexie-bright) !important",
                  color: "var(--dexie-bright) !important",
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
  )
}

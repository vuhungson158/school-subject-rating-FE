import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

interface Props {
  tabList: {
    tabLabel: string;
    tabContent: JSX.Element;
  }[];
}
export const TabBox = ({ tabList }: Props) => {
  const [tabNumber, setTabNumber] = useState(0);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={tabNumber}
          onChange={(_, newValue) => setTabNumber(newValue)}>
          {tabList.map((tab, index) => (
            <Tab key={index} label={tab.tabLabel} value={index} />
          ))}
        </Tabs>
      </Box>
      <Box>
        {tabList.map((tab, index) => (
          <TabPanel key={index} value={tabNumber} index={index}>
            {tab.tabContent}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <Box role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </Box>
  );
};

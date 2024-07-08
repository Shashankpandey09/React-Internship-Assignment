import React, { useState } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Example department hierarchy
const departmentHierarchy = [
  {
    department: 'Customer Service',
    sub_departments: ['Support', 'Customer Success']
  },
  {
    department: 'Design',
    sub_departments: ['Graphic Design', 'Product Design', 'Web Design']
  }
];

const DepartmentList: React.FC = () => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleSelect = (name: string, sub: boolean = false) => {
    setSelected(prev => {
      const newSelected = { ...prev };
      newSelected[name] = !newSelected[name];
      return newSelected;
    });
  };

  return (
    <div>
      {departmentHierarchy.map((dept) => (
        <Accordion key={dept.department}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected[dept.department] || false}
                  onChange={() => handleSelect(dept.department)}
                />
              }
              label={<Typography variant="subtitle1">{dept.department}</Typography>}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Box ml={2}>
              {dept.sub_departments.map((subDept) => (
                <FormControlLabel
                  key={`${dept.department}-${subDept}`}
                  control={
                    <Checkbox
                      checked={selected[`${dept.department}-${subDept}`] || false}
                      onChange={() => handleSelect(`${dept.department}-${subDept}`, true)}
                    />
                  }
                  label={subDept}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DepartmentList;

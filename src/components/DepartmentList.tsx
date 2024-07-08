import React, { useState } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Hardcoded department hierarchy data
const departmentHierarchy = [
  {
    department: 'Customer Service',
    sub_departments: ['Support', 'Customer Success']
  },
  {
    department: 'Design',
    sub_departments: ['Graphic Design', 'Product Design', 'Web Design']
  },
  {
    department: 'Agriculture & Fishing',
    sub_departments: ['Crop Farming', 'Livestock Farming', 'Fishing']
  },
  {
    department: 'Business Services',
    sub_departments: ['Consulting', 'Legal Services', 'Marketing']
  },
  {
    department: 'Education',
    sub_departments: ['Primary Education', 'Secondary Education', 'Higher Education']
  },
  {
    department: 'Healthcare',
    sub_departments: ['Hospitals', 'Medical Clinics', 'Dental Services']
  },
  {
    department: 'Technology',
    sub_departments: ['Software Development', 'Information Technology', 'Electronics']
  },
  {
    department: 'Finance',
    sub_departments: ['Banking', 'Investment Management', 'Insurance']
  },
];

// TypeScript interfaces
interface DepartmentHierarchyItem {
  department: string;
  sub_departments: string[];
}

const DepartmentHierarchy: React.FC = () => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleSelect = (name: string, sub: boolean = false) => {
    if (!sub) {
      const allSubSelected = departmentHierarchy.find(d => d.department === name)?.sub_departments.every(sd => selected[`${name}-${sd}`]);
      setSelected(prev => {
        const newSelected = { ...prev, [name]: !allSubSelected };
        departmentHierarchy.find(d => d.department === name)?.sub_departments.forEach(sd => {
          newSelected[`${name}-${sd}`] = !allSubSelected;
        });
        return newSelected;
      });
    } else {
      setSelected(prev => {
        const newSelected = { ...prev, [name]: !prev[name] };
        const departmentName = name.split('-')[0];
        const allSubSelected = departmentHierarchy.find(d => d.department === departmentName)?.sub_departments.every(sd => newSelected[`${departmentName}-${sd}`]);
        newSelected[departmentName] = allSubSelected;
        return newSelected;
      });
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {departmentHierarchy.map((dept: DepartmentHierarchyItem) => (
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
              {dept.sub_departments.map((subDept: string) => (
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

export default DepartmentHierarchy;

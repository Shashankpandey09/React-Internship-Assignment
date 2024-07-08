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
    setSelected(prev => {
      const department = departmentHierarchy.find(d => d.department === (sub ? name.split('-')[0] : name));
      if (!department) return prev;
  
      const updatedSelected: Record<string, boolean> = {};
  
      if (!sub) {
        // Toggle main department selection
        const allSubSelected = department.sub_departments.every(sd => selected[`${name}-${sd}`]);
        updatedSelected[name] = !allSubSelected;
        department.sub_departments.forEach(sd => {
          updatedSelected[`${name}-${sd}`] = !allSubSelected;
        });
      } else {
        // Toggle sub-department selection
        updatedSelected[name] = !prev[name];
        const allSelected = department.sub_departments.every(sd => updatedSelected[`${department.department}-${sd}`]);
        updatedSelected[department.department] = allSelected;
      }
  
      return { ...prev, ...updatedSelected };
    });
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

import React, { useState } from 'react';
import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departments = [
  {
    name: "Department A",
    subDepartments: ["Sub A1", "Sub A2", "Sub A3"]
  },
  {
    name: "Department B",
    subDepartments: ["Sub B1", "Sub B2"]
  }
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleClick = (name: string) => {
    setOpen(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSelect = (name: string, sub: boolean = false) => {
    if (!sub) {
      const allSubSelected = departments.find(d => d.name === name)?.subDepartments.every(sd => selected[`${name}-${sd}`]);
      setSelected(prev => {
        const newSelected = { ...prev, [name]: !allSubSelected };
        departments.find(d => d.name === name)?.subDepartments.forEach(sd => {
          newSelected[`${name}-${sd}`] = !allSubSelected;
        });
        return newSelected;
      });
    } else {
      setSelected(prev => {
        const newSelected = { ...prev, [name]: !prev[name] };
        const departmentName = name.split('-')[0];
        const allSubSelected = departments.find(d => d.name === departmentName)?.subDepartments.every(sd => newSelected[`${departmentName}-${sd}`]);
        newSelected[departmentName] = allSubSelected;
        return newSelected;
      });
    }
  };

  return (
    <List>
      {departments.map((department) => (
        <div key={department.name}>
          <ListItem button onClick={() => handleClick(department.name)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected[department.name] || false}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': department.name }}
                onClick={(e) => { e.stopPropagation(); handleSelect(department.name); }}
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            {open[department.name] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[department.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((sub) => (
                <ListItem key={sub} button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected[`${department.name}-${sub}`] || false}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': sub }}
                      onClick={(e) => { e.stopPropagation(); handleSelect(`${department.name}-${sub}`, true); }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;

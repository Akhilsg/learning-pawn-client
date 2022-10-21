import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
} from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SimpleAccordion = ({ accordianTitle, accordianCaption, accordianSummary }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {accordianTitle}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{accordianCaption}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {accordianSummary}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SimpleAccordion;
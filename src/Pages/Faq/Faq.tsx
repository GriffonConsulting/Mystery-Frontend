import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import i18n from '../../i18n';
import { AxiosResponse } from 'axios';
import api from '../../__generated__/api';
import { GetFaqDto } from '../../__generated__/api-generated';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [faq, setFaq] = React.useState<GetFaqDto[]>([]);

  React.useEffect(() => {
    api.faq.getFaq(i18n.language).then((result: AxiosResponse) => setFaq(result.data.result));
  }, [i18n.language]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? [...expanded, panel] : expanded.filter(item => item !== panel));
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}>
        {i18n.t('faqTitle')}
      </Typography>
      <Box sx={{ width: '100%' }}>
        {faq.map((f, i) => (
          <Accordion key={f.question} expanded={expanded.includes(`panel${i}`)} onChange={handleChange(`panel${i}`)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
              <Typography component="span" variant="subtitle2">
                {f.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" gutterBottom sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                {f.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

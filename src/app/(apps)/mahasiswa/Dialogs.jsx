'use client'

// eslint-disable-next-line import/order
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from '@mui/material';

export default function Dialogs() {
  const countryList = [
    { label: 'Bahamas, The', value: 'bahamas' },
    { label: 'Bahrain', value: 'bahrain' },
    { label: 'Bangladesh', value: 'bangladesh' },
    { label: 'Barbados', value: 'barbados' },
    { label: 'Belarus', value: 'belarus' },
    { label: 'Belgium', value: 'belgium' },
    { label: 'Belize', value: 'belize' },
    { label: 'Benin', value: 'benin' },
    { label: 'Bhutan', value: 'bhutan' },
    { label: 'Bolivia', value: 'bolivia' },
    { label: 'Bosnia and Herzegovina', value: 'bosnia' },
    { label: 'Botswana', value: 'botswana' },
    { label: 'Brazil', value: 'brazil' },
    { label: 'Brunei', value: 'brunei' },
    { label: 'Bulgaria', value: 'bulgaria' },
    { label: 'Burkina Faso', value: 'burkina' },
  ];

  const [selectedCountry, setSelectedCountry] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleDialogClose = () => {
    setIsDialogVisible(false);
  };

  const handleSave = () => {
    // Save action logic here
    handleDialogClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setIsDialogVisible(true)}>
        Open Dialog
      </Button>

      <Dialog
        open={isDialogVisible}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <Card>
          <CardHeader title="Select Country" />
          <Divider />
          <CardContent>
            <RadioGroup
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {countryList.map((country) => (
                <FormControlLabel
                  key={country.value}
                  value={country.value}
                  control={<Radio color="primary" />}
                  label={country.label}
                />
              ))}
            </RadioGroup>
          </CardContent>
          <Divider />
          <CardActions>
            <Button color="secondary" onClick={handleDialogClose}>
              Close
            </Button>
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </div>
  );
}

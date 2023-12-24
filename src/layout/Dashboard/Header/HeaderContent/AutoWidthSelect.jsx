import React, { useState, useEffect, useContext } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import predConfig from './predConfig.json';
import { ConfigContext } from 'contexts/ConfigContext';

export default function AutoWidthSelect() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const { setToken, onChangeSetToken} = useContext(ConfigContext);
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedName, setSelectedName] = useState(''); 
  //const config = useContext(ConfigContext);
  

  useEffect(() => {
    //console.log(config);
    setCryptocurrencies(predConfig.cryptocurrencies);
    const defaultCryptocurrency = predConfig.cryptocurrencies.find(crypto => crypto.value === setToken);
    if (defaultCryptocurrency) {
      setSelectedToken(defaultCryptocurrency.value);
      setSelectedName(defaultCryptocurrency.name); 
    } else if (predConfig.cryptocurrencies.length > 0) {
      // If setToken is empty, set it to the first item in predConfig.cryptocurrencies
      onChangeSetToken(predConfig.cryptocurrencies[0].value);
      setSelectedToken(predConfig.cryptocurrencies[0].value);
      setSelectedName(predConfig.cryptocurrencies[0].name);
    }
  }, [setToken, onChangeSetToken]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedToken(selectedValue);
    onChangeSetToken(selectedValue);
    const selectedCryptocurrency = cryptocurrencies.find(crypto => crypto.value === selectedValue);
    if (selectedCryptocurrency) {
      setSelectedName(selectedCryptocurrency.name);
    }
  };


  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ minWidth: 100 }}>
        <InputLabel id="cryptocurrency-select-label">{selectedName}</InputLabel>
        {cryptocurrencies.length > 0 && (
          <Select
            labelId="cryptocurrency-select-label"
            id="cryptocurrency-select"
            value={selectedToken}
            onChange={handleChange}
            autoWidth
            label="Cryptocurrency"
          >
            {cryptocurrencies.map(crypto => (
              <MenuItem key={crypto.value} value={crypto.value}>{crypto.label}</MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </Box>
  );
}
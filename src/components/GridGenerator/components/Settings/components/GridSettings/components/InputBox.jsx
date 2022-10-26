import React, { useEffect, useState } from 'react';

import { Box, Slider, Typography, Grid, Input } from '@mui/material';

export default function InputBo({ icon, label, min, max, storeValue, handleValueChange, checkOutContainer }) {
    
    // State
    const [inputValue, setInputValue] = useState(storeValue);

    // Check if value is valid and set it
    useEffect(() => {
        if (checkOutContainer && checkOutContainer(inputValue)) {
            setInputValue(storeValue);
            console.log('error');
        } else {
            inputValue >= min && inputValue <= max && handleValueChange(inputValue);
        }
    }, [inputValue]);

    const handleSliderChange = (e) => setInputValue(e.target.value);

    const handleInputChange = (e) => setInputValue(parseInt(e.target.value));

    const handleBlur = (e) => {
        inputValue < min && setInputValue(min);
        inputValue > max && setInputValue(max);
    };

    return (
        <Box sx={{ width: 450 }}>
            <Typography gutterBottom>{label}</Typography>
            <Grid
                container
                spacing={2}
                alignItems='center'
            >
                <Grid item>{icon}</Grid>
                <Grid
                    item
                    xs
                >
                    <Slider
                        value={typeof inputValue === 'number' ? inputValue : 0}
                        onChange={handleSliderChange}
                        aria-labelledby={label}
                        min={min}
                        max={max}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        size='small'
                        sx={{
                            width: '50px',
                        }}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min,
                            max,
                            type: 'number',
                            'aria-labelledby': { label },
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

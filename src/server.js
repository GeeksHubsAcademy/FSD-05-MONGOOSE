// const express = require('express')
import express from 'express';
import 'dotenv/config';

const app = express()

const PORT = process.env.PORT || 5001

app.get('/healthy', (req, res) => {
  res.json(
    {
      success: true,
      message: "Server is healthy"
    }
  )
})

app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
})

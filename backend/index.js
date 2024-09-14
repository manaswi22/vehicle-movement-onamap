// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 5000;

// // Serve static files from the 'data' directory
// app.use('/api/vehicle', (req, res) => {
//   res.sendFile(path.join(__dirname, 'data', 'locations.json'));
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const vehicleRoute = require('./routes/vehicle');

const app = express();
app.use(cors());

// Use the vehicle route
app.use('/api/vehicle', vehicleRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const airbnbController = require('./airbnbController');
const router = express.Router();

router.get('/airbnbs', async (req, res) => {
    const airbnbs = await airbnbController.getAllAirbnbs();
    res.json(airbnbs);
});

router.get('/airbnbs/:id', async (req, res) => {
    const airbnb = await airbnbController.getAirbnbById(req.params.id);
    res.json(airbnb);
});

router.post('/airbnbs', async (req, res) => {
    const newAirbnb = await airbnbController.createAirbnb(req.body);
    res.json(newAirbnb);
});

router.put('/airbnbs/:id', async (req, res) => {
    const updatedAirbnb = await airbnbController.updateAirbnb(req.params.id, req.body);
    res.json(updatedAirbnb);
});

router.delete('/airbnbs/:id', async (req, res) => {
    await airbnbController.deleteAirbnbById(req.params.id);
    res.json({ message: 'Airbnb eliminado exitosamente' });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var Incident = require('../models/incidentModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Incident.find((err, incidents) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(200).json({ incidents: incidents });
  });
});

router.get('/find/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const incident = await Incident.findById(id);
    if (!incident) return next(new Error('Incident does not exist'));
    res.status(200).json({
        data: incident
    });
  } catch (error) {
      next(error)
  }
});

router.put('/update', (req, res) => {
  const { id, update } = req.body;
  delete update.id;
  Incident.findByIdAndUpdate(id, update,  { useFindAndModify: false}, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(200).json({ success: true });
  });
});

router.delete('/delete', (req, res) => {
  const { id } = req.body;
  Incident.findByIdAndRemove(id,  { useFindAndModify: false}, (err) => {
    if (err) return res.send(err);
    return res.status(200).json({ success: true });
  });
});

router.post('/', (req, res) => {
  let incident = new Incident();

  const { id, name, severity, status } = req.body;

  console.log(id);
  if ((id !=undefined && id !== 0) || (name ==undefined || name=="") ) {
    return res.json({
      success: false,
      error: 'id should be null and name can not be empty',
    });
  }
  incident.name = name;
  incident.severity = severity;
  incident.status = status;
  incident.reportDate = Date.now();
  incident.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;

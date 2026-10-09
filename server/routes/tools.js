const express = require('express');
const router = express.Router();
const pool = require('../db');

const CONTAINER_TYPES = {
  '20ft': {
    name: '20ft Standard Dry Container (FCL)',
    max_payload_kg: 28000,
    max_volume_cbm: 33.2,
    tare_kg: 2230,
    standard_bag_capacity_mt: {
      peanuts: 19.0,
      pulses: 25.0,
      grains: 24.5,
      millets: 24.5,
      sorghum: 24.5,
      maize: 24.0,
      chickpeas: 25.0,
      dairy: 18.0,
      sesame: 19.0,
      spices: 15.0,
      dehydrated: 12.0,
      feed: 20.0
    }
  },
  '40ft': {
    name: '40ft Standard Dry Container (FCL)',
    max_payload_kg: 28500,
    max_volume_cbm: 67.7,
    tare_kg: 3780,
    standard_bag_capacity_mt: {
      peanuts: 26.0,
      pulses: 26.0,
      grains: 25.5,
      millets: 25.5,
      sorghum: 25.5,
      maize: 25.5,
      chickpeas: 26.0,
      dairy: 24.0,
      sesame: 26.0,
      spices: 22.0,
      dehydrated: 20.0,
      feed: 26.0
    }
  },
  '40ft_hc': {
    name: '40ft High Cube Container (HC)',
    max_payload_kg: 28600,
    max_volume_cbm: 76.4,
    tare_kg: 3900,
    standard_bag_capacity_mt: {
      peanuts: 27.0,
      pulses: 27.0,
      grains: 26.0,
      millets: 26.0,
      sorghum: 26.0,
      maize: 26.0,
      chickpeas: 27.0,
      dairy: 26.0,
      sesame: 27.0,
      spices: 25.0,
      dehydrated: 24.0,
      feed: 27.0
    }
  }
};

// GET /api/tools/crop-calendars
router.get('/crop-calendars', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM crop_calendars ORDER BY category ASC, crop_name ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching crop calendars:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/tools/hs-codes
router.get('/hs-codes', async (req, res) => {
  try {
    const { search } = req.query;
    let query = 'SELECT * FROM hs_codes';
    const params = [];

    if (search) {
      query += ' WHERE hs_code LIKE ? OR product_name LIKE ? OR standard_description LIKE ?';
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    query += ' ORDER BY hs_code ASC';

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching hs codes:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/tools/ports
router.get('/ports', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as country_name
      FROM ports p
      LEFT JOIN countries c ON p.country_id = c.id
      ORDER BY p.is_major DESC, p.name ASC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching ports:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/tools/container-calculator
router.post('/container-calculator', (req, res) => {
  try {
    const {
      container_type = '20ft',
      bag_weight_kg = 50,
      commodity_category = 'peanuts',
      bag_count = null
    } = req.body;

    const bagWeight = parseFloat(bag_weight_kg) || 50;
    const container = CONTAINER_TYPES[container_type] || CONTAINER_TYPES['20ft'];
    const maxPayloadKg = container.max_payload_kg;

    const categoryCapacityMt = (container.standard_bag_capacity_mt && container.standard_bag_capacity_mt[commodity_category]) || 20.0;
    const maxCategoryKg = Math.min(maxPayloadKg, categoryCapacityMt * 1000);

    let totalBags;
    if (bag_count && parseInt(bag_count, 10) > 0) {
      totalBags = parseInt(bag_count, 10);
    } else {
      totalBags = Math.floor(maxCategoryKg / bagWeight);
    }

    const netWeightKg = totalBags * bagWeight;
    const tarePerBagKg = (bagWeight <= 25) ? 0.08 : ((bagWeight <= 50) ? 0.12 : 1.5);
    const grossWeightKg = netWeightKg + (totalBags * tarePerBagKg);
    const netWeightMt = netWeightKg / 1000;
    const grossWeightMt = grossWeightKg / 1000;
    const utilizationPercent = Math.min(100, Math.round((netWeightKg / maxPayloadKg) * 1000) / 10);
    const totalVgm = grossWeightMt + (container.tare_kg / 1000);

    res.json({
      success: true,
      data: {
        container_name: container.name,
        bag_weight_kg: bagWeight,
        total_bags: totalBags,
        estimated_bags: totalBags,
        net_weight_kg: Math.round(netWeightKg * 100) / 100,
        net_weight_mt: Math.round(netWeightMt * 1000) / 1000,
        gross_weight_kg: Math.round(grossWeightKg * 100) / 100,
        gross_weight_mt: Math.round(grossWeightMt * 1000) / 1000,
        container_tare_kg: container.tare_kg,
        total_vgm_mt: Math.round(totalVgm * 1000) / 1000,
        max_allowed_payload_mt: maxPayloadKg / 1000,
        container_cbm: container.max_volume_cbm,
        payload_utilization_percent: utilizationPercent,
        assumptions: [
          'Payload calculated considering standard marine weight limits from Mundra & Kandla port berths.',
          'Tare weight includes standard multi-ply paper or PP bag construction.',
          'Moisture content within export specifications (under 7% - 8%).'
        ]
      }
    });
  } catch (error) {
    console.error('Container calc error:', error);
    res.status(500).json({ success: false, message: 'Calculation error' });
  }
});

// POST /api/tools/landed-cost-calculator
router.post('/landed-cost-calculator', (req, res) => {
  try {
    const {
      fob_price = 1250,
      quantity_mt = 19,
      freight_per_mt = 65,
      insurance_percent = 0.5,
      customs_duty_percent = 0,
      port_handling_per_mt = 15,
      exchange_rate = 1.0,
      currency = 'USD'
    } = req.body;

    const fobPrice = parseFloat(fob_price) || 0;
    const qty = parseFloat(quantity_mt) || 1;
    const freight = parseFloat(freight_per_mt) || 0;
    const insPercent = parseFloat(insurance_percent) || 0;
    const dutyPercent = parseFloat(customs_duty_percent) || 0;
    const portHandling = parseFloat(port_handling_per_mt) || 0;
    const exRate = parseFloat(exchange_rate) || 1;

    const fobTotal = fobPrice * qty;
    const freightTotal = freight * qty;
    const cfrTotal = fobTotal + freightTotal;
    const insuranceTotal = cfrTotal * (insPercent / 100);
    const cifTotal = cfrTotal + insuranceTotal;
    const customsDutyTotal = cifTotal * (dutyPercent / 100);
    const portHandlingTotal = portHandling * qty;

    const totalLandedCost = cifTotal + customsDutyTotal + portHandlingTotal;
    const landedCostPerMt = qty > 0 ? (totalLandedCost / qty) : 0;
    const landedCostPerKg = landedCostPerMt / 1000;

    res.json({
      success: true,
      data: {
        currency,
        quantity_mt: qty,
        fob_total: Math.round(fobTotal * 100) / 100,
        freight_total: Math.round(freightTotal * 100) / 100,
        insurance_total: Math.round(insuranceTotal * 100) / 100,
        cif_total: Math.round(cifTotal * 100) / 100,
        customs_duty_total: Math.round(customsDutyTotal * 100) / 100,
        port_handling_total: Math.round(portHandlingTotal * 100) / 100,
        total_landed_cost: Math.round(totalLandedCost * 100) / 100,
        landed_cost_per_mt: Math.round(landedCostPerMt * 100) / 100,
        landed_cost_per_kg: Math.round(landedCostPerKg * 10000) / 10000,
        total_in_local_currency: Math.round(totalLandedCost * exRate * 100) / 100,
        per_kg_in_local_currency: Math.round(landedCostPerKg * exRate * 10000) / 10000
      }
    });
  } catch (error) {
    console.error('Landed cost error:', error);
    res.status(500).json({ success: false, message: 'Calculation error' });
  }
});

// POST /api/tools/unit-converter
router.post('/unit-converter', (req, res) => {
  try {
    const { value, from_unit, to_unit } = req.body;
    const val = parseFloat(value) || 0;

    // Convert everything to KG first
    const toKg = {
      'mt': 1000,
      'quintal': 100,
      'kg': 1,
      'lbs': 0.45359237,
      'bag_50kg': 50,
      'bag_25kg': 25
    };

    const fromFactor = toKg[from_unit] || 1;
    const toFactor = toKg[to_unit] || 1;

    const kgValue = val * fromFactor;
    const result = kgValue / toFactor;

    res.json({
      success: true,
      data: {
        from_value: val,
        from_unit,
        to_unit,
        result: Math.round(result * 10000) / 10000
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Conversion error' });
  }
});

module.exports = router;

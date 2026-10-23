const pool = require('../db');

async function seedLots() {
  try {
    const [existing] = await pool.query('SELECT COUNT(*) as cnt FROM traceability_batches');
    if (existing[0].cnt === 0) {
      const [prods] = await pool.query('SELECT id FROM products LIMIT 3');
      const p1 = prods[0]?.id || 1;
      const p2 = prods[1]?.id || p1;
      const p3 = prods[2]?.id || p1;

      await pool.query(`
        INSERT INTO traceability_batches (
          batch_code, product_id, origin_region, harvest_date, processing_date, packing_date,
          inspection_status, certificate_of_analysis_no, packing_type, purity_percentage,
          moisture_percentage, container_number, port_of_loading, shipment_status,
          public_notes, is_active, created_at, updated_at
        ) VALUES
        (
          'LOT-2026-PN-889', ?, 'Saurashtra Groundnut Corridor (Gondal APMC)', '2026-09-15', '2026-09-22', '2026-09-25',
          'EU Aflatoxin Compliant (<4 ppb)', 'COA-SGS-9182-IN', '50 kg Jute Bags with Poly Liner', '99.5% Sortex Clean',
          '7.2% Moisture', 'MSKU-918274-1', 'Mundra Port (INMUN1)', 'Customs Bolt-Sealed',
          'Calibrated 38/42 count bold peanut kernels. Buhler optical sorted, fumigated with methyl bromide under strict quarantine.', 1, NOW(), NOW()
        ),
        (
          'LOT-2026-SS-412', ?, 'Unjha Spice & Seed Belt, Mehsana', '2026-08-20', '2026-08-28', '2026-09-02',
          'Passed Lab Audit (99.95% Purity)', 'COA-GEO-4412-IN', '25 kg Paper Bags / Poly Liner', '99.95% Auto-Hulled',
          '5.8% Moisture', 'CMAU-882103-9', 'Hazira Port (INHZR1)', 'On-Board Vessel',
          'Snow-white mechanically hulled sesame seeds for premium confectionery and bakery applications. Pesticide residue negative.', 1, NOW(), NOW()
        ),
        (
          'LOT-2026-GH-104', ?, 'Central Gujarat Dairy Corridor, Anand', '2026-09-28', '2026-10-01', '2026-10-04',
          'FSSAI & AGMARK Special Grade', 'COA-NDDB-7719-IN', '15 kg Food Grade Square Tins', '99.8% Pure Milk Fat',
          '0.18% Moisture', 'MSCU-441092-3', 'Mundra Port (INMUN1)', 'Customs Gate-In',
          'Traditional bilona churning process, rich nutty aroma, golden granular texture. Free from any preservatives or adulterants.', 1, NOW(), NOW()
        )
      `, [p1, p2, p3]);
      console.log('Seeded 3 demo traceability lots successfully');
    } else {
      console.log('Lots already exist:', existing[0].cnt);
    }
  } catch (err) {
    console.error('Error seeding lots:', err);
  } finally {
    process.exit(0);
  }
}

seedLots();

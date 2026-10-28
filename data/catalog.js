/*
 * Demo parts and service catalog for the customer shop. Prices, durations and
 * images match the earlier storefront; everything is sample data.
 */

export const SERVICES = [
  { id: 's1', name: 'Oil Change', description: 'Full synthetic or conventional oil change with filter replacement.', price: 850, duration: 45, image: 'image-25.jpg' },
  { id: 's2', name: 'Brake Inspection', description: 'Complete brake system inspection including pads, rotors and brake lines.', price: 500, duration: 30, image: 'image-33.jpg' },
  { id: 's3', name: 'Brake Repair', description: 'Full brake repair including pad replacement and rotor resurfacing.', price: 3500, duration: 90, image: 'image-32.jpg' },
  { id: 's4', name: 'Tire Replacement', description: 'Remove and replace up to four tires including wheel balancing.', price: 4500, duration: 60, image: 'image-26.jpg' },
  { id: 's5', name: 'Tire Rotation', description: 'Rotate all four tires for even tread wear and longer tire life.', price: 400, duration: 20, image: 'image-27.jpg' },
  { id: 's6', name: 'Battery Check', description: 'Battery load test, terminal cleaning and charging system inspection.', price: 350, duration: 15, image: 'image-28.jpg' },
  { id: 's7', name: 'Battery Replacement', description: 'Supply and fit a new OEM-spec 12V battery with a 1-year warranty.', price: 5500, duration: 30, image: 'image-29.jpg' },
  { id: 's8', name: 'Engine Check', description: 'Full OBD-II engine diagnostic scan with a printed condition report.', price: 1000, duration: 45, image: 'image-34.jpg' },
  { id: 's9', name: 'Air Conditioning Service', description: 'AC system inspection, refrigerant recharge and leak detection.', price: 2500, duration: 90, image: 'image-31.jpg' },
  { id: 's10', name: 'General Vehicle Inspection', description: 'Comprehensive 50-point vehicle health check with a full condition report.', price: 1200, duration: 60, image: 'image-30.jpg' },
  { id: 's11', name: 'Oil and Filter Service — Premium', description: 'Premium synthetic oil service with an oil filter replacement.', price: 1450, duration: 45, image: 'image-25.jpg' },
  { id: 's12', name: 'Brake Fluid Replacement', description: 'Drain and replace brake fluid and bleed the brake system.', price: 950, duration: 45, image: 'image-33.jpg' },
  { id: 's13', name: 'Brake Pad Installation', description: 'Install replacement brake pads and inspect braking operation. Parts charged separately.', price: 1200, duration: 60, image: 'image-32.jpg' },
  { id: 's14', name: 'Wheel Balancing', description: 'Balance four wheels to help reduce vibration.', price: 650, duration: 40, image: 'image-26.jpg' },
  { id: 's15', name: 'Tire Puncture Repair', description: 'Inspect and repair an eligible tread puncture.', price: 250, duration: 30, image: 'image-27.jpg' },
  { id: 's16', name: 'Battery Terminal Cleaning', description: 'Clean terminals and inspect battery cable connections.', price: 250, duration: 20, image: 'image-28.jpg' },
  { id: 's17', name: 'Charging System Test', description: 'Check battery voltage and alternator charging performance.', price: 450, duration: 30, image: 'image-29.jpg' },
  { id: 's18', name: 'Check Engine Light Scan', description: 'Read stored diagnostic codes and explain the scan results.', price: 650, duration: 30, image: 'image-34.jpg' },
  { id: 's19', name: 'AC Performance Check', description: 'Check vent temperature and inspect air conditioning operation.', price: 750, duration: 40, image: 'image-31.jpg' },
  { id: 's20', name: 'Pre-Trip Safety Inspection', description: 'Inspect tires, lights, fluids and visible safety components before a trip.', price: 900, duration: 45, image: 'image-30.jpg' }
];

export const PARTS = [
  { id: 'p1', sku: 'FLD-001', name: 'Engine Oil 5W-30', category: 'Fluids', price: 850, stock: 48, image: 'image-22.jpg' },
  { id: 'p2', sku: 'FLT-002', name: 'Oil Filter', category: 'Filters', price: 320, stock: 62, image: 'image-10.jpg' },
  { id: 'p3', sku: 'FLT-003', name: 'Air Filter', category: 'Filters', price: 650, stock: 35, image: 'image-11.jpg' },
  { id: 'p4', sku: 'FLT-004', name: 'Fuel Filter', category: 'Filters', price: 480, stock: 28, image: 'image-12.jpg' },
  { id: 'p5', sku: 'ENG-005', name: 'Spark Plugs ×4', category: 'Engine', price: 1200, stock: 20, image: 'image-01.jpg' },
  { id: 'p6', sku: 'BRK-006', name: 'Brake Pads — Front', category: 'Brakes', price: 2200, stock: 18, image: 'image-04.jpg' },
  { id: 'p7', sku: 'BRK-007', name: 'Brake Pads — Rear', category: 'Brakes', price: 1900, stock: 15, image: 'image-05.jpg' },
  { id: 'p8', sku: 'BRK-008', name: 'Brake Discs / Rotors', category: 'Brakes', price: 3800, stock: 10, image: 'image-06.jpg' },
  { id: 'p9', sku: 'BRK-009', name: 'Brake Fluid DOT 4', category: 'Brakes', price: 380, stock: 40, image: 'image-07.jpg' },
  { id: 'p10', sku: 'BAT-010', name: 'Car Battery 12V 60Ah', category: 'Batteries', price: 4500, stock: 12, image: 'image-09.jpg' },
  { id: 'p11', sku: 'TIR-011', name: 'Tire — All-Season', category: 'Tires', price: 3200, stock: 24, image: 'image-08.jpg' },
  { id: 'p12', sku: 'ACC-012', name: 'Wiper Blades — Pair', category: 'Accessories', price: 650, stock: 30, image: 'image-20.jpg' },
  { id: 'p13', sku: 'FLD-013', name: 'Coolant / Antifreeze', category: 'Fluids', price: 420, stock: 55, image: 'image-19.jpg' },
  { id: 'p14', sku: 'FLD-014', name: 'Transmission Fluid ATF', category: 'Fluids', price: 750, stock: 32, image: 'image-21.jpg' },
  { id: 'p15', sku: 'ENG-015', name: 'Serpentine Drive Belt', category: 'Engine', price: 1100, stock: 14, image: 'image-02.jpg' },
  { id: 'p16', sku: 'ENG-016', name: 'Timing Belt Kit', category: 'Engine', price: 4200, stock: 8, image: 'image-03.jpg' },
  { id: 'p17', sku: 'SUS-017', name: 'Shock Absorbers — Pair', category: 'Suspension', price: 5500, stock: 10, image: 'image-14.jpg' },
  { id: 'p18', sku: 'SUS-018', name: 'Suspension Bushings Set', category: 'Suspension', price: 1800, stock: 16, image: 'image-18.jpg' },
  { id: 'p19', sku: 'SUS-019', name: 'Wheel Bearing Assembly', category: 'Suspension', price: 2400, stock: 12, image: 'image-17.jpg' },
  { id: 'p20', sku: 'LGT-020', name: 'Headlight Bulbs — Pair', category: 'Lights', price: 580, stock: 38, image: 'image-16.jpg' },
  { id: 'p21', sku: 'LGT-021', name: 'Fuses Assortment Box', category: 'Lights', price: 150, stock: 50, image: 'image-23.jpg' },
  { id: 'p22', sku: 'FLT-022', name: 'Cabin Air Filter', category: 'Filters', price: 550, stock: 40, image: 'image-13.jpg' },
  { id: 'p23', sku: 'FLD-023', name: 'Power Steering Fluid', category: 'Fluids', price: 320, stock: 44, image: 'image-24.jpg' },
  { id: 'p24', sku: 'LGT-024', name: 'LED Turn Signal Bulbs ×2', category: 'Lights', price: 480, stock: 25, image: 'image-15.jpg' },
  { id: 'p25', sku: 'FLD-025', name: 'Engine Oil 10W-40 — 4 L', category: 'Fluids', price: 780, stock: 30, image: 'image-22.jpg' },
  { id: 'p26', sku: 'FLT-026', name: 'Oil Filter — Compact Car', category: 'Filters', price: 280, stock: 42, image: 'image-10.jpg' },
  { id: 'p27', sku: 'FLT-027', name: 'Engine Air Filter — Compact Car', category: 'Filters', price: 520, stock: 26, image: 'image-11.jpg' },
  { id: 'p28', sku: 'FLT-028', name: 'Fuel Filter — Diesel', category: 'Filters', price: 650, stock: 20, image: 'image-12.jpg' },
  { id: 'p29', sku: 'ENG-029', name: 'Spark Plugs — Standard Set of 4', category: 'Engine', price: 680, stock: 32, image: 'image-01.jpg' },
  { id: 'p30', sku: 'BRK-030', name: 'Brake Pads — Front Economy', category: 'Brakes', price: 1650, stock: 22, image: 'image-04.jpg' },
  { id: 'p31', sku: 'BRK-031', name: 'Brake Pads — Rear Premium', category: 'Brakes', price: 2450, stock: 16, image: 'image-05.jpg' },
  { id: 'p32', sku: 'BRK-032', name: 'Brake Rotor — Single', category: 'Brakes', price: 1950, stock: 14, image: 'image-06.jpg' },
  { id: 'p33', sku: 'BRK-033', name: 'Brake Fluid DOT 4 — 1 L', category: 'Brakes', price: 650, stock: 35, image: 'image-07.jpg' },
  { id: 'p34', sku: 'BAT-034', name: 'Car Battery 12V 45Ah', category: 'Batteries', price: 3800, stock: 15, image: 'image-09.jpg' },
  { id: 'p35', sku: 'TIR-035', name: 'Touring Tire — Standard', category: 'Tires', price: 3600, stock: 24, image: 'image-08.jpg' },
  { id: 'p36', sku: 'ACC-036', name: 'Wiper Blades — Compact Pair', category: 'Accessories', price: 480, stock: 38, image: 'image-20.jpg' }
];

export const PART_CATEGORIES = [...new Set(PARTS.map(part => part.category))].sort();

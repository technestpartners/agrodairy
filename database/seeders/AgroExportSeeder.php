<?php

namespace Database\Seeders;

use App\Models\AuditLog;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Certification;
use App\Models\Country;
use App\Models\CropCalendar;
use App\Models\ExportMarket;
use App\Models\Faq;
use App\Models\HsCode;
use App\Models\InfrastructureItem;
use App\Models\Inquiry;
use App\Models\InquiryNote;
use App\Models\InquiryStatusHistory;
use App\Models\PackagingType;
use App\Models\Port;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductSpecification;
use App\Models\QualityDocument;
use App\Models\Quotation;
use App\Models\QuotationItem;
use App\Models\Setting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\TraceabilityBatch;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AgroExportSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Users & Roles
        $superAdmin = User::updateOrCreate(
            ['email' => 'admin@agrodairy.com'],
            [
                'name' => 'Managing Director / Super Admin',
                'password' => Hash::make('password123'),
                'role' => 'super_admin',
                'phone' => '+91 98250 12345',
                'department' => 'Executive Board',
                'is_active' => true,
            ]
        );

        $salesManager = User::updateOrCreate(
            ['email' => 'sales@agrodairy.com'],
            [
                'name' => 'Rajesh Patel (Head of International Trade)',
                'password' => Hash::make('password123'),
                'role' => 'sales_manager',
                'phone' => '+91 98250 23456',
                'department' => 'Global Sales & Exports',
                'is_active' => true,
            ]
        );

        $qualityManager = User::updateOrCreate(
            ['email' => 'quality@agrodairy.com'],
            [
                'name' => 'Dr. Hiren Mehta (QA & Food Safety Lead)',
                'password' => Hash::make('password123'),
                'role' => 'quality_manager',
                'phone' => '+91 98250 34567',
                'department' => 'Quality Control & Lab',
                'is_active' => true,
            ]
        );

        $contentEditor = User::updateOrCreate(
            ['email' => 'editor@agrodairy.com'],
            [
                'name' => 'Pooja Sharma (Content & Trade Communications)',
                'password' => Hash::make('password123'),
                'role' => 'content_editor',
                'phone' => '+91 98250 45678',
                'department' => 'Marketing & Trade Relations',
                'is_active' => true,
            ]
        );

        // 2. Settings
        $settings = [
            'company_name' => ['value' => 'Agro Dairy Export LLP', 'group' => 'general', 'label' => 'Company Name'],
            'tagline' => ['value' => 'Premier Agricultural Commodities & Dairy Export from India to Global Markets', 'group' => 'general', 'label' => 'Tagline'],
            'iec_code' => ['value' => '0817029381', 'group' => 'general', 'label' => 'Importer Exporter Code (IEC)'],
            'apeda_rcmc' => ['value' => 'APEDA/RCMC/2026/0892', 'group' => 'general', 'label' => 'APEDA Registration No.'],
            'fssai_licence' => ['value' => '10722026000148', 'group' => 'general', 'label' => 'FSSAI Central Licence No.'],
            'gstin' => ['value' => '24AAHFA3928L1Z9', 'group' => 'general', 'label' => 'GSTIN Number'],
            'head_office_address' => ['value' => 'Plot No. 48-52, Food Agro Park, National Highway 27, Near Marketing Yard, Rajkot - 360003, Gujarat, India', 'group' => 'contact', 'label' => 'Head Office Address'],
            'processing_plant_address' => ['value' => 'Survey No. 128/2, GIDC Industrial Estate, Gondal - 360311, Dist. Rajkot, Gujarat, India', 'group' => 'contact', 'label' => 'Processing Plant Address'],
            'primary_email' => ['value' => 'exports@agrodairy.com', 'group' => 'contact', 'label' => 'Export Inquiry Email'],
            'secondary_email' => ['value' => 'info@agrodairy.com', 'group' => 'contact', 'label' => 'General Support Email'],
            'primary_phone' => ['value' => '+91 98250 12345', 'group' => 'contact', 'label' => 'Office Telephone'],
            'whatsapp_number' => ['value' => '+919825012345', 'group' => 'whatsapp', 'label' => 'Official WhatsApp Number (E.164 format)'],
            'whatsapp_default_message' => ['value' => 'Hello Agro Dairy Export team, I am interested in sourcing agricultural commodities from India. Please share quotation details.', 'group' => 'whatsapp', 'label' => 'Default WhatsApp Message'],
            'loading_ports' => ['value' => 'Mundra Port (INMUN) & Kandla / Deendayal Port (INIXY), Gujarat, India', 'group' => 'general', 'label' => 'Primary Loading Ports'],
            'business_hours' => ['value' => 'Monday - Saturday: 09:00 AM - 07:00 PM IST (Export Desk available 24/7 via WhatsApp)', 'group' => 'contact', 'label' => 'Business Hours'],
            'annual_export_volume' => ['value' => '45,000+ Metric Tons', 'group' => 'stats', 'label' => 'Annual Export Volume'],
            'countries_exported' => ['value' => '42+ Countries Worldwide', 'group' => 'stats', 'label' => 'Export Destinations'],
            'farmer_network_count' => ['value' => '12,500+ Contracted Farmers', 'group' => 'stats', 'label' => 'Direct Farmer Network'],
            'warehousing_capacity' => ['value' => '25,000 MT Modern Cold & Dry Storage', 'group' => 'stats', 'label' => 'Warehousing Capacity'],
        ];

        foreach ($settings as $key => $data) {
            Setting::updateOrCreate(['key' => $key], $data);
        }

        // 3. Product Categories
        $categoriesData = [
            [
                'name' => 'Peanuts (Groundnuts)',
                'slug' => 'peanuts',
                'short_description' => 'Premium Bold, Java, TJ, Blanched, and Split Peanuts sourced from Gujarat fertile belt with aflatoxin control.',
                'description' => 'Agro Dairy Export LLP is a leading exporter of premium Indian Peanuts (Groundnuts). Our processing plant in the Saurashtra region of Gujarat utilizes state-of-the-art Buhler Sortex optical sorting and destoning machinery to supply mechanically cleaned, graded, and certified peanuts meeting strict EU, US, and Asian food safety standards.',
                'image' => '/images/categories/peanuts.jpg',
                'icon' => 'peanut',
                'hs_code_prefix' => '1202',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Sesame Seeds',
                'slug' => 'sesame-seeds',
                'short_description' => 'Natural White, Auto-Sortex Hulled (99.98% purity), and Black Sesame Seeds.',
                'description' => 'We supply world-class Indian sesame seeds with high oil content and exceptional aroma. Our hulled sesame seeds are processed using hygienic water-washing and mechanical peeling without chemicals, dried in gentle hot-air dryers, and laser sorted to ensure 99.98% purity.',
                'image' => '/images/categories/sesame.jpg',
                'icon' => 'sparkles',
                'hs_code_prefix' => '1207',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Indian Spices',
                'slug' => 'spices',
                'short_description' => 'Machine Cleaned Cumin Seeds, Coriander, Fennel, Fenugreek, and High Curcumin Turmeric.',
                'description' => 'India is the spice capital of the world, and Agro Dairy Export LLP delivers pure, pungent, and aromatic whole spices directly from farm gate auction yards in Unjha, Ramganj, and Salem. All lots undergo ETO / Steam sterilization upon client request.',
                'image' => '/images/categories/spices.jpg',
                'icon' => 'flame',
                'hs_code_prefix' => '0909',
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Pulses & Lentils',
                'slug' => 'pulses-lentils',
                'short_description' => 'Green Moong, Red Lentils (Masoor), Urad Dal, Green Peas, and Desi Pulses.',
                'description' => 'Selected wholesome pulses harvested from Madhya Pradesh and Gujarat. Cleaned, graded, and packed to preserve high protein nutrition, moisture balance, and extended shelf life for global food packers and distribution chains.',
                'image' => '/images/categories/pulses.jpg',
                'icon' => 'circle-dot',
                'hs_code_prefix' => '0713',
                'is_featured' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Chickpeas (Garbanzo Beans)',
                'slug' => 'chickpeas',
                'short_description' => 'Large Caliber Kabuli Chickpeas (40/42, 42/44 count) and Desi Brown Chickpeas.',
                'description' => 'Hand-picked and gravity-separated Kabuli Chickpeas with bright cream color, uniform size caliber, and high soaking absorption. Highly prized in Middle Eastern, Mediterranean, and North American culinary markets.',
                'image' => '/images/categories/chickpeas.jpg',
                'icon' => 'circle',
                'hs_code_prefix' => '0713.20',
                'is_featured' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Dehydrated Vegetables',
                'slug' => 'dehydrated-vegetables',
                'short_description' => 'Dehydrated White & Red Onion Flakes, Minced, Powder, and Garlic Flakes/Granules.',
                'description' => 'Produced in Mahuva (Gujarat), the dehydrated onion capital of India. Low-temperature continuous dehydration retains full pungency, natural white color, and essential allicin aromatics.',
                'image' => '/images/categories/dehydrated.jpg',
                'icon' => 'utensils',
                'hs_code_prefix' => '0712',
                'is_featured' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Grains & Milling Products',
                'slug' => 'grains-milling',
                'short_description' => 'Milling Wheat, Sharbati Wheat, Wheat Flour (Atta/Maida), Yellow Corn, and Millet.',
                'description' => 'Direct sourcing from North and Western India grain silos. High falling number, gluten strength, and custom protein profiles suitable for commercial bakeries, pasta makers, and flour mills.',
                'image' => '/images/categories/grains.jpg',
                'icon' => 'wheat',
                'hs_code_prefix' => '1001',
                'is_featured' => false,
                'sort_order' => 7,
            ],
            [
                'name' => 'Animal Feed & Meal',
                'slug' => 'animal-feed',
                'short_description' => 'Soybean Meal (Hi-Pro 48%), Rapeseed Meal, De-oiled Rice Bran (DORB), Corn DDGS.',
                'description' => 'High protein, highly digestible animal nutrition meals formulated for poultry, aquaculture, and cattle feed formulators worldwide.',
                'image' => '/images/categories/animal-feed.jpg',
                'icon' => 'shield-check',
                'hs_code_prefix' => '2304',
                'is_featured' => false,
                'sort_order' => 8,
            ],
            [
                'name' => 'Peanut Butter & Value Added',
                'slug' => 'peanut-butter',
                'short_description' => 'Export Grade Creamy & Crunchy Peanut Butter, 100% Natural and Private Label.',
                'description' => 'State-of-the-art roasting and colloid milling facility. Available in retail glass/PET jars and bulk 220kg food-grade drums for bakery and confectionery manufacturers.',
                'image' => '/images/categories/peanut-butter.jpg',
                'icon' => 'cup-soda',
                'hs_code_prefix' => '2008.11',
                'is_featured' => false,
                'sort_order' => 9,
            ],
        ];

        $categories = [];
        foreach ($categoriesData as $c) {
            $categories[$c['slug']] = ProductCategory::updateOrCreate(['slug' => $c['slug']], $c);
        }

        // 4. Products & Specifications
        $productsData = [
            // Peanuts
            [
                'category' => 'peanuts',
                'name' => 'Bold Peanuts (Groundnut Kernels)',
                'slug' => 'bold-peanuts',
                'sku' => 'AGRO-PN-BLD',
                'short_description' => 'Premium long-kernel Bold peanuts with high oil content and rich nutty crunch.',
                'description' => 'Bold Peanuts are typically larger in size and reddish-brown in color. Sourced from the volcanic soils of Saurashtra, Gujarat, our Bold peanuts are processed in BRC-compliant lines with automated destoning, double Sortex optical sorting, and aspiration to remove dust and shriveled grains.',
                'origin' => 'Gujarat, India',
                'grade_variety' => 'Bold 38/42, 40/50, 50/60 Counts/Ounce',
                'hs_code' => '1202.42.10',
                'moq' => 19.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '5,000 MT Annual Availability',
                'shelf_life' => '12 Months under cool & dry conditions',
                'storage_conditions' => 'Store in clean, dry, well-ventilated warehouse below 20°C and 65% RH',
                'packaging_summary' => '25kg / 50kg PP Woven Bags, Jute Bags, or 25kg Vacuum Bags with outer carton',
                'loading_summary' => '19 MT in 20ft FCL (Bags), 26 MT in 40ft FCL',
                'is_featured' => true,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Counts per Ounce', 'value' => '38/42, 40/50, 50/60', 'unit' => 'Count/Oz', 'test_method' => 'Manual Count'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Purity / Cleanliness', 'value' => '99.0% Min', 'unit' => '%', 'test_method' => 'IS 1155'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '7.0% Max', 'unit' => '%', 'test_method' => 'AOAC 925.10'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Admixture / Foreign Matter', 'value' => '0.5% - 1.0% Max', 'unit' => '%', 'test_method' => 'IS 1155'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Broken / Split Kernels', 'value' => '1.0% Max', 'unit' => '%', 'test_method' => 'Gravimetric'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Oil Content', 'value' => '48.0% - 50.0% Min', 'unit' => '%', 'test_method' => 'Soxhlet Extraction'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Free Fatty Acids (FFA)', 'value' => '1.0% Max', 'unit' => '%', 'test_method' => 'Titration'],
                    ['spec_group' => 'Food Safety', 'parameter' => 'Aflatoxin (B1+B2+G1+G2)', 'value' => '< 4.0 ppb (EU Standard) or < 15.0 ppb', 'unit' => 'ppb', 'test_method' => 'HPLC-FLD / ELISA'],
                ],
            ],
            [
                'category' => 'peanuts',
                'name' => 'Java Peanuts (Spanish Type)',
                'slug' => 'java-peanuts',
                'sku' => 'AGRO-PN-JAV',
                'short_description' => 'Round shaped, pink skin Java peanuts favored for confectionery, snacking, and peanut butter.',
                'description' => 'Java Peanuts feature rounder, smaller kernels with a pinkish skin and a sweet, natural taste. Excellent roasting characteristics make them ideal for peanut butter manufacturing, coated peanut snacks, and bakery toppings.',
                'origin' => 'Gujarat & Rajasthan, India',
                'grade_variety' => 'Java 50/60, 60/70, 70/80, 80/90 Counts/Ounce',
                'hs_code' => '1202.42.20',
                'moq' => 19.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '4,000 MT Annual Availability',
                'shelf_life' => '12 Months',
                'storage_conditions' => 'Cool, dry, shaded warehouse',
                'packaging_summary' => '25kg / 50kg New Jute Bags, PP Woven Bags, Vacuum Packs',
                'loading_summary' => '19 MT in 20ft FCL',
                'is_featured' => true,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Counts per Ounce', 'value' => '50/60, 60/70, 70/80, 80/90', 'unit' => 'Count/Oz', 'test_method' => 'Manual Count'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Purity', 'value' => '99.0% Min', 'unit' => '%', 'test_method' => 'IS 1155'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '7.0% Max', 'unit' => '%', 'test_method' => 'AOAC 925.10'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Oil Content', 'value' => '48.0% Min', 'unit' => '%', 'test_method' => 'Soxhlet'],
                    ['spec_group' => 'Food Safety', 'parameter' => 'Aflatoxin Total', 'value' => '< 4 ppb / < 10 ppb / < 20 ppb (As per requirement)', 'unit' => 'ppb', 'test_method' => 'HPLC'],
                ],
            ],
            [
                'category' => 'peanuts',
                'name' => 'Blanched Peanuts (Whole & Split)',
                'slug' => 'blanched-peanuts',
                'sku' => 'AGRO-PN-BLN',
                'short_description' => 'Skinless, ivory-white blanched peanuts prepared through gentle roasting and mechanical de-skinning.',
                'description' => 'Processed under strictly controlled low-temperature air blanching to gently loosen the red skins without roasting the internal nut meat. Electronic color sorters inspect each kernel to guarantee zero skin residue and spotless appearance.',
                'origin' => 'Gujarat, India',
                'grade_variety' => 'Blanched Bold & Java (Whole / Splits)',
                'hs_code' => '1202.42.90',
                'moq' => 19.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '2,500 MT',
                'shelf_life' => '12 Months (Vacuum pack)',
                'storage_conditions' => 'Cool storage recommended (< 15°C)',
                'packaging_summary' => '25kg Vacuum Bags with inner food-grade liner and 5-ply corrugated carton',
                'loading_summary' => '19 MT in 20ft FCL (Vacuum in Cartons)',
                'is_featured' => false,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Residual Skin', 'value' => '0.5% - 1.0% Max', 'unit' => '%', 'test_method' => 'Visual'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '4.5% - 5.0% Max', 'unit' => '%', 'test_method' => 'AOAC'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Split Kernels in Whole Grade', 'value' => '10% - 15% Max', 'unit' => '%', 'test_method' => 'Gravimetric'],
                    ['spec_group' => 'Food Safety', 'parameter' => 'Aflatoxin', 'value' => 'Negative / < 2 ppb B1, < 4 ppb Total', 'unit' => 'ppb', 'test_method' => 'HPLC'],
                ],
            ],

            // Sesame Seeds
            [
                'category' => 'sesame-seeds',
                'name' => 'Natural White Sesame Seeds',
                'slug' => 'natural-white-sesame-seeds',
                'sku' => 'AGRO-SS-NAT',
                'short_description' => 'Gujarat origin machine cleaned and Sortexed natural white sesame seeds 99.95% purity.',
                'description' => 'Natural Sesame Seeds harvested from dry-farming regions of Saurashtra and Kachchh. Known globally for sweet taste, pearly white sheen, and rich oil yield (min 48%). Free from stones, weed seeds, or immature grains.',
                'origin' => 'Gujarat, India',
                'grade_variety' => '99/1/1, 99.9% Sortex, 99.95% Premium Auto-Sortex',
                'hs_code' => '1207.40.90',
                'moq' => 19.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '6,000 MT Annual Capacity',
                'shelf_life' => '12 Months',
                'storage_conditions' => 'Dry ventilated storage away from moisture',
                'packaging_summary' => '25kg / 50kg PP Bags, Multi-wall Paper Bags, or 1000kg Big Bags',
                'loading_summary' => '19 MT in 20ft FCL',
                'is_featured' => true,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Purity', 'value' => '99.95% Min', 'unit' => '%', 'test_method' => 'ISO 658'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '5.0% - 6.0% Max', 'unit' => '%', 'test_method' => 'ISO 665'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Admixture', 'value' => '0.05% Max', 'unit' => '%', 'test_method' => 'Manual Separation'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Dark / Other Colored Seeds', 'value' => '0.5% Max', 'unit' => '%', 'test_method' => 'Optical Count'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Oil Content', 'value' => '48.0% - 50.0% Min', 'unit' => '%', 'test_method' => 'Soxhlet'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'FFA (as Oleic Acid)', 'value' => '1.5% Max', 'unit' => '%', 'test_method' => 'Titration'],
                ],
            ],
            [
                'category' => 'sesame-seeds',
                'name' => 'Hulled Sesame Seeds (Auto-Sortex 99.98%)',
                'slug' => 'hulled-sesame-seeds',
                'sku' => 'AGRO-SS-HLD',
                'short_description' => 'Mechanically hulled, chemically-free water-peeled snow-white sesame seeds with 99.98% purity.',
                'description' => 'Our flagship hulled sesame line uses pure hygienic water soaking to gently remove the outer husk, followed by advanced centrifugal de-husking and indirect hot-air dryers. Triple optical laser sorting removes all discolored seeds, achieving a brilliant ivory appearance preferred by hamburger bun bakeries and tahini manufacturers worldwide.',
                'origin' => 'Gujarat, India',
                'grade_variety' => 'Mechanically Hulled Auto-Sortex 99.98% Purity',
                'hs_code' => '1207.40.10',
                'moq' => 19.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '4,500 MT',
                'shelf_life' => '12 Months',
                'storage_conditions' => 'Air-conditioned or cool warehouse below 22°C',
                'packaging_summary' => '25kg Multi-wall Paper Bags with PE Inner Liner, or 25kg PP Bags',
                'loading_summary' => '19 MT in 20ft FCL',
                'is_featured' => true,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Purity', 'value' => '99.98% Min', 'unit' => '%', 'test_method' => 'ISO 658'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '4.0% - 4.5% Max', 'unit' => '%', 'test_method' => 'ISO 665'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Admixture', 'value' => '0.02% Max', 'unit' => '%', 'test_method' => 'Gravimetric'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Oil Content', 'value' => '50.0% Min', 'unit' => '%', 'test_method' => 'Soxhlet'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Free Fatty Acids (FFA)', 'value' => '1.0% Max', 'unit' => '%', 'test_method' => 'Titration'],
                    ['spec_group' => 'Microbiological', 'parameter' => 'Salmonella', 'value' => 'Absent in 25g', 'unit' => 'cfu/25g', 'test_method' => 'ISO 6579'],
                    ['spec_group' => 'Microbiological', 'parameter' => 'E. Coli', 'value' => 'Absent in 1g', 'unit' => 'cfu/g', 'test_method' => 'ISO 16649'],
                ],
            ],
            [
                'category' => 'sesame-seeds',
                'name' => 'Black Sesame Seeds',
                'slug' => 'black-sesame-seeds',
                'sku' => 'AGRO-SS-BLK',
                'short_description' => 'Jet-black natural sesame seeds high in calcium, antioxidants, and rich nutty aromatics.',
                'description' => 'Deep black color, bold seed shape, and intense nutty flavor. Commonly exported to Japan, Korea, Taiwan, and Europe for traditional medicines, sushi seasoning, and gourmet bakery garnishes.',
                'origin' => 'Gujarat & Madhya Pradesh, India',
                'grade_variety' => 'Natural Black 99.5% / 99.9% Sortex',
                'hs_code' => '1207.40.90',
                'moq' => 19.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '1,500 MT',
                'shelf_life' => '12 Months',
                'storage_conditions' => 'Dry, ventilated space',
                'packaging_summary' => '25kg / 50kg PP Woven Bags with PE liner',
                'loading_summary' => '19 MT in 20ft FCL',
                'is_featured' => false,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Purity', 'value' => '99.5% - 99.9% Min', 'unit' => '%', 'test_method' => 'ISO 658'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '6.0% Max', 'unit' => '%', 'test_method' => 'ISO 665'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Other Colored Seeds', 'value' => '1.0% Max', 'unit' => '%', 'test_method' => 'Visual'],
                ],
            ],

            // Spices
            [
                'category' => 'spices',
                'name' => 'Cumin Seeds (Jeera)',
                'slug' => 'cumin-seeds',
                'sku' => 'AGRO-SP-CUM',
                'short_description' => 'Unjha benchmark cumin seeds with high volatile oil (2.5%+) and intense warm aroma.',
                'description' => 'Directly sourced from primary auction yards of Unjha (Gujarat) — the world cumin trading hub. Processed through mechanical pre-cleaners, gravity separators, and color sorters to eliminate stems, dirt, and foreign seeds.',
                'origin' => 'Gujarat & Rajasthan, India',
                'grade_variety' => 'Singapore 99%, Europe Quality 99.5%, Gulf Quality',
                'hs_code' => '0909.31.29',
                'moq' => 14.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '8,000 MT Annual Volume',
                'shelf_life' => '24 Months in airtight packing',
                'storage_conditions' => 'Cool & dry place away from direct sunlight',
                'packaging_summary' => '25kg / 50kg PP Bags, Jute Bags, or Paper Bags with inner barrier',
                'loading_summary' => '14 MT in 20ft FCL, 26 MT in 40ft FCL',
                'is_featured' => true,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Purity', 'value' => '99.0% / 99.5% Min', 'unit' => '%', 'test_method' => 'ASTA 14.0'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '8.0% - 9.0% Max', 'unit' => '%', 'test_method' => 'ASTA 2.0'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Total Ash', 'value' => '8.5% Max', 'unit' => '%', 'test_method' => 'ASTA 3.0'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Volatile Oil', 'value' => '2.5% - 3.0% Min', 'unit' => 'ml/100g', 'test_method' => 'ASTA 5.0'],
                    ['spec_group' => 'Quality Standards', 'parameter' => 'Sterilization', 'value' => 'ETO or Steam Treated upon request', 'unit' => '-', 'test_method' => 'Validated Process'],
                ],
            ],
            [
                'category' => 'spices',
                'name' => 'Coriander Seeds (Whole)',
                'slug' => 'coriander-seeds',
                'sku' => 'AGRO-SP-COR',
                'short_description' => 'Bright golden-green Eagle and Scooter quality coriander seeds with citrusy aroma.',
                'description' => 'Sourced from the fertile black soil belts of Ramganj and Kota (Rajasthan) and Saurashtra (Gujarat). Cleaned to remove sticks and dust, with intact seed pods that preserve natural aromatic essential oils.',
                'origin' => 'Rajasthan & Gujarat, India',
                'grade_variety' => 'Eagle Quality, Scooter Quality, Badami, Single / Double Parrot',
                'hs_code' => '0909.21.10',
                'moq' => 10.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '3,500 MT',
                'shelf_life' => '24 Months',
                'storage_conditions' => 'Store in cool, dry place',
                'packaging_summary' => '20kg / 25kg PP Woven Bags',
                'loading_summary' => '10 MT in 20ft FCL, 20 MT in 40ft HC',
                'is_featured' => false,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Purity', 'value' => '98.5% - 99.0% Min', 'unit' => '%', 'test_method' => 'ASTA'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '9.0% Max', 'unit' => '%', 'test_method' => 'ASTA'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Split Pods', 'value' => '5.0% Max', 'unit' => '%', 'test_method' => 'Gravimetric'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Volatile Oil', 'value' => '0.3% - 0.4% Min', 'unit' => '%', 'test_method' => 'ASTA'],
                ],
            ],
            [
                'category' => 'spices',
                'name' => 'Fennel Seeds (Variyali)',
                'slug' => 'fennel-seeds',
                'sku' => 'AGRO-SP-FEN',
                'short_description' => 'Sweet, green, licorice-flavored fennel seeds cleaned and graded for export.',
                'description' => 'Harvested in Gujarat and Rajasthan. Our fennel seeds are carefully shade-dried to maintain their vibrant pale green coloration and sweet anethole flavor.',
                'origin' => 'Gujarat & Rajasthan, India',
                'grade_variety' => 'Abu Road Medium / Small, Super Green, Machine Cleaned',
                'hs_code' => '0909.61.19',
                'moq' => 12.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '2,500 MT',
                'shelf_life' => '24 Months',
                'storage_conditions' => 'Cool dry place',
                'packaging_summary' => '25kg / 50kg PP Bags',
                'loading_summary' => '12 MT in 20ft FCL',
                'is_featured' => false,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Purity', 'value' => '99.0% Min', 'unit' => '%', 'test_method' => 'ASTA'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '9.0% Max', 'unit' => '%', 'test_method' => 'ASTA'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Volatile Oil', 'value' => '1.5% Min', 'unit' => '%', 'test_method' => 'ASTA'],
                ],
            ],
            [
                'category' => 'spices',
                'name' => 'Turmeric Fingers (Double Polished)',
                'slug' => 'turmeric-fingers',
                'sku' => 'AGRO-SP-TUR',
                'short_description' => 'Deep yellow Salem and Nizamabad turmeric fingers with natural 3.0% to 5.0% curcumin content.',
                'description' => 'Pure unadulterated whole turmeric fingers harvested from certified farmer groups. Double mechanically polished to remove all outer soil and peel, resulting in a rich golden surface and hard, flinty core.',
                'origin' => 'Tamil Nadu & Telangana, India',
                'grade_variety' => 'Salem Double Polished, Nizamabad Finger, Rajapore',
                'hs_code' => '0910.30.20',
                'moq' => 18.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '4,000 MT',
                'shelf_life' => '24 Months',
                'storage_conditions' => 'Dry ventilated space',
                'packaging_summary' => '25kg / 50kg Jute Bags or PP Bags',
                'loading_summary' => '18 MT in 20ft FCL',
                'is_featured' => true,
                'specs' => [
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Curcumin Content', 'value' => '3.0% - 5.0% Min (As per grade)', 'unit' => '%', 'test_method' => 'Spectrophotometry'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '10.0% Max', 'unit' => '%', 'test_method' => 'ASTA'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Defective / Broken Fingers', 'value' => '3.0% Max', 'unit' => '%', 'test_method' => 'Gravimetric'],
                    ['spec_group' => 'Food Safety', 'parameter' => 'Lead Chromate / Artificial Color', 'value' => 'Strictly Negative / Not Detected', 'unit' => '-', 'test_method' => 'ICP-MS / Chemical test'],
                ],
            ],

            // Chickpeas
            [
                'category' => 'chickpeas',
                'name' => 'Kabuli Chickpeas (Garbanzo Beans)',
                'slug' => 'kabuli-chickpeas',
                'sku' => 'AGRO-CK-KAB',
                'short_description' => 'Jumbo caliber creamy-white Kabuli chickpeas with quick cooking and high canning yield.',
                'description' => 'Indian Kabuli Chickpeas are renowned for their large seed size (up to 12mm+), uniform cream-beige color, and thin skin. Graded with precision vibrating sieves and aspirated to ensure consistent millimeter/count caliber per ounce.',
                'origin' => 'Madhya Pradesh & Maharashtra, India',
                'grade_variety' => '40/42, 42/44, 44/46, 58/60, 75/80 Count/Ounce',
                'hs_code' => '0713.20.10',
                'moq' => 24.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '7,000 MT',
                'shelf_life' => '24 Months',
                'storage_conditions' => 'Clean, fumigated, dry warehouse',
                'packaging_summary' => '25kg / 50kg PP Woven Bags, Jute Bags, or Big Jumbo Bags',
                'loading_summary' => '24 MT in 20ft FCL',
                'is_featured' => true,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Caliber / Counts', 'value' => '40/42, 42/44, 44/46, 58/60, 75/80', 'unit' => 'Count/Oz', 'test_method' => 'Screen Count'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Purity', 'value' => '99.0% Min', 'unit' => '%', 'test_method' => 'Gravimetric'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '10.0% - 11.0% Max', 'unit' => '%', 'test_method' => 'Oven Method'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Damaged / Weeviled Grains', 'value' => '1.0% Max', 'unit' => '%', 'test_method' => 'Visual Separation'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Foreign Matter', 'value' => '0.2% Max', 'unit' => '%', 'test_method' => 'Gravimetric'],
                ],
            ],

            // Dehydrated Vegetables
            [
                'category' => 'dehydrated-vegetables',
                'name' => 'Dehydrated White Onion Flakes / Kibbled',
                'slug' => 'dehydrated-white-onion-flakes',
                'sku' => 'AGRO-DV-ONF',
                'short_description' => 'Mahuva origin crispy white onion flakes free from skins, scorched particles, and additives.',
                'description' => 'Produced by peeling selected fresh white onions, automated washing with sanitized ozonated water, slicing, and drying in multi-stage continuous belt dryers. Rehydrates quickly to impart fresh onion flavor to soups, sauces, seasonings, and prepared foods.',
                'origin' => 'Mahuva, Gujarat, India',
                'grade_variety' => 'Commercial A-Grade & Premium Sortex Kibbled',
                'hs_code' => '0712.20.00',
                'moq' => 7.50,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '3,000 MT',
                'shelf_life' => '24 Months in sealed foil/poly liner',
                'storage_conditions' => 'Cool, dry, dark environment',
                'packaging_summary' => '14kg / 20kg Poly-lined 5-ply export craft paper bags or cartons',
                'loading_summary' => '7.5 MT in 20ft FCL, 17 MT in 40ft HC FCL',
                'is_featured' => true,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Color', 'value' => 'Creamy White', 'unit' => '-', 'test_method' => 'Visual'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '5.0% Max', 'unit' => '%', 'test_method' => 'Karl Fischer / Oven'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Major Flake Size', 'value' => '8mm - 25mm (80% Min)', 'unit' => 'mm', 'test_method' => 'Sieve Analysis'],
                    ['spec_group' => 'Microbiological', 'parameter' => 'Total Plate Count (TPC)', 'value' => '< 100,000 cfu/g (or irradiated < 10,000)', 'unit' => 'cfu/g', 'test_method' => 'FDA-BAM'],
                    ['spec_group' => 'Microbiological', 'parameter' => 'Yeast & Mold', 'value' => '< 500 cfu/g', 'unit' => 'cfu/g', 'test_method' => 'FDA-BAM'],
                ],
            ],
            [
                'category' => 'dehydrated-vegetables',
                'name' => 'Dehydrated Garlic Flakes & Powder',
                'slug' => 'dehydrated-garlic-flakes-powder',
                'sku' => 'AGRO-DV-GAR',
                'short_description' => 'Pure Indian garlic flakes and fine 80-100 mesh powder with intense pungent aroma.',
                'description' => 'Derived from Gujarat and Madhya Pradesh garlic bulbs with high dry matter and allicin content. 100% pure garlic with no anticaking agents, starches, or artificial flavorings added.',
                'origin' => 'Gujarat & MP, India',
                'grade_variety' => 'Flakes, Chopped, Minced, Granules, Fine Powder (80-100 mesh)',
                'hs_code' => '0712.90.20',
                'moq' => 8.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '2,000 MT',
                'shelf_life' => '24 Months',
                'storage_conditions' => 'Cool, dry place protected from humidity',
                'packaging_summary' => '20kg / 25kg Double poly lined cartons or kraft bags',
                'loading_summary' => '8 MT (Flakes) / 14 MT (Powder) in 20ft FCL',
                'is_featured' => false,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '5.0% Max', 'unit' => '%', 'test_method' => 'Oven'],
                    ['spec_group' => 'Chemical Parameters', 'parameter' => 'Total Ash', 'value' => '4.5% Max', 'unit' => '%', 'test_method' => 'AOAC'],
                    ['spec_group' => 'Microbiological', 'parameter' => 'Salmonella', 'value' => 'Absent in 25g', 'unit' => '-', 'test_method' => 'ISO 6579'],
                ],
            ],

            // Pulses
            [
                'category' => 'pulses-lentils',
                'name' => 'Green Moong Beans (Whole)',
                'slug' => 'green-moong-beans',
                'sku' => 'AGRO-PL-MNG',
                'short_description' => 'Bright green whole mung beans cleaned and graded for sprouting and cooking.',
                'description' => 'Carefully selected whole mung beans free from insect damage, weevils, or soil particles. High germination rate (min 90%) makes them popular for fresh bean sprout growers in the Far East and Europe.',
                'origin' => 'Gujarat & Rajasthan, India',
                'grade_variety' => 'Machine Cleaned & Sortex Quality (Medium / Bold)',
                'hs_code' => '0713.31.00',
                'moq' => 24.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '4,000 MT',
                'shelf_life' => '24 Months',
                'storage_conditions' => 'Cool dry place',
                'packaging_summary' => '25kg / 50kg PP Woven Bags with inner liner',
                'loading_summary' => '24 MT in 20ft FCL',
                'is_featured' => false,
                'specs' => [
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Purity', 'value' => '99.0% Min', 'unit' => '%', 'test_method' => 'Gravimetric'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => '10.0% Max', 'unit' => '%', 'test_method' => 'Oven'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Admixture', 'value' => '0.5% Max', 'unit' => '%', 'test_method' => 'Gravimetric'],
                ],
            ],

            // Animal Feed
            [
                'category' => 'animal-feed',
                'name' => 'Soybean Meal (Hi-Protein 48%)',
                'slug' => 'soybean-meal-hi-pro',
                'sku' => 'AGRO-AF-SOY',
                'short_description' => 'High protein, toasted de-hulled soybean meal for poultry and aquafeed formulations.',
                'description' => 'Non-GMO Indian soybean meal with rich digestible amino acid profile (lysine min 2.8%), low urease activity (0.05 - 0.20 mg N/g/min), and guaranteed 48% crude protein on dry basis.',
                'origin' => 'Madhya Pradesh & Maharashtra, India',
                'grade_variety' => 'Dehulled Hi-Pro 48% & Standard 46%',
                'hs_code' => '2304.00.10',
                'moq' => 24.00,
                'moq_unit' => 'Metric Ton (1 x 20ft FCL)',
                'available_quantity' => '10,000 MT',
                'shelf_life' => '6 Months',
                'storage_conditions' => 'Well-ventilated dry storage on wooden pallets',
                'packaging_summary' => '50kg PP Bags or 1 MT Bulk Jumbo Bags',
                'loading_summary' => '24 MT in 20ft FCL',
                'is_featured' => false,
                'specs' => [
                    ['spec_group' => 'Nutritional Values', 'parameter' => 'Crude Protein (Dry basis)', 'value' => '48.0% Min', 'unit' => '%', 'test_method' => 'Kjeldahl'],
                    ['spec_group' => 'Nutritional Values', 'parameter' => 'Moisture', 'value' => '11.0% - 12.0% Max', 'unit' => '%', 'test_method' => 'Oven'],
                    ['spec_group' => 'Nutritional Values', 'parameter' => 'Crude Fiber', 'value' => '3.5% - 4.5% Max', 'unit' => '%', 'test_method' => 'Weende Method'],
                    ['spec_group' => 'Nutritional Values', 'parameter' => 'Crude Fat / Oil', 'value' => '1.0% - 1.5% Max', 'unit' => '%', 'test_method' => 'Soxhlet'],
                    ['spec_group' => 'Quality Parameters', 'parameter' => 'Urease Activity', 'value' => '0.05 to 0.20 delta pH', 'unit' => 'delta pH', 'test_method' => 'EEC Method'],
                ],
            ],

            // Peanut Butter
            [
                'category' => 'peanut-butter',
                'name' => 'Natural Peanut Butter (Creamy & Crunchy)',
                'slug' => 'natural-peanut-butter',
                'sku' => 'AGRO-PB-NAT',
                'short_description' => '100% pure roasted peanut butter with no added hydrogenated oils or stabilizers.',
                'description' => 'Crafted from freshly hot-air roasted Gujarat Java and Bold peanuts. Available in creamy smooth and crunchy textures, conventional, unsweetened, or honey sweetened formulations. Packaged under clean-room conditions in retail glass/PET jars and commercial bulk buckets.',
                'origin' => 'Rajkot, Gujarat, India',
                'grade_variety' => 'Creamy Smooth / Chunky Crunchy (100% Peanuts)',
                'hs_code' => '2008.11.00',
                'moq' => 5.00,
                'moq_unit' => 'Metric Ton',
                'available_quantity' => '1,500 MT',
                'shelf_life' => '18 Months',
                'storage_conditions' => 'Ambient room temperature, refrigeration not mandatory',
                'packaging_summary' => 'Retail Jars (340g, 500g, 1kg), Food Service Pails (5kg, 20kg), Drums (220kg)',
                'loading_summary' => 'Custom palletized FCL loading',
                'is_featured' => true,
                'specs' => [
                    ['spec_group' => 'Nutritional Profile', 'parameter' => 'Peanut Content', 'value' => '90% - 100% (As per recipe)', 'unit' => '%', 'test_method' => 'Formulation'],
                    ['spec_group' => 'Physical Parameters', 'parameter' => 'Fineness (Smooth Grade)', 'value' => '< 50 Microns', 'unit' => 'microns', 'test_method' => 'Grindometer'],
                    ['spec_group' => 'Food Safety', 'parameter' => 'Aflatoxin Total', 'value' => '< 4.0 ppb (EU Standard compliant)', 'unit' => 'ppb', 'test_method' => 'HPLC'],
                    ['spec_group' => 'Food Safety', 'parameter' => 'Trans Fatty Acids', 'value' => '0.0 g / 100g (Zero)', 'unit' => 'g/100g', 'test_method' => 'GC-FID'],
                ],
            ],
        ];

        foreach ($productsData as $pData) {
            $cat = $categories[$pData['category']];
            $specs = $pData['specs'];
            unset($pData['category'], $pData['specs']);

            $pData['category_id'] = $cat->id;
            $pData['main_image'] = "/images/products/{$pData['slug']}.jpg";
            $pData['meta_title'] = "{$pData['name']} Exporter from India | {$cat->name}";
            $pData['meta_description'] = Str::limit($pData['short_description'], 155);

            $product = Product::updateOrCreate(['slug' => $pData['slug']], $pData);

            // Seed specs
            $sort = 1;
            foreach ($specs as $s) {
                ProductSpecification::updateOrCreate(
                    [
                        'product_id' => $product->id,
                        'parameter' => $s['parameter'],
                    ],
                    [
                        'spec_group' => $s['spec_group'],
                        'value' => $s['value'],
                        'unit' => $s['unit'] ?? null,
                        'test_method' => $s['test_method'] ?? null,
                        'sort_order' => $sort++,
                    ]
                );
            }
        }

        // 5. Packaging Types
        $packagingTypesData = [
            [
                'name' => 'PP Woven Bags',
                'slug' => 'pp-woven-bags',
                'material' => 'Virgin Polypropylene (PP) with food-grade inner PE liner',
                'capacity_options' => '25 kg, 50 kg',
                'description' => 'Tough, moisture-resistant, and tear-proof bags standard for peanut, sesame, and pulse exports.',
                'image' => '/images/packaging/pp-bag.jpg',
                'is_bulk' => false,
                'is_vacuum' => false,
                'is_private_label' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Natural Jute / Burlap Bags',
                'slug' => 'jute-bags',
                'material' => '100% Eco-friendly Biodegradable Natural Indian Jute',
                'capacity_options' => '25 kg, 50 kg',
                'description' => 'Breathable natural fibers that prevent condensation sweating during maritime shipping voyages.',
                'image' => '/images/packaging/jute-bag.jpg',
                'is_bulk' => false,
                'is_vacuum' => false,
                'is_private_label' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Vacuum Packs in Corrugated Cartons',
                'slug' => 'vacuum-packs',
                'material' => 'Multi-layer high-barrier vacuum pouch + 5-ply export carton',
                'capacity_options' => '10 kg, 25 kg',
                'description' => 'High barrier protection eliminating oxygen to preserve aroma, stop insect infestation, and maintain freshness for 18+ months.',
                'image' => '/images/packaging/vacuum.jpg',
                'is_bulk' => false,
                'is_vacuum' => true,
                'is_private_label' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Big Jumbo Bags (FIBC)',
                'slug' => 'fibc-jumbo-bags',
                'material' => 'UV-stabilized PP Woven fabric with lifting loops and discharge spout',
                'capacity_options' => '1000 kg, 1250 kg (1 Metric Ton)',
                'description' => 'Heavy-duty industrial bulk bags for direct factory discharge into silos or processing hoppers.',
                'image' => '/images/packaging/jumbo-bag.jpg',
                'is_bulk' => true,
                'is_vacuum' => false,
                'is_private_label' => false,
                'sort_order' => 4,
            ],
            [
                'name' => 'Multi-wall Kraft Paper Bags',
                'slug' => 'kraft-paper-bags',
                'material' => '3-ply natural Kraft paper with inner sealed PE barrier',
                'capacity_options' => '20 kg, 25 kg',
                'description' => 'Preferred packaging for Hulled Sesame Seeds and Dehydrated Vegetables to ensure sanitary clean room transfer.',
                'image' => '/images/packaging/paper-bag.jpg',
                'is_bulk' => false,
                'is_vacuum' => false,
                'is_private_label' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($packagingTypesData as $pkg) {
            PackagingType::updateOrCreate(['slug' => $pkg['slug']], $pkg);
        }

        // 6. Certifications
        $certificationsData = [
            [
                'title' => 'APEDA Registration',
                'slug' => 'apeda-registration',
                'certificate_no' => 'RCMC/AGRO/2026/0892',
                'issuing_body' => 'Agricultural and Processed Food Products Export Development Authority (Ministry of Commerce, Govt. of India)',
                'issue_date' => '2024-04-01',
                'expiry_date' => '2029-03-31',
                'status' => 'active',
                'description' => 'Authorized registered exporter for scheduled agricultural products from India.',
                'verification_url' => 'https://apeda.gov.in',
                'sort_order' => 1,
            ],
            [
                'title' => 'FSSAI Central Licence',
                'slug' => 'fssai-central-licence',
                'certificate_no' => '10722026000148',
                'issuing_body' => 'Food Safety and Standards Authority of India',
                'issue_date' => '2023-08-15',
                'expiry_date' => '2028-08-14',
                'status' => 'active',
                'description' => 'Central Food Authority manufacturing and export authorization verifying hygiene and sanitary compliance.',
                'verification_url' => 'https://foscos.fssai.gov.in',
                'sort_order' => 2,
            ],
            [
                'title' => 'ISO 22000:2018 (FSMS)',
                'slug' => 'iso-22000-food-safety',
                'certificate_no' => 'FSMS-IN-2024-9182',
                'issuing_body' => 'TUV SUD International Certification',
                'issue_date' => '2024-01-10',
                'expiry_date' => '2027-01-09',
                'status' => 'active',
                'description' => 'International standard for food safety management systems across food processing, sorting, and packaging facilities.',
                'verification_url' => 'https://www.iso.org',
                'sort_order' => 3,
            ],
            [
                'title' => 'HACCP Hazard Analysis',
                'slug' => 'haccp-certification',
                'certificate_no' => 'HACCP-AG-88210',
                'issuing_body' => 'Bureau Veritas Quality International',
                'issue_date' => '2024-02-01',
                'expiry_date' => '2027-01-31',
                'status' => 'active',
                'description' => 'Systematic preventative approach to biological, chemical, and physical hazards in food production.',
                'verification_url' => 'https://www.bureauveritas.com',
                'sort_order' => 4,
            ],
            [
                'title' => 'Spices Board of India (CRES)',
                'slug' => 'spices-board-registration',
                'certificate_no' => 'SPICES/EX/2026/0412',
                'issuing_body' => 'Spices Board of India (Govt. of India)',
                'issue_date' => '2023-11-01',
                'expiry_date' => '2026-10-31',
                'status' => 'active',
                'description' => 'Certificate of Registration as Exporter of Spices ensuring spice cleaning, quality standards, and export authority.',
                'verification_url' => 'https://www.indianspices.com',
                'sort_order' => 5,
            ],
            [
                'title' => 'US FDA Registered Facility',
                'slug' => 'us-fda-registration',
                'certificate_no' => 'FDA-FEI-1982736410',
                'issuing_body' => 'U.S. Food and Drug Administration',
                'issue_date' => '2024-10-01',
                'expiry_date' => '2026-12-31',
                'status' => 'active',
                'description' => 'Foreign facility registered for legal importation of agricultural food items into the United States under FSMA.',
                'verification_url' => 'https://www.fda.gov',
                'sort_order' => 6,
            ],
            [
                'title' => 'Halal India Certification',
                'slug' => 'halal-certification',
                'certificate_no' => 'HALAL-IN-98124',
                'issuing_body' => 'Halal India Authority (JAKIM & MUI accredited)',
                'issue_date' => '2024-05-01',
                'expiry_date' => '2027-04-30',
                'status' => 'active',
                'description' => 'Certified 100% Halal compliant for consumption in Islamic markets across Middle East and Southeast Asia.',
                'verification_url' => 'https://halalindia.co.in',
                'sort_order' => 7,
            ],
            [
                'title' => 'Kosher International',
                'slug' => 'kosher-certification',
                'certificate_no' => 'KOSH-2024-5519',
                'issuing_body' => 'Kosher Certification Services (Orthodox Union associate)',
                'issue_date' => '2024-03-01',
                'expiry_date' => '2027-02-28',
                'status' => 'active',
                'description' => 'Certified Kosher Pareve year-round for international food processors and retail packaging.',
                'verification_url' => 'https://oukosher.org',
                'sort_order' => 8,
            ],
        ];

        foreach ($certificationsData as $cert) {
            Certification::updateOrCreate(['slug' => $cert['slug']], $cert);
        }

        // 7. Quality Documents
        $qualityDocs = [
            [
                'title' => 'Corporate Quality Assurance Policy & Zero-Adulteration Charter',
                'document_type' => 'Corporate Policy',
                'description' => 'Our guiding quality framework detailing farm level procurement audits, sampling standards, optical sorting benchmarks, and customer satisfaction commitments.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Standard Operating Procedure (SOP) — Optical Color Sorting & Destoning',
                'document_type' => 'Standard Operating Procedure',
                'description' => 'Operational parameters for Buhler Sortex optical sorting cameras, infrared sensors, and magnetic separator maintenance.',
                'sort_order' => 2,
            ],
            [
                'title' => 'Laboratory Protocol for Aflatoxin Testing via HPLC',
                'document_type' => 'Testing Protocol',
                'description' => 'Validated protocol for measuring B1, B2, G1, and G2 mycotoxin levels per AOAC 991.31 and European Commission Regulation (EC) 1881/2006.',
                'sort_order' => 3,
            ],
            [
                'title' => 'Pre-Shipment Container Inspection & Phytosanitary Protocol',
                'document_type' => 'Export Protocol',
                'description' => '12-point inspection check verifying container flooring dryness, smell absence, ventilation taping, craft paper wall lining, and silica gel desiccant bags.',
                'sort_order' => 4,
            ],
        ];

        foreach ($qualityDocs as $qd) {
            QualityDocument::updateOrCreate(['title' => $qd['title']], $qd);
        }

        // 8. Traceability Batches (Authentic lot demonstration)
        $boldPeanut = Product::where('slug', 'bold-peanuts')->first();
        $hulledSesame = Product::where('slug', 'hulled-sesame-seeds')->first();
        $cuminSpice = Product::where('slug', 'cumin-seeds')->first();

        $traceBatches = [
            [
                'batch_code' => 'AGRO-PN-2026-0814',
                'product_id' => $boldPeanut?->id,
                'origin_region' => 'Gondal Taluka, Saurashtra, Gujarat',
                'harvest_date' => '2026-01-15',
                'processing_date' => '2026-02-10',
                'packing_date' => '2026-02-12',
                'inspection_status' => 'Passed QA Clearance (SGS & In-House Lab)',
                'certificate_of_analysis_no' => 'COA-2026-PN-8821',
                'packing_type' => '50kg New Jute Bags (Inner Food Grade Lining)',
                'purity_percentage' => '99.2%',
                'moisture_percentage' => '6.4%',
                'container_number' => 'MSCU-7419283 (20ft FCL)',
                'port_of_loading' => 'Mundra Port (INMUN)',
                'shipment_status' => 'Shipped',
                'public_notes' => 'Aflatoxin certified below 2.0 ppb. Destination: Jebel Ali Port, UAE.',
            ],
            [
                'batch_code' => 'AGRO-SS-2026-0922',
                'product_id' => $hulledSesame?->id,
                'origin_region' => 'Kachchh Agricultural Belt, Gujarat',
                'harvest_date' => '2026-02-01',
                'processing_date' => '2026-03-05',
                'packing_date' => '2026-03-07',
                'inspection_status' => 'Passed QA Clearance (Eurofins Certified)',
                'certificate_of_analysis_no' => 'COA-2026-SS-1049',
                'packing_type' => '25kg Multi-wall Paper Bags with PE liner',
                'purity_percentage' => '99.98%',
                'moisture_percentage' => '4.2%',
                'container_number' => 'HLCU-9201847 (20ft FCL)',
                'port_of_loading' => 'Mundra Port (INMUN)',
                'shipment_status' => 'Shipped',
                'public_notes' => 'Salmonella negative in 25g x 5. Pesticides compliant with EU MRL standards. Destination: Rotterdam, Netherlands.',
            ],
            [
                'batch_code' => 'AGRO-CM-2026-1104',
                'product_id' => $cuminSpice?->id,
                'origin_region' => 'Unjha & Patan Mandi Belt, Gujarat',
                'harvest_date' => '2026-03-10',
                'processing_date' => '2026-03-25',
                'packing_date' => '2026-03-27',
                'inspection_status' => 'Passed QA Clearance',
                'certificate_of_analysis_no' => 'COA-2026-CM-3382',
                'packing_type' => '25kg PP Woven Bags with PE liner',
                'purity_percentage' => '99.5%',
                'moisture_percentage' => '8.2%',
                'container_number' => 'CMAU-5510294 (40ft FCL)',
                'port_of_loading' => 'Kandla / Deendayal Port (INIXY)',
                'shipment_status' => 'Quality Approved',
                'public_notes' => 'Steam sterilized lot. Volatile oil 2.85 ml/100g. Ready for container loading.',
            ],
        ];

        foreach ($traceBatches as $tb) {
            if ($tb['product_id']) {
                TraceabilityBatch::updateOrCreate(['batch_code' => $tb['batch_code']], $tb);
            }
        }

        // 9. Export Markets, Countries & Ports
        $marketsData = [
            [
                'name' => 'Middle East & GCC',
                'slug' => 'middle-east',
                'description' => 'Premier destination for Indian Peanuts, Sesame, and Spices with direct sea routing from Mundra Port to Dubai, Dammam, and Muscat.',
                'icon' => 'globe',
                'sort_order' => 1,
                'countries' => [
                    [
                        'name' => 'United Arab Emirates',
                        'slug' => 'uae',
                        'code' => 'AE',
                        'flag_emoji' => '🇦🇪',
                        'primary_ports' => 'Jebel Ali Port (Dubai), Khalifa Port (Abu Dhabi), Sharjah Port',
                        'import_regulations_summary' => 'Dubai Municipality (DM) and Ministry of Climate Change and Environment (MOCCAE) clearance required. Phytosanitary certificate, Certificate of Origin, and Halal documentation mandatory.',
                        'required_documents_summary' => 'Commercial Invoice, Packing List, Bill of Lading, Phytosanitary Certificate, Certificate of Origin (Chamber of Commerce), Health Certificate.',
                        'popular_products_summary' => 'Bold Peanuts 40/50, Hulled Sesame Seeds 99.98%, Cumin Seeds, Kabuli Chickpeas.',
                    ],
                    [
                        'name' => 'Saudi Arabia',
                        'slug' => 'saudi-arabia',
                        'code' => 'SA',
                        'flag_emoji' => '🇸🇦',
                        'primary_ports' => 'Jeddah Islamic Port, King Abdulaziz Port (Dammam)',
                        'import_regulations_summary' => 'SFDA (Saudi Food and Drug Authority) regulations apply. FAPIS pre-clearance and Saber platform compliance.',
                        'required_documents_summary' => 'Commercial Invoice (Attested), Packing List, Clean On-Board B/L, SFDA Health Certificate, Halal Certificate, Phytosanitary Certificate.',
                        'popular_products_summary' => 'Java Peanuts, Cumin Seeds, Turmeric, Chickpeas, Dehydrated Onion.',
                    ],
                ],
            ],
            [
                'name' => 'European Union & UK',
                'slug' => 'europe',
                'description' => 'Strict quality compliance market focusing on low aflatoxin, pesticide residue limits (MRL), and organic/HACCP certifications.',
                'icon' => 'shield-check',
                'sort_order' => 2,
                'countries' => [
                    [
                        'name' => 'Netherlands',
                        'slug' => 'netherlands',
                        'code' => 'NL',
                        'flag_emoji' => '🇳🇱',
                        'primary_ports' => 'Port of Rotterdam, Port of Amsterdam',
                        'import_regulations_summary' => 'EU Food Safety Authority (EFSA) regulations. Aflatoxin must strictly be below 4 ppb Total (2 ppb B1). Full pesticide screening per EC 396/2005.',
                        'required_documents_summary' => 'Bill of Lading, Commercial Invoice, Packing List, Phytosanitary Certificate with official annex, EU Health Certificate, Accredited Eurofins/SGS Test Report.',
                        'popular_products_summary' => 'Hulled Sesame Seeds (Auto-Sortex), Blanched Peanuts, Cumin Seeds (European quality).',
                    ],
                    [
                        'name' => 'United Kingdom',
                        'slug' => 'united-kingdom',
                        'code' => 'GB',
                        'flag_emoji' => '🇬🇧',
                        'primary_ports' => 'Port of Felixstowe, London Gateway, Southampton',
                        'import_regulations_summary' => 'UK FSA requirements. IPAFFS notification mandatory before vessel arrival.',
                        'required_documents_summary' => 'Bill of Lading, Commercial Invoice, Packing List, Health Certificate, Certificate of Analysis.',
                        'popular_products_summary' => 'Bold Peanuts, Sesame Seeds, Coriander Seeds, Ground Spices.',
                    ],
                ],
            ],
            [
                'name' => 'Southeast & East Asia',
                'slug' => 'asia',
                'description' => 'Fast-growing consumer markets importing high volumes of oilseeds, whole mung beans, and animal feed.',
                'icon' => 'trending-up',
                'sort_order' => 3,
                'countries' => [
                    [
                        'name' => 'Vietnam',
                        'slug' => 'vietnam',
                        'code' => 'VN',
                        'flag_emoji' => '🇻🇳',
                        'primary_ports' => 'Haiphong Port, Cat Lai Port (Ho Chi Minh City), Da Nang',
                        'import_regulations_summary' => 'Plant Protection Department (PPD) clearance. Fumigation certificate and weed seed free declaration required.',
                        'required_documents_summary' => 'Bill of Lading, Commercial Invoice, Packing List, Phytosanitary Certificate, Fumigation Certificate (Phosphine / Methyl Bromide).',
                        'popular_products_summary' => 'Bold Peanuts, Whole Green Moong, Yellow Corn, Animal Feed.',
                    ],
                    [
                        'name' => 'Indonesia',
                        'slug' => 'indonesia',
                        'code' => 'ID',
                        'flag_emoji' => '🇮🇩',
                        'primary_ports' => 'Tanjung Priok (Jakarta), Tanjung Perak (Surabaya)',
                        'import_regulations_summary' => 'Barantan Agricultural Quarantine Agency compliance. Halal BPJPH recognition.',
                        'required_documents_summary' => 'Commercial Invoice, Packing List, Bill of Lading, Prior Notice Barantan, Phytosanitary Certificate, COA.',
                        'popular_products_summary' => 'Groundnuts, Sesame Seeds, Soybean Meal.',
                    ],
                ],
            ],
        ];

        foreach ($marketsData as $mData) {
            $countries = $mData['countries'];
            unset($mData['countries']);

            $market = ExportMarket::updateOrCreate(['slug' => $mData['slug']], $mData);

            foreach ($countries as $cData) {
                $cData['export_market_id'] = $market->id;
                Country::updateOrCreate(['slug' => $cData['slug']], $cData);
            }
        }

        // Ports in India
        $indianPorts = [
            ['name' => 'Mundra Port (INMUN), Gujarat', 'code' => 'INMUN', 'type' => 'Loading', 'is_major' => true],
            ['name' => 'Kandla / Deendayal Port (INIXY), Gujarat', 'code' => 'INIXY', 'type' => 'Loading', 'is_major' => true],
            ['name' => 'Pipavav Port (INPAV), Gujarat', 'code' => 'INPAV', 'type' => 'Loading', 'is_major' => true],
            ['name' => 'Nhava Sheva / JNPT (INNSA), Maharashtra', 'code' => 'INNSA', 'type' => 'Loading', 'is_major' => true],
        ];
        foreach ($indianPorts as $port) {
            Port::updateOrCreate(['name' => $port['name']], $port);
        }

        // 10. FAQs
        $faqsData = [
            [
                'question' => 'What is the Minimum Order Quantity (MOQ) for export shipments?',
                'answer' => 'Our standard Minimum Order Quantity (MOQ) is one 20-foot Full Container Load (FCL), which typically accommodates 19 to 24 Metric Tons depending on product density and packaging type. For specialty value-added products like Peanut Butter or blended dehydrated seasonings, we can discuss trial orders of combined items or LCL consolidated shipments upon review.',
                'category' => 'export',
                'sort_order' => 1,
            ],
            [
                'question' => 'Which Incoterms do you offer for international contracts?',
                'answer' => 'We routinely quote on FOB (Free On Board - Mundra Port / Kandla Port), CFR (Cost and Freight - Port of Destination), and CIF (Cost, Insurance and Freight - Destination Port). We can also quote EXW (Ex-Works Gondal/Rajkot Plant) for international buyers who manage their own ocean logistics.',
                'category' => 'payment',
                'sort_order' => 2,
            ],
            [
                'question' => 'What payment terms are accepted for new and existing buyers?',
                'answer' => 'Standard payment terms for new international accounts are: 1) 30% Advance T/T upon order confirmation, balance 70% against emailed scanned copies of original Bill of Lading, Phytosanitary, and Invoice. 2) Irrevocable, Confirmed Letter of Credit (L/C) at Sight from a Tier-1 international bank. Credit terms may be extended to longstanding repeat clients subject to trade insurance underwriting.',
                'category' => 'payment',
                'sort_order' => 3,
            ],
            [
                'question' => 'How do you guarantee and control Aflatoxin levels in peanuts?',
                'answer' => 'Aflatoxin control begins at the farm level through regulated moisture harvesting. In our plant, peanuts undergo precision mechanical cleaning, aspirating, and dual Buhler optical color sorting to eliminate mould-damaged or discolored seeds. Every export batch is tested in our in-house laboratory via HPLC-FLD and verified by accredited third-party laboratories (e.g., SGS, Eurofins, or Geo-Chem) to guarantee compliance with EU standards (< 4 ppb) or destination country limits.',
                'category' => 'quality',
                'sort_order' => 4,
            ],
            [
                'question' => 'Can you accommodate customized or Private Label packaging with our brand design?',
                'answer' => 'Yes. We provide complete Private Label (OEM) packaging services for wholesale distributors, supermarkets, and food service chains. We can print your brand logo, regulatory artwork, barcode, and language translations onto 25kg / 50kg PP bags, retail Kraft paper pouches, vacuum packs, or consumer jars.',
                'category' => 'packaging',
                'sort_order' => 5,
            ],
            [
                'question' => 'What export documentation accompanies every shipment?',
                'answer' => 'Every export consignment is shipped with: 1) Commercial Invoice, 2) Detailed Packing List, 3) Original Clean On-Board Bill of Lading (3/3), 4) Phytosanitary Certificate issued by the Plant Quarantine Organization of India, 5) Certificate of Origin (issued by Chamber of Commerce / EIA), 6) Certificate of Analysis (COA) / Quality Inspection Report, 7) Fumigation Certificate (Phosphine / Methyl Bromide), and 8) Halal / Kosher Certificate (where applicable).',
                'category' => 'export',
                'sort_order' => 6,
            ],
            [
                'question' => 'How does your online Batch Traceability system work?',
                'answer' => 'Each export bag and container is labeled with a unique Batch Lot Code (e.g., AGRO-PN-2026-0814). Buyers can enter this number directly on our website Traceability portal to view authorized processing data: crop origin, harvest timeline, sorting date, COA inspection results, container number, and loading port verification.',
                'category' => 'quality',
                'sort_order' => 7,
            ],
        ];

        foreach ($faqsData as $faq) {
            Faq::updateOrCreate(['question' => $faq['question']], $faq);
        }

        // 11. Testimonials (Genuine buyer feedback)
        $testimonialsData = [
            [
                'client_name' => 'Tariq Al-Mansoor',
                'company_name' => 'Gulf Food Trading LLC',
                'country' => 'Dubai, United Arab Emirates',
                'rating' => 5,
                'content' => 'We have been importing Bold Peanuts and Natural Sesame Seeds from Agro Dairy Export LLP for over 3 years into Jebel Ali. The quality has remained consistently top tier with zero container moisture issues and prompt document delivery for Dubai Municipality customs clearance.',
                'sort_order' => 1,
            ],
            [
                'client_name' => 'Jan Van Der Meer',
                'company_name' => 'Rotterdam Commodities B.V.',
                'country' => 'Netherlands',
                'rating' => 5,
                'content' => 'Sourcing hulled sesame seeds compliant with stringent EU pesticide and aflatoxin limits used to be challenging. Agro Dairy Export LLP provides Eurofins-backed COAs with every single 20ft container. Their Buhler optical sorting quality is outstanding.',
                'sort_order' => 2,
            ],
            [
                'client_name' => 'Nguyen Van Minh',
                'company_name' => 'Hanoi Agri-Import Joint Stock Co.',
                'country' => 'Vietnam',
                'rating' => 5,
                'content' => 'High germination rate green mung beans and reliable container shipments to Haiphong Port. Their sales desk is active 24/7 on WhatsApp, giving real-time photos of bag stitching and container sealing.',
                'sort_order' => 3,
            ],
            [
                'client_name' => 'Dr. Khalid Al-Otaibi',
                'company_name' => 'National Food Industries Group',
                'country' => 'Jeddah, Saudi Arabia',
                'rating' => 5,
                'content' => 'The large caliber Kabuli Chickpeas (42/44 count) and Cumin Seeds received at Jeddah Islamic Port exceeded our manufacturing expectations. Complete SFDA compliance and accurate Incoterm CIF execution.',
                'sort_order' => 4,
            ],
        ];

        foreach ($testimonialsData as $testi) {
            Testimonial::updateOrCreate(['client_name' => $testi['client_name']], $testi);
        }

        // 12. Team Members
        $teamData = [
            [
                'name' => 'Dharmesh Patel',
                'position' => 'Co-Founder & Managing Director',
                'bio' => '25+ years of agricultural commodities procurement and international market development across Asia, Middle East, and Europe.',
                'email' => 'dharmesh@agrodairy.com',
                'sort_order' => 1,
            ],
            [
                'name' => 'Bhavesh Thummar',
                'position' => 'Director — Supply Chain & Processing Operations',
                'bio' => 'Oversees our state-of-the-art sorting and processing facilities in Gondal, contract farming programs, and port logistics coordination.',
                'email' => 'bhavesh@agrodairy.com',
                'sort_order' => 2,
            ],
            [
                'name' => 'Rajesh Patel',
                'position' => 'Head of International Trade & RFQ Relations',
                'bio' => 'Specializes in ocean freight logistics, Incoterm negotiations, and client relationship management across GCC and European markets.',
                'email' => 'sales@agrodairy.com',
                'sort_order' => 3,
            ],
            [
                'name' => 'Dr. Hiren Mehta',
                'position' => 'Chief Quality Officer & Food Technologist',
                'bio' => 'PhD in Food Safety with 18 years leading laboratory chromatography, Aflatoxin elimination, HACCP auditing, and phytosanitary compliance.',
                'email' => 'quality@agrodairy.com',
                'sort_order' => 4,
            ],
        ];

        foreach ($teamData as $tm) {
            TeamMember::updateOrCreate(['email' => $tm['email']], $tm);
        }

        // 13. Infrastructure Items
        $infraData = [
            [
                'title' => 'Buhler Optical Color Sorting & Destoning Facility',
                'category' => 'processing',
                'description' => 'Multi-channel high-definition InGaAs optical sorting cameras capable of detecting subtle discoloration, broken seeds, and foreign matter at 10 MT/hour.',
                'capacity' => '80 MT Daily Sortex Capacity',
                'location' => 'Gondal Agro Industrial Zone, Rajkot, Gujarat',
                'sort_order' => 1,
            ],
            [
                'title' => 'Modern Cold Storage & Humidity Controlled Silos',
                'category' => 'warehouse',
                'description' => 'Advanced temperature-controlled (15°C - 18°C) warehouse facility maintaining ideal low moisture for export oilseeds and spices year-round.',
                'capacity' => '15,000 MT Storage Capacity',
                'location' => 'Highway Agro Hub, Rajkot, Gujarat',
                'sort_order' => 2,
            ],
            [
                'title' => 'In-House Advanced Quality Control & Analytical Laboratory',
                'category' => 'laboratory',
                'description' => 'Equipped with High-Performance Liquid Chromatography (HPLC) for Aflatoxin detection, moisture analyzers, microbial incubators, and sieve shakers.',
                'capacity' => '100+ Daily Sample Tests',
                'location' => 'Plant QA Division, Gondal',
                'sort_order' => 3,
            ],
            [
                'title' => 'Clean Room Automatic Vacuum & Retail Packaging Line',
                'category' => 'packaging',
                'description' => 'Positive-pressure sanitary packaging room equipped with automatic multi-head weigher form-fill-seal and vacuum chamber machines.',
                'capacity' => '30 MT Daily Packaging',
                'location' => 'Rajkot Packaging Hub',
                'sort_order' => 4,
            ],
        ];

        foreach ($infraData as $infra) {
            InfrastructureItem::updateOrCreate(['title' => $infra['title']], $infra);
        }

        // 14. Crop Calendars
        $cropData = [
            [
                'crop_name' => 'Groundnuts (Peanuts) — Kharif Crop',
                'category' => 'Oil Seeds',
                'sowing_start' => 'June',
                'sowing_end' => 'July',
                'harvest_start' => 'October',
                'harvest_end' => 'November',
                'peak_export_start' => 'November',
                'peak_export_end' => 'May',
                'major_states' => 'Gujarat (Saurashtra), Rajasthan, Andhra Pradesh',
                'notes' => 'Main harvest crop with maximum oil content and largest kernel sizes.',
            ],
            [
                'crop_name' => 'Groundnuts (Peanuts) — Summer Crop',
                'category' => 'Oil Seeds',
                'sowing_start' => 'January',
                'sowing_end' => 'February',
                'harvest_start' => 'May',
                'harvest_end' => 'June',
                'peak_export_start' => 'June',
                'peak_export_end' => 'September',
                'major_states' => 'Gujarat, Tamil Nadu, Karnataka',
                'notes' => 'Irrigated crop ensuring fresh year-round availability for food manufacturers.',
            ],
            [
                'crop_name' => 'Sesame Seeds (Kharif)',
                'category' => 'Oil Seeds',
                'sowing_start' => 'July',
                'sowing_end' => 'August',
                'harvest_start' => 'October',
                'harvest_end' => 'November',
                'peak_export_start' => 'November',
                'peak_export_end' => 'June',
                'major_states' => 'Gujarat, Rajasthan, West Bengal, Madhya Pradesh',
                'notes' => 'High demand period for Thanksgiving, Christmas, and Asian New Year baking.',
            ],
            [
                'crop_name' => 'Cumin Seeds (Jeera) — Rabi Crop',
                'category' => 'Spices',
                'sowing_start' => 'October',
                'sowing_end' => 'November',
                'harvest_start' => 'February',
                'harvest_end' => 'March',
                'peak_export_start' => 'March',
                'peak_export_end' => 'September',
                'major_states' => 'Gujarat (Unjha/Surendranagar), Rajasthan (Jodhpur/Nagaur)',
                'notes' => 'New arrivals commence late February at Unjha APMC mandi.',
            ],
            [
                'crop_name' => 'Kabuli Chickpeas — Rabi Crop',
                'category' => 'Pulses',
                'sowing_start' => 'October',
                'sowing_end' => 'November',
                'harvest_start' => 'February',
                'harvest_end' => 'March',
                'peak_export_start' => 'March',
                'peak_export_end' => 'August',
                'major_states' => 'Madhya Pradesh, Maharashtra, Rajasthan',
                'notes' => 'Large caliber counts (42/44 and 44/46) available immediately after harvest.',
            ],
        ];

        foreach ($cropData as $crop) {
            CropCalendar::updateOrCreate(['crop_name' => $crop['crop_name']], $crop);
        }

        // 15. HS Codes
        $hsCodesData = [
            [
                'hs_code' => '1202.42.10',
                'product_name' => 'Bold Peanuts (Groundnut Kernels)',
                'category' => 'Peanuts',
                'gst_export_incentive' => 'RoDTEP 1.5% / DBK eligible',
                'standard_description' => 'Groundnuts, not roasted or otherwise cooked, shelled, whether or not broken: Bold variety (HPS Groundnut kernels)',
            ],
            [
                'hs_code' => '1202.42.20',
                'product_name' => 'Java Peanuts (Spanish Type)',
                'category' => 'Peanuts',
                'gst_export_incentive' => 'RoDTEP 1.5%',
                'standard_description' => 'Groundnuts, shelled: Java variety Kernels',
            ],
            [
                'hs_code' => '1207.40.90',
                'product_name' => 'Natural Sesame Seeds',
                'category' => 'Sesame Seeds',
                'gst_export_incentive' => 'RoDTEP 1.0%',
                'standard_description' => 'Sesamum seeds, whether or not broken: Other than planting / of seed quality',
            ],
            [
                'hs_code' => '1207.40.10',
                'product_name' => 'Hulled Sesame Seeds',
                'category' => 'Sesame Seeds',
                'gst_export_incentive' => 'RoDTEP 1.2%',
                'standard_description' => 'Sesamum seeds, whether or not broken: Hulled / Decorticated',
            ],
            [
                'hs_code' => '0909.31.29',
                'product_name' => 'Cumin Seeds (Whole)',
                'category' => 'Spices',
                'gst_export_incentive' => 'RoDTEP 2.0%',
                'standard_description' => 'Seeds of anise, badian, fennel, coriander, cumin or caraway: Cumin seeds, neither crushed nor ground: Other than of seed quality',
            ],
            [
                'hs_code' => '0713.20.10',
                'product_name' => 'Kabuli Chickpeas (Garbanzo Beans)',
                'category' => 'Chickpeas',
                'gst_export_incentive' => 'RoDTEP 1.0%',
                'standard_description' => 'Dried leguminous vegetables, shelled, whether or not skinned or split: Chickpeas (garbanzos): Kabuli chana',
            ],
            [
                'hs_code' => '0712.20.00',
                'product_name' => 'Dehydrated Onions (Flakes / Powder)',
                'category' => 'Dehydrated Vegetables',
                'gst_export_incentive' => 'RoDTEP 2.5%',
                'standard_description' => 'Dried vegetables, whole, cut, sliced, broken or in powder, but not further prepared: Onions',
            ],
            [
                'hs_code' => '2008.11.00',
                'product_name' => 'Peanut Butter',
                'category' => 'Peanut Butter',
                'gst_export_incentive' => 'RoDTEP 2.0%',
                'standard_description' => 'Ground-nuts, prepared or preserved: Peanut butter',
            ],
        ];

        foreach ($hsCodesData as $hs) {
            HsCode::updateOrCreate(['hs_code' => $hs['hs_code']], $hs);
        }

        // 16. Blog Posts
        $blogCatIndustry = BlogCategory::updateOrCreate(['slug' => 'industry-insights'], ['name' => 'Industry Insights']);
        $blogCatQuality = BlogCategory::updateOrCreate(['slug' => 'quality-control'], ['name' => 'Quality & Standards']);
        $blogCatLogistics = BlogCategory::updateOrCreate(['slug' => 'shipping-logistics'], ['name' => 'Shipping & Logistics']);

        $blogsData = [
            [
                'category_id' => $blogCatQuality->id,
                'author_id' => $superAdmin->id,
                'title' => 'Understanding European Union Aflatoxin Standards for Indian Peanut Exports',
                'slug' => 'eu-aflatoxin-standards-indian-peanuts',
                'excerpt' => 'A comprehensive guide on EU Maximum Residue Levels (MRLs), sampling protocols, and our zero-rejection optical sorting strategy.',
                'content' => "<h3>The European Regulatory Framework</h3><p>Exporting agricultural commodities to the European Union requires absolute precision regarding mycotoxins, specifically Aflatoxin B1 and total Aflatoxin (B1, B2, G1, and G2). Under European Commission regulations, peanut consignments intended for direct human consumption or as food ingredients must strictly contain less than 2.0 ppb of Aflatoxin B1 and less than 4.0 ppb of Total Aflatoxins.</p><h3>How Agro Dairy Export Achieves Complete Compliance</h3><p>Aflatoxin contamination is caused by the fungus <em>Aspergillus flavus</em>, primarily when pods suffer post-harvest moisture exposure. At Agro Dairy Export LLP, our multi-stage mitigation protocol operates from the farm gate: 1) Hand-sorting at local procurement centers, 2) Gentle mechanical pre-cleaning to discard broken shells, 3) Dual-pass Buhler optical color sorting that recognizes discolored fluorescence, and 4) Pre-export HPLC laboratory validation with Eurofins accredited testing certificates.</p>",
                'published_at' => Carbon::now()->subDays(10),
                'is_published' => true,
                'views_count' => 482,
            ],
            [
                'category_id' => $blogCatIndustry->id,
                'author_id' => $salesManager->id,
                'title' => 'Saurashtra Groundnut Crop Overview: Quality Forecast & Global Market Trends',
                'slug' => 'saurashtra-groundnut-crop-overview-market-trends',
                'excerpt' => 'Insights into recent monsoon patterns, acreage distribution in Gujarat, and price projections for Bold and Java peanut varieties.',
                'content' => "<h3>Gujarat: The Groundnut Capital of India</h3><p>The state of Gujarat accounts for over 40% of India's total peanut production, with the Saurashtra peninsula providing optimal black cotton and sandy loam soils. In this detailed harvest report, our trade intelligence team assesses yield estimates, seed kernel size distributions (38/42 vs 40/50 counts), and ocean freight rate developments from Mundra Port to major Middle Eastern and Asian hubs.</p>",
                'published_at' => Carbon::now()->subDays(25),
                'is_published' => true,
                'views_count' => 614,
            ],
            [
                'category_id' => $blogCatLogistics->id,
                'author_id' => $salesManager->id,
                'title' => 'Container Loading Best Practices: Preventing Moisture Condensation on Long Voyages',
                'slug' => 'container-loading-best-practices-preventing-cargo-sweat',
                'excerpt' => 'Essential procedures for ocean freight transit: container selection, kraft paper wall lining, and high-absorption silica desiccants.',
                'content' => "<h3>The Threat of Cargo Sweat</h3><p>When shipping agricultural commodities through varying climatic zones—such as from tropical India through the Arabian Sea to chilly European winter ports—temperature differentials inside ocean containers can cause 'container sweat'. If moisture condenses onto bag surfaces, mould formation can jeopardize cargo value.</p><h3>Our 5-Step Protection Standards</h3><p>To eliminate this risk, Agro Dairy Export LLP implements strict packaging safeguards: 1) Container floor inspection for dry moisture (< 14%), 2) Total wall lining with heavy 5-ply Kraft paper, 3) Distribution of high-absorption calcium chloride desiccant poles, and 4) Proper air space ventilation overhead.</p>",
                'published_at' => Carbon::now()->subDays(40),
                'is_published' => true,
                'views_count' => 389,
            ],
        ];

        foreach ($blogsData as $b) {
            Blog::updateOrCreate(['slug' => $b['slug']], $b);
        }

        // 17. Sample CRM Inquiries & Quotation Workflows
        $inquiry1 = Inquiry::updateOrCreate(
            ['inquiry_number' => 'RFQ-2026-1001'],
            [
                'name' => 'Ahmed Al-Hammadi',
                'company' => 'Emirates Foodstuff Trading LLC',
                'email' => 'ahmed@emiratesfood.ae',
                'phone' => '+971 4 228 1900',
                'whatsapp' => '+971501234567',
                'country' => 'United Arab Emirates',
                'product_id' => $boldPeanut?->id,
                'product_variant' => 'Bold Peanuts 40/50 Counts/Oz',
                'quantity' => 38.00,
                'unit' => 'Metric Ton (MT)',
                'packaging_preference' => '50kg New Jute Bags with inner liner',
                'destination_port' => 'Jebel Ali Port (Dubai), UAE',
                'incoterm' => 'CIF',
                'target_price' => 1280.00,
                'target_currency' => 'USD',
                'preferred_delivery_date' => Carbon::now()->addDays(30),
                'message' => 'Please quote CIF Jebel Ali for 2 x 20ft FCL of Bold Peanuts 40/50 count. Urgent shipment required before Ramadan season.',
                'status' => 'quotation_sent',
                'assigned_to' => $salesManager->id,
                'ip_address' => '86.96.22.14',
            ]
        );

        InquiryNote::create([
            'inquiry_id' => $inquiry1->id,
            'user_id' => $salesManager->id,
            'note' => 'Spoke with buyer via WhatsApp. Quality specs confirmed: Aflatoxin < 10 ppb, moisture < 7%. Quotation sent with 14-day validity.',
            'type' => 'internal',
        ]);

        InquiryStatusHistory::create([
            'inquiry_id' => $inquiry1->id,
            'user_id' => $salesManager->id,
            'from_status' => 'new',
            'to_status' => 'quotation_sent',
            'comment' => 'Official quotation QUO-2026-0012 prepared and dispatched.',
        ]);

        // Create Quotation for Inquiry 1
        $quotation1 = Quotation::updateOrCreate(
            ['quotation_number' => 'QUO-2026-0012'],
            [
                'inquiry_id' => $inquiry1->id,
                'created_by' => $salesManager->id,
                'currency' => 'USD',
                'incoterm' => 'CIF',
                'origin_port' => 'Mundra Port, Gujarat, India',
                'destination_port' => 'Jebel Ali Port, Dubai, UAE',
                'payment_terms' => '30% Advance T/T, 70% against scanned original B/L copies',
                'valid_until' => Carbon::now()->addDays(14),
                'subtotal' => 47120.00,
                'freight' => 1400.00,
                'insurance' => 240.00,
                'other_charges' => 0.00,
                'grand_total' => 48760.00,
                'status' => 'sent',
                'revision_number' => 1,
                'terms_and_conditions' => '1. Price includes pre-shipment fumigation and phytosanitary certification. 2. Quality inspection by SGS at Mundra Port prior to vessel loading. 3. Rates subject to currency fluctuations if not confirmed within validity.',
                'notes' => 'Container load: 2 x 20ft FCL (19 MT per container = 38 MT total). 760 Jute bags @ 50kg net each.',
            ]
        );

        QuotationItem::create([
            'quotation_id' => $quotation1->id,
            'product_id' => $boldPeanut?->id,
            'item_name' => 'Indian Bold Peanuts (HPS Kernels)',
            'grade_spec' => '40/50 Counts/Ounce, Moisture max 7%, Purity 99% Min, Aflatoxin < 10 ppb',
            'packaging' => '50kg New Jute Bags with food-grade inner liner',
            'quantity' => 38.00,
            'unit' => 'MT',
            'unit_price' => 1240.00,
            'total_price' => 47120.00,
        ]);

        // Audit Log
        AuditLog::create([
            'user_id' => $superAdmin->id,
            'action' => 'system_seed',
            'model_type' => 'System',
            'model_id' => 1,
            'details' => 'Initial high-fidelity export dataset seeded with products, categories, certifications, and mock RFQ records.',
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Artisan Seeder',
        ]);
    }
}

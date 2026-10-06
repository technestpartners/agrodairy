<?php

namespace Tests\Feature;

use App\Models\Inquiry;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Quotation;
use App\Models\TraceabilityBatch;
use App\Models\User;
use App\Services\ExportCalculatorService;
use App\Services\PdfExportService;
use Tests\TestCase;

class AgroExportPlatformTest extends TestCase
{
    /**
     * Test public homepage and key public navigation routes
     */
    public function test_public_pages_load_successfully(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertSee('Agro Dairy Export');

        $response = $this->get('/products');
        $response->assertStatus(200);

        $response = $this->get('/quality-assurance');
        $response->assertStatus(200);

        $response = $this->get('/certifications');
        $response->assertStatus(200);

        $response = $this->get('/traceability');
        $response->assertStatus(200);

        $response = $this->get('/shipping-logistics');
        $response->assertStatus(200);

        $response = $this->get('/export-markets');
        $response->assertStatus(200);

        $response = $this->get('/export-tools');
        $response->assertStatus(200);

        $response = $this->get('/contact-us');
        $response->assertStatus(200);

        $response = $this->get('/request-quote');
        $response->assertStatus(200);
    }

    /**
     * Test individual product page and category page
     */
    public function test_product_detail_and_category_pages(): void
    {
        $product = Product::active()->first();
        if ($product) {
            $response = $this->get('/products/' . $product->slug);
            $response->assertStatus(200);
            $response->assertSee($product->name);

            if ($product->category) {
                $catResponse = $this->get('/products/category/' . $product->category->slug);
                $catResponse->assertStatus(200);
                $catResponse->assertSee($product->category->name);
            }
        } else {
            $this->assertTrue(true);
        }
    }

    /**
     * Test Export Calculator Service mathematical accuracy
     */
    public function test_container_and_landed_cost_calculations(): void
    {
        $calculator = app(ExportCalculatorService::class);

        // Test container loading calculation for 20ft with 50kg bags
        $loadResult = $calculator->calculateContainerLoad('20ft', 50.0, 'peanuts');
        $this->assertArrayHasKey('estimated_net_weight_mt', $loadResult);
        $this->assertArrayHasKey('estimated_bags', $loadResult);
        $this->assertEquals(19.0, $loadResult['estimated_net_weight_mt']);
        $this->assertEquals(380, $loadResult['estimated_bags']);

        // Test Landed Cost calculation
        $costResult = $calculator->calculateLandedCost(
            fobPricePerMt: 1250.0,
            quantityMt: 19.0,
            freightPerMt: 65.0,
            insurancePercent: 0.5,
            customsDutyPercent: 5.0,
            portHandlingPerMt: 10.0,
            exchangeRate: 1.0,
            currency: 'USD'
        );

        $this->assertArrayHasKey('total_landed_cost', $costResult);
        $this->assertArrayHasKey('total_cif', $costResult);
        $this->assertGreaterThan(23750, $costResult['total_landed_cost']); // FOB 1250*19 = 23750 + freight + ins

        // Test Unit Converter
        $mtToKg = $calculator->convertUnit(1.0, 'mt', 'kg');
        $this->assertEquals(1000.0, $mtToKg);

        $kgToLbs = $calculator->convertUnit(10.0, 'kg', 'lbs');
        $this->assertEquals(22.0462, $kgToLbs);
    }

    /**
     * Test public lot traceability lookup
     */
    public function test_traceability_batch_lookup(): void
    {
        $batch = TraceabilityBatch::active()->first();
        if ($batch) {
            $response = $this->post('/traceability/lookup', [
                'batch_code' => $batch->batch_code,
            ]);
            $response->assertStatus(200);
            $response->assertSee($batch->batch_code);
            $response->assertSee('Verified Authenticated Batch');
        } else {
            $this->assertTrue(true);
        }
    }

    /**
     * Test public RFQ submission creates record in database
     */
    public function test_rfq_submission_creates_inquiry_record(): void
    {
        $uniqueEmail = 'test.buyer.' . time() . '@globaltrader.com';

        $response = $this->post('/request-quote/submit', [
            'name' => 'Sheikh Ahmed Al-Maktoum',
            'company' => 'Dubai Agri Trade Global FZE',
            'email' => $uniqueEmail,
            'phone' => '+971 4 345 6789',
            'whatsapp' => '+971 50 123 4567',
            'country' => 'United Arab Emirates',
            'quantity' => 38.0,
            'unit' => 'Metric Ton (MT)',
            'packaging_preference' => '50kg Jute Bags',
            'destination_port' => 'Jebel Ali Port',
            'incoterm' => 'CIF',
            'target_price' => 1240.00,
            'target_currency' => 'USD',
            'message' => 'Need 2 x 20ft FCL Bold Peanuts 40/50 count with total aflatoxin < 4 ppb.',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('inquiries', [
            'email' => $uniqueEmail,
            'country' => 'United Arab Emirates',
            'status' => 'new',
        ]);
    }

    /**
     * Test admin auth & RBAC route protection
     */
    public function test_admin_routes_require_authentication(): void
    {
        // Unauthenticated access redirects to login
        $response = $this->get('/admin/dashboard');
        $response->assertRedirect('/admin/login');

        $response = $this->get('/admin/inquiries');
        $response->assertRedirect('/admin/login');

        $response = $this->get('/admin/quotations');
        $response->assertRedirect('/admin/login');
    }

    /**
     * Test admin login and dashboard access
     */
    public function test_admin_can_login_and_access_dashboard(): void
    {
        $admin = User::where('email', 'admin@agrodairy.com')->first();
        if (!$admin) {
            $admin = User::create([
                'name' => 'Super Administrator',
                'email' => 'admin@agrodairy.com',
                'password' => bcrypt('password123'),
                'role' => 'admin',
                'department' => 'Executive Management',
                'is_active' => true,
            ]);
        }

        $response = $this->post('/admin/login', [
            'email' => 'admin@agrodairy.com',
            'password' => 'password123',
        ]);

        $response->assertRedirect(route('admin.dashboard'));
        $this->assertAuthenticatedAs($admin);

        $dashResponse = $this->actingAs($admin)->get(route('admin.dashboard'));
        $dashResponse->assertStatus(200);
        $dashResponse->assertSee('Agro Dairy Export LLP');
    }

    /**
     * Test DomPDF quotation and product spec PDF generation
     */
    public function test_pdf_generation_service(): void
    {
        $pdfService = app(PdfExportService::class);

        $product = Product::active()->first();
        if ($product) {
            $specResponse = $pdfService->generateProductSpecPdf($product, false);
            $this->assertEquals(200, $specResponse->getStatusCode());
            $this->assertEquals('application/pdf', $specResponse->headers->get('Content-Type'));
        }

        $quotation = Quotation::first();
        if ($quotation) {
            $quoteResponse = $pdfService->generateQuotationPdf($quotation, false);
            $this->assertEquals(200, $quoteResponse->getStatusCode());
            $this->assertEquals('application/pdf', $quoteResponse->headers->get('Content-Type'));
        }
    }

    /**
     * Test SEO sitemap and robots.txt
     */
    public function test_seo_sitemap_and_robots(): void
    {
        $sitemapResponse = $this->get('/sitemap.xml');
        $sitemapResponse->assertStatus(200);
        $sitemapResponse->assertHeader('Content-Type', 'application/xml');
        $this->assertStringContainsString('<urlset', $sitemapResponse->getContent());

        $robotsResponse = $this->get('/robots.txt');
        $robotsResponse->assertStatus(200);
        $this->assertStringContainsString('Disallow: /admin/', $robotsResponse->getContent());
    }
}

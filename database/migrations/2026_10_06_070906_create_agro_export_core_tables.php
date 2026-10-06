<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add roles and administrative columns to users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('staff')->after('email'); // super_admin, admin, sales_manager, sales_executive, quality_manager, content_editor, staff
            $table->string('phone')->nullable()->after('role');
            $table->string('department')->nullable()->after('phone');
            $table->boolean('is_active')->default(true)->after('department');
        });

        // Audit Logs
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('action'); // created, updated, deleted, status_change, login
            $table->string('model_type')->nullable();
            $table->unsignedBigInteger('model_id')->nullable();
            $table->text('details')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['model_type', 'model_id']);
        });

        // Product Categories
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('product_categories')->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            $table->string('icon')->nullable();
            $table->string('hs_code_prefix', 10)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
        });

        // Products
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('product_categories')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('sku')->nullable()->unique();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->string('origin')->default('Gujarat, India');
            $table->string('grade_variety')->nullable();
            $table->string('hs_code', 20)->nullable();
            $table->decimal('moq', 12, 2)->default(1.00);
            $table->string('moq_unit', 100)->default('Metric Ton (MT)');
            $table->string('available_quantity')->nullable();
            $table->string('shelf_life')->nullable();
            $table->string('storage_conditions')->nullable();
            $table->text('packaging_summary')->nullable();
            $table->text('loading_summary')->nullable();
            $table->string('spec_sheet_pdf')->nullable();
            $table->string('main_image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->timestamps();

            $table->index(['category_id', 'is_active']);
        });

        // Product Images
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('image_path');
            $table->string('caption')->nullable();
            $table->boolean('is_primary')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Product Specifications (Flexible key-value pairs per product)
        Schema::create('product_specifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('spec_group')->default('Physical Parameters'); // Physical Parameters, Chemical Parameters, Microbiological, Packaging & Loading
            $table->string('parameter'); // e.g. "Purity", "Moisture", "Counts/Ounce", "Broken", "Oil Content", "Aflatoxin"
            $table->string('value'); // e.g. "99% Min", "7% Max", "40/50", "1% Max"
            $table->string('unit')->nullable(); // %, ppb, count, etc.
            $table->string('test_method')->nullable(); // ISO, FSSAI, AOAC, etc.
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['product_id', 'spec_group']);
        });

        // Packaging Types
        Schema::create('packaging_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('material')->nullable(); // PP Bags, Jute Bags, Vacuum Packs, Paper Bags, Jumbo Bags
            $table->string('capacity_options')->nullable(); // 25kg, 50kg, 1000kg
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_bulk')->default(false);
            $table->boolean('is_vacuum')->default(false);
            $table->boolean('is_private_label')->default(true);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Certifications
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // e.g. APEDA, FSSAI, ISO 22000, HACCP, SPICES BOARD, HALAL, KOSHER, US FDA
            $table->string('slug')->unique();
            $table->string('certificate_no')->nullable();
            $table->string('issuing_body');
            $table->date('issue_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->string('file_path')->nullable();
            $table->string('image_path')->nullable();
            $table->string('verification_url')->nullable();
            $table->enum('status', ['active', 'expired', 'pending', 'under_renewal'])->default('active');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Quality Documents & Policies
        Schema::create('quality_documents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('document_type')->default('Standard Operating Procedure'); // Policy, Quality Manual, SOP, Test Protocol
            $table->text('description')->nullable();
            $table->string('file_path')->nullable();
            $table->boolean('is_public')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Traceability Batches (Lot Lookup System)
        Schema::create('traceability_batches', function (Blueprint $table) {
            $table->id();
            $table->string('batch_code')->unique(); // e.g. AGRO-PN-2026-0814
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('origin_region')->default('Saurashtra, Gujarat, India');
            $table->date('harvest_date')->nullable();
            $table->date('processing_date')->nullable();
            $table->date('packing_date')->nullable();
            $table->string('inspection_status')->default('Passed QA Clearance');
            $table->string('certificate_of_analysis_no')->nullable();
            $table->string('coa_file_path')->nullable();
            $table->string('packing_type')->nullable();
            $table->string('purity_percentage')->nullable();
            $table->string('moisture_percentage')->nullable();
            $table->string('container_number')->nullable();
            $table->string('port_of_loading')->default('Mundra Port / Kandla Port, Gujarat');
            $table->enum('shipment_status', ['Processing', 'Quality Approved', 'Packed & Sealed', 'Dispatched to Port', 'Shipped', 'Delivered'])->default('Quality Approved');
            $table->text('public_notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Export Markets (Regions)
        Schema::create('export_markets', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Middle East, Europe, Southeast Asia, Africa, Americas
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Countries
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('export_market_id')->constrained('export_markets')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('code', 5)->nullable(); // AE, US, VN, ID, NL, etc.
            $table->string('flag_emoji', 10)->nullable();
            $table->text('primary_ports')->nullable(); // e.g. Jebel Ali, Rotterdam, Haiphong
            $table->text('import_regulations_summary')->nullable();
            $table->text('required_documents_summary')->nullable();
            $table->text('popular_products_summary')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Ports
        Schema::create('ports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete();
            $table->string('name'); // Mundra, Kandla, Pipavav, Jebel Ali, Rotterdam
            $table->string('code', 10)->nullable();
            $table->string('type')->default('Discharge'); // Loading, Discharge
            $table->boolean('is_major')->default(false);
            $table->timestamps();
        });

        // Inquiries / Request for Quotation (RFQ) CRM
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('inquiry_number')->unique(); // RFQ-2026-XXXX
            $table->string('name');
            $table->string('company')->nullable();
            $table->string('email');
            $table->string('phone');
            $table->string('whatsapp')->nullable();
            $table->string('country');
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->string('product_variant')->nullable();
            $table->decimal('quantity', 14, 2)->nullable();
            $table->string('unit')->default('Metric Ton (MT)');
            $table->string('packaging_preference')->nullable();
            $table->string('destination_port')->nullable();
            $table->string('incoterm')->default('FOB'); // FOB, CIF, CFR, EXW
            $table->decimal('target_price', 14, 2)->nullable();
            $table->string('target_currency', 10)->default('USD');
            $table->date('preferred_delivery_date')->nullable();
            $table->text('message');
            $table->string('attachment_path')->nullable();
            $table->enum('status', [
                'new',
                'reviewed',
                'assigned',
                'quotation_prepared',
                'quotation_sent',
                'negotiation',
                'accepted',
                'rejected',
                'completed'
            ])->default('new');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
        });

        // Inquiry Notes (Internal and Communication CRM records)
        Schema::create('inquiry_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inquiry_id')->constrained('inquiries')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->text('note');
            $table->enum('type', ['internal', 'communication', 'system'])->default('internal');
            $table->timestamps();
        });

        // Inquiry Status Histories
        Schema::create('inquiry_status_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inquiry_id')->constrained('inquiries')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('from_status');
            $table->string('to_status');
            $table->text('comment')->nullable();
            $table->timestamps();
        });

        // Quotations
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->string('quotation_number')->unique(); // QUO-2026-XXXX
            $table->foreignId('inquiry_id')->nullable()->constrained('inquiries')->nullOnDelete();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->string('currency', 10)->default('USD');
            $table->string('incoterm')->default('CIF');
            $table->string('origin_port')->default('Mundra Port, Gujarat, India');
            $table->string('destination_port');
            $table->string('payment_terms')->default('30% Advance T/T, 70% against BL copy');
            $table->date('valid_until');
            $table->decimal('subtotal', 14, 2)->default(0.00);
            $table->decimal('freight', 14, 2)->default(0.00);
            $table->decimal('insurance', 14, 2)->default(0.00);
            $table->decimal('other_charges', 14, 2)->default(0.00);
            $table->decimal('grand_total', 14, 2)->default(0.00);
            $table->enum('status', ['draft', 'sent', 'revised', 'accepted', 'rejected', 'expired'])->default('draft');
            $table->integer('revision_number')->default(1);
            $table->text('terms_and_conditions')->nullable();
            $table->text('notes')->nullable();
            $table->string('pdf_path')->nullable();
            $table->timestamps();
        });

        // Quotation Items
        Schema::create('quotation_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quotation_id')->constrained('quotations')->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->string('item_name');
            $table->string('grade_spec')->nullable();
            $table->string('packaging')->nullable();
            $table->decimal('quantity', 14, 2);
            $table->string('unit')->default('MT');
            $table->decimal('unit_price', 14, 2);
            $table->decimal('total_price', 14, 2);
            $table->timestamps();
        });

        // Blog Categories
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        // Blogs
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('blog_categories')->cascadeOnDelete();
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('featured_image')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->unsignedBigInteger('views_count')->default(0);
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
        });

        // FAQs
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->text('answer');
            $table->string('category')->default('general'); // general, export, quality, packaging, payment
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Testimonials (Genuine buyer reviews/feedback)
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('company_name')->nullable();
            $table->string('country');
            $table->integer('rating')->default(5);
            $table->text('content');
            $table->string('avatar')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Team Members
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position');
            $table->text('bio')->nullable();
            $table->string('image')->nullable();
            $table->string('email')->nullable();
            $table->string('linkedin')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Infrastructure & Facilities (Cleaning, Sorting, Warehouse, Cold Storage)
        Schema::create('infrastructure_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->default('processing'); // processing, warehouse, laboratory, packaging, logistics
            $table->text('description');
            $table->string('capacity')->nullable(); // e.g. "50 MT/Day Sortex capacity"
            $table->string('location')->nullable();
            $table->string('image')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Crop Calendar (Agricultural Sowing & Harvesting Cycles)
        Schema::create('crop_calendars', function (Blueprint $table) {
            $table->id();
            $table->string('crop_name');
            $table->string('category')->default('Oil Seeds'); // Oil Seeds, Spices, Pulses, Grains
            $table->string('sowing_start'); // e.g. June
            $table->string('sowing_end');   // e.g. July
            $table->string('harvest_start'); // e.g. October
            $table->string('harvest_end');   // e.g. November
            $table->string('peak_export_start'); // e.g. November
            $table->string('peak_export_end');   // e.g. April
            $table->string('major_states')->default('Gujarat, Rajasthan');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // HS Code Reference
        Schema::create('hs_codes', function (Blueprint $table) {
            $table->id();
            $table->string('hs_code', 20)->unique();
            $table->string('product_name');
            $table->string('category');
            $table->string('gst_export_incentive')->nullable();
            $table->text('standard_description')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // Newsletter Subscribers
        Schema::create('newsletter_subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->boolean('is_active')->default(true);
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();
        });

        // Dynamic System & CMS Settings
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('group')->default('general'); // general, contact, social, seo, rfq, whatsapp
            $table->string('label')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('newsletter_subscribers');
        Schema::dropIfExists('hs_codes');
        Schema::dropIfExists('crop_calendars');
        Schema::dropIfExists('infrastructure_items');
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('blog_categories');
        Schema::dropIfExists('quotation_items');
        Schema::dropIfExists('quotations');
        Schema::dropIfExists('inquiry_status_histories');
        Schema::dropIfExists('inquiry_notes');
        Schema::dropIfExists('inquiries');
        Schema::dropIfExists('ports');
        Schema::dropIfExists('countries');
        Schema::dropIfExists('export_markets');
        Schema::dropIfExists('traceability_batches');
        Schema::dropIfExists('quality_documents');
        Schema::dropIfExists('certifications');
        Schema::dropIfExists('packaging_types');
        Schema::dropIfExists('product_specifications');
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_categories');
        Schema::dropIfExists('audit_logs');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'phone', 'department', 'is_active']);
        });
    }
};

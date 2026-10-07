<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Technical Data Sheet - {{ $product->name }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1a202c;
            font-size: 11px;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
        }
        .header-table {
            width: 100%;
            border-bottom: 2px solid #0F382A;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .company-name {
            font-size: 18px;
            font-weight: bold;
            color: #0F382A;
            text-transform: uppercase;
        }
        .doc-title {
            font-size: 14px;
            font-weight: bold;
            color: #C99E32;
            text-align: right;
            text-transform: uppercase;
        }
        .product-header {
            background-color: #F8F5EE;
            border-left: 4px solid #0F382A;
            padding: 12px;
            margin-bottom: 20px;
        }
        .product-title {
            font-size: 16px;
            font-weight: bold;
            color: #0F382A;
        }
        .category-name {
            font-size: 10px;
            color: #718096;
            margin-top: 2px;
        }
        .section-title {
            font-size: 12px;
            font-weight: bold;
            color: #0F382A;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
            margin-top: 15px;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        .spec-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        .spec-table th {
            background-color: #0F382A;
            color: #ffffff;
            font-size: 9px;
            padding: 6px 8px;
            text-align: left;
            text-transform: uppercase;
        }
        .spec-table td {
            padding: 6px 8px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 10px;
        }
        .spec-table tr:nth-child(even) {
            background-color: #f7fafc;
        }
        .footer {
            margin-top: 30px;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
            font-size: 8px;
            color: #a0aec0;
            text-align: center;
        }
    </style>
</head>
<body>
    <table class="header-table">
        <tr>
            <td style="width: 60%;">
                <div class="company-name">{{ $company['name'] }}</div>
                <div style="font-size: 9px; color: #4a5568; margin-top: 3px;">
                    Agricultural Commodity Processing & Export Terminal<br>
                    {{ $company['address'] ?? 'Office No. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India' }} &bull; Phone: {{ $company['phone'] ?? '+91 90233 63680' }} &bull; Email: {{ $company['email'] }} &bull; Web: {{ $company['website'] }}
                </div>
            </td>
            <td style="width: 40%;">
                <div class="doc-title">TECHNICAL SPECIFICATION SHEET</div>
                <div style="font-size: 9px; text-align: right; color: #718096; margin-top: 3px;">
                    Document Ref: TDS-ADE-{{ strtoupper($product->slug) }}<br>
                    Issue Date: {{ date('d M, Y') }}
                </div>
            </td>
        </tr>
    </table>

    <div class="product-header">
        <div class="product-title">{{ $product->name }}</div>
        <div class="category-name">Category: {{ $product->category?->name ?? 'Agricultural Commodity' }} | HS Code: {{ $product->hs_code ?? 'Export Standard' }} | Origin: {{ $product->origin ?? 'Gujarat, India' }}</div>
    </div>

    <!-- Overview -->
    <div class="section-title">1. Product Description & Agronomy</div>
    <p style="font-size: 10px; color: #4a5568; line-height: 1.5; margin-bottom: 15px;">
        {{ $product->description ?? 'Premium grade agricultural commodity sourced directly from audited farm clusters, processed using multi-stage vibrating screen destoners, optical trichromatic color sorters, and magnetic separators.' }}
    </p>

    <!-- Technical Parameters -->
    <div class="section-title">2. Certified Analytical Specifications</div>
    <table class="spec-table">
        <thead>
            <tr>
                <th style="width: 35%;">Parameter / Test Attribute</th>
                <th style="width: 40%;">Export Standard Tolerance</th>
                <th style="width: 25%;">Testing Method</th>
            </tr>
        </thead>
        <tbody>
            @if($product->specifications && $product->specifications->count() > 0)
                @foreach($product->specifications as $spec)
                    <tr>
                        <td><strong>{{ $spec->parameter_name }}</strong></td>
                        <td style="color: #0F382A; font-weight: bold;">{{ $spec->specification_value }}</td>
                        <td style="color: #718096; font-size: 9px;">{{ $spec->test_method ?? 'ISO / AOAC Standard' }}</td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <td><strong>Moisture Content</strong></td>
                    <td style="font-weight: bold;">Max 7.0% - 8.0%</td>
                    <td style="color: #718096;">ISO 665 / Halogen IR</td>
                </tr>
                <tr>
                    <td><strong>Purity / Cleanness</strong></td>
                    <td style="font-weight: bold;">Min 99.0% - 99.5%</td>
                    <td style="color: #718096;">Optical Sorter Inspection</td>
                </tr>
                <tr>
                    <td><strong>Admixture / Foreign Matter</strong></td>
                    <td style="font-weight: bold;">Max 0.50%</td>
                    <td style="color: #718096;">Manual Sieve / Gravimetric</td>
                </tr>
                <tr>
                    <td><strong>Aflatoxin</strong></td>
                    <td style="font-weight: bold;">< 4 ppb / < 10 ppb (Market Spec)</td>
                    <td style="color: #718096;">HPLC AOAC 991.31</td>
                </tr>
            @endif
        </tbody>
    </table>

    <!-- Packaging & Shipping -->
    <div class="section-title">3. Packaging & Container Stuffing Specifications</div>
    <table class="spec-table">
        <tr>
            <td style="width: 30%; font-weight: bold;">Packaging Types Available:</td>
            <td style="width: 70%;">{{ $product->packaging_options ?? '50kg Jute Bags, 25kg PP Woven Sacks with PE liner, Vacuum Brick Packs, 1-Ton Jumbo FIBC' }}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Shelf Life:</td>
            <td>{{ $product->shelf_life ?? '12 to 24 Months under cool, dry, ventilated storage' }}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Minimum Order Quantity:</td>
            <td>{{ $product->moq ? $product->moq . ' ' . $product->moq_unit : '19 Metric Tons (1 x 20ft FCL Container)' }}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Port of Dispatch:</td>
            <td>Mundra Port (INMUN1) / Kandla Port (INIXY1), Gujarat, India</td>
        </tr>
    </table>

    <div class="footer">
        Confidential Commercial Specification Sheet &bull; Agro Dairy Export LLP &bull; Registered with APEDA, FSSAI, and Spices Board of India
    </div>
</body>
</html>

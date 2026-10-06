<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Commercial Quotation {{ $quotation->quotation_number }}</title>
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
            font-size: 20px;
            font-weight: bold;
            color: #0F382A;
            text-transform: uppercase;
        }
        .company-meta {
            font-size: 9px;
            color: #4a5568;
            margin-top: 4px;
        }
        .quote-title-box {
            text-align: right;
        }
        .quote-badge {
            font-size: 16px;
            font-weight: bold;
            color: #C99E32;
        }
        .meta-table {
            width: 100%;
            margin-bottom: 20px;
        }
        .meta-box {
            width: 48%;
            vertical-align: top;
            background: #F8F5EE;
            padding: 10px;
            border-radius: 4px;
        }
        .section-heading {
            font-size: 11px;
            font-weight: bold;
            color: #0F382A;
            border-bottom: 1px solid #cbd5e0;
            padding-bottom: 3px;
            margin-bottom: 6px;
            text-transform: uppercase;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .items-table th {
            background-color: #0F382A;
            color: #ffffff;
            font-size: 9px;
            text-transform: uppercase;
            padding: 8px;
            text-align: left;
        }
        .items-table td {
            padding: 8px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 10px;
        }
        .items-table tr:nth-child(even) {
            background-color: #f7fafc;
        }
        .totals-table {
            width: 45%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .totals-table td {
            padding: 4px 8px;
            font-size: 10px;
        }
        .grand-total {
            font-size: 12px;
            font-weight: bold;
            color: #0F382A;
            border-top: 1px solid #0F382A;
            border-bottom: 2px solid #0F382A;
            background-color: #F8F5EE;
        }
        .terms-box {
            background-color: #f7fafc;
            border: 1px solid #e2e8f0;
            padding: 10px;
            font-size: 9px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .footer-table {
            width: 100%;
            margin-top: 30px;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
        }
        .signature-box {
            width: 40%;
            text-align: center;
            margin-left: auto;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <table class="header-table">
        <tr>
            <td style="vertical-align: top; width: 60%;">
                <div class="company-name">{{ $company['name'] }}</div>
                <div class="company-meta">
                    {{ $company['address'] }}<br>
                    <strong>IEC:</strong> {{ $company['iec'] }} | <strong>GSTIN:</strong> {{ $company['gstin'] }} | <strong>APEDA:</strong> {{ $company['apeda_reg'] }}<br>
                    <strong>Email:</strong> {{ $company['email'] }} | <strong>Web:</strong> {{ $company['website'] }}
                </div>
            </td>
            <td class="quote-title-box" style="vertical-align: top; width: 40%;">
                <div class="quote-badge">COMMERCIAL PROFORMA</div>
                <div style="font-size: 12px; font-weight: bold; color: #1a202c; margin-top: 4px;">{{ $quotation->quotation_number }}</div>
                <div style="font-size: 9px; color: #718096; margin-top: 4px;">
                    <strong>Date:</strong> {{ $quotation->created_at->format('d M, Y') }}<br>
                    <strong>Valid Until:</strong> {{ $quotation->valid_until ? $quotation->valid_until->format('d M, Y') : '14 Days from Issue' }}
                </div>
            </td>
        </tr>
    </table>

    <!-- Buyer & Terms -->
    <table class="meta-table">
        <tr>
            <td class="meta-box">
                <div class="section-heading">Proforma To / Consignee</div>
                <strong>{{ $quotation->inquiry?->name ?? 'Commercial Buyer' }}</strong><br>
                @if($quotation->inquiry?->company)
                    {{ $quotation->inquiry->company }}<br>
                @endif
                Destination: {{ $quotation->inquiry?->country ?? 'International Port' }}<br>
                Email: {{ $quotation->inquiry?->email ?? 'N/A' }} | Phone: {{ $quotation->inquiry?->phone ?? 'N/A' }}
            </td>
            <td style="width: 4%;"></td>
            <td class="meta-box">
                <div class="section-heading">Commercial & Shipment Terms</div>
                <strong>Incoterm:</strong> {{ $quotation->incoterm ?? 'FOB Mundra' }}<br>
                <strong>Port of Loading:</strong> Mundra Port (INMUN1), Gujarat, India<br>
                <strong>Discharge Port:</strong> {{ $quotation->destination_port ?? ($quotation->inquiry?->destination_port ?? 'As per LC') }}<br>
                <strong>Payment Instrument:</strong> {{ $quotation->payment_terms ?? '100% Irrevocable LC at Sight' }}
            </td>
        </tr>
    </table>

    <!-- Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 35%;">Commodity & Specification</th>
                <th style="width: 15%;">Packaging Spec</th>
                <th style="width: 15%; text-align: right;">Quantity</th>
                <th style="width: 15%; text-align: right;">Unit Rate ({{ $quotation->currency }})</th>
                <th style="width: 15%; text-align: right;">Amount ({{ $quotation->currency }})</th>
            </tr>
        </thead>
        <tbody>
            @forelse($quotation->items as $idx => $item)
                <tr>
                    <td>{{ $idx + 1 }}</td>
                    <td>
                        <strong>{{ $item->product?->name ?? 'Agricultural Commodity' }}</strong>
                        @if($item->specification)
                            <br><span style="font-size: 8px; color: #718096;">{{ $item->specification }}</span>
                        @endif
                    </td>
                    <td>{{ $item->packaging ?? 'Export Grade Bags' }}</td>
                    <td style="text-align: right;">{{ number_format($item->quantity, 2) }} {{ $item->unit }}</td>
                    <td style="text-align: right;">{{ number_format($item->unit_price, 2) }}</td>
                    <td style="text-align: right; font-weight: bold;">{{ number_format($item->total_price, 2) }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" style="text-align: center; padding: 20px;">No line items attached.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <!-- Totals Table -->
    <table class="totals-table">
        <tr>
            <td>Subtotal (FOB Cargo):</td>
            <td style="text-align: right; font-weight: bold;">{{ $quotation->currency }} {{ number_format($quotation->subtotal, 2) }}</td>
        </tr>
        @if($quotation->freight_charge > 0)
            <tr>
                <td>Ocean Freight:</td>
                <td style="text-align: right;">{{ $quotation->currency }} {{ number_format($quotation->freight_charge, 2) }}</td>
            </tr>
        @endif
        @if($quotation->insurance_charge > 0)
            <tr>
                <td>Marine Insurance:</td>
                <td style="text-align: right;">{{ $quotation->currency }} {{ number_format($quotation->insurance_charge, 2) }}</td>
            </tr>
        @endif
        @if($quotation->tax_charge > 0)
            <tr>
                <td>Taxes / Regulatory Surcharges:</td>
                <td style="text-align: right;">{{ $quotation->currency }} {{ number_format($quotation->tax_charge, 2) }}</td>
            </tr>
        @endif
        <tr class="grand-total">
            <td><strong>TOTAL ({{ $quotation->incoterm }}):</strong></td>
            <td style="text-align: right;"><strong>{{ $quotation->currency }} {{ number_format($quotation->total_amount, 2) }}</strong></td>
        </tr>
    </table>

    <!-- Contractual Terms -->
    <div class="terms-box">
        <strong>Standard Export Conditions:</strong>
        <ol style="margin: 4px 0 0 15px; padding: 0;">
            <li>Rates are quoted on {{ $quotation->incoterm }} basis subject to market movement and container availability at loading port.</li>
            <li>Sampling & Weight: Final at loading port witnessed by recognized independent surveyor (SGS / BV / Intertek).</li>
            <li>Fumigation & Phytosanitary: Certified by Indian Plant Quarantine department prior to vessel sailing.</li>
        </ol>
    </div>

    <!-- Signatures -->
    <table class="footer-table">
        <tr>
            <td style="font-size: 8px; color: #a0aec0; width: 60%;">
                Generated automatically by Agro Dairy Export LLP Enterprise Trade Desk.<br>
                Official Commercial Inquiry Ref: {{ $quotation->inquiry?->inquiry_number ?? 'Direct' }}
            </td>
            <td class="signature-box">
                <div style="font-size: 9px; font-weight: bold; color: #0F382A;">For AGRO DAIRY EXPORT LLP</div>
                <div style="height: 35px;"></div>
                <div style="border-top: 1px solid #718096; font-size: 8px; color: #4a5568; padding-top: 2px;">
                    Authorized Export Signatory
                </div>
            </td>
        </tr>
    </table>
</body>
</html>

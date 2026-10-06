<?php

namespace App\Http\Controllers;

use App\Models\CropCalendar;
use App\Models\HsCode;
use App\Models\ProductCategory;
use App\Services\ExportCalculatorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ExportToolsController extends Controller
{
    public function __construct(
        protected ExportCalculatorService $calculatorService
    ) {}

    public function index(): View
    {
        $categories = ProductCategory::active()->get();
        $forexData = $this->calculatorService->getExchangeRates();
        return view('pages.tools.index', compact('categories', 'forexData'));
    }

    public function containerCalculator(Request $request): View|JsonResponse
    {
        $containerType = $request->get('container_type', '20ft');
        $bagWeightKg = (float) $request->get('bag_weight_kg', 50.0);
        $category = $request->get('commodity_category', 'peanuts');
        $userBagCount = $request->filled('bag_count') ? (int) $request->get('bag_count') : null;

        $result = $this->calculatorService->calculateContainerLoad(
            $containerType,
            $bagWeightKg,
            $category,
            $userBagCount
        );

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json($result);
        }

        return view('pages.tools.container_calculator', [
            'result' => $result,
            'containerType' => $containerType,
            'bagWeightKg' => $bagWeightKg,
            'category' => $category,
            'userBagCount' => $userBagCount,
        ]);
    }

    public function landedCostCalculator(Request $request): View|JsonResponse
    {
        $fobPrice = (float) $request->get('fob_price', 1250.0);
        $quantity = (float) $request->get('quantity_mt', 19.0);
        $freight = (float) $request->get('freight_per_mt', 65.0);
        $insurance = (float) $request->get('insurance_percent', 0.5);
        $customsDuty = (float) $request->get('customs_duty_percent', 0.0);
        $portHandling = (float) $request->get('port_handling_per_mt', 12.0);
        $exchangeRate = (float) $request->get('exchange_rate', 1.0);
        $currency = $request->get('currency', 'USD');

        $result = $this->calculatorService->calculateLandedCost(
            $fobPrice,
            $quantity,
            $freight,
            $insurance,
            $customsDuty,
            $portHandling,
            $exchangeRate,
            $currency
        );

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json($result);
        }

        return view('pages.tools.landed_cost_calculator', [
            'result' => $result,
            'fobPrice' => $fobPrice,
            'quantity' => $quantity,
            'freight' => $freight,
            'insurance' => $insurance,
            'customsDuty' => $customsDuty,
            'portHandling' => $portHandling,
            'exchangeRate' => $exchangeRate,
            'currency' => $currency,
        ]);
    }

    public function hsCodeFinder(Request $request): View
    {
        $query = HsCode::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('hs_code', 'like', "%{$search}%")
                  ->orWhere('product_name', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%")
                  ->orWhere('standard_description', 'like', "%{$search}%");
            });
        }

        $hsCodes = $query->paginate(15)->withQueryString();

        return view('pages.tools.hs_code_finder', compact('hsCodes'));
    }

    public function cropCalendar(): View
    {
        $calendar = CropCalendar::all();
        return view('pages.tools.crop_calendar', compact('calendar'));
    }

    public function unitConverter(Request $request): View|JsonResponse
    {
        $value = (float) $request->get('value', 1.0);
        $fromUnit = $request->get('from_unit', 'mt');
        $toUnit = $request->get('to_unit', 'kg');

        $converted = $this->calculatorService->convertUnit($value, $fromUnit, $toUnit);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'value' => $value,
                'from_unit' => $fromUnit,
                'to_unit' => $toUnit,
                'converted' => $converted,
            ]);
        }

        return view('pages.tools.unit_converter', compact('value', 'fromUnit', 'toUnit', 'converted'));
    }
}

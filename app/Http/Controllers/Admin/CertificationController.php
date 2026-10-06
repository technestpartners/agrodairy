<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Services\AuditService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class CertificationController extends Controller
{
    public function index(): View
    {
        $certifications = Certification::orderBy('sort_order')->paginate(15);
        return view('admin.certifications.index', compact('certifications'));
    }

    public function create(): View
    {
        return view('admin.certifications.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'slug' => 'nullable|string|max:150|unique:certifications,slug',
            'certificate_no' => 'nullable|string|max:100',
            'issuing_body' => 'required|string|max:200',
            'issue_date' => 'nullable|date',
            'expiry_date' => 'nullable|date',
            'verification_url' => 'nullable|url|max:255',
            'status' => 'required|in:active,expired,pending,under_renewal',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = $validated['slug'] ? Str::slug($validated['slug']) : Str::slug($validated['title']);
        $validated['is_active'] = $request->boolean('is_active', true);

        $cert = Certification::create($validated);

        AuditService::log('created', 'Certification', $cert->id, "Created certification {$cert->title}");

        return redirect()->route('admin.certifications.index')->with('success', "Certification '{$cert->title}' added successfully.");
    }

    public function edit(Certification $certification): View
    {
        return view('admin.certifications.edit', compact('certification'));
    }

    public function update(Request $request, Certification $certification): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'slug' => "nullable|string|max:150|unique:certifications,slug,{$certification->id}",
            'certificate_no' => 'nullable|string|max:100',
            'issuing_body' => 'required|string|max:200',
            'issue_date' => 'nullable|date',
            'expiry_date' => 'nullable|date',
            'verification_url' => 'nullable|url|max:255',
            'status' => 'required|in:active,expired,pending,under_renewal',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = $validated['slug'] ? Str::slug($validated['slug']) : Str::slug($validated['title']);
        $validated['is_active'] = $request->boolean('is_active');

        $certification->update($validated);

        AuditService::log('updated', 'Certification', $certification->id, "Updated certification {$certification->title}");

        return redirect()->route('admin.certifications.index')->with('success', "Certification '{$certification->title}' updated successfully.");
    }

    public function destroy(Certification $certification): RedirectResponse
    {
        $title = $certification->title;
        $certification->delete();

        AuditService::log('deleted', 'Certification', null, "Deleted certification {$title}");

        return redirect()->route('admin.certifications.index')->with('success', "Certification '{$title}' deleted.");
    }
}

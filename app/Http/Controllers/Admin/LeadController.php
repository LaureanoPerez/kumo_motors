<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Leads/Index', [
            'leads' => Lead::query()->with('vehicle:id,brand,model,slug')->latest()->paginate(20),
        ]);
    }

    public function update(Request $request, Lead $lead): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['nuevo', 'contactado', 'cerrado'])],
        ]);

        $lead->update($data);

        return back()->with('success', 'Estado actualizado.');
    }

    public function destroy(Lead $lead): RedirectResponse
    {
        $lead->delete();

        return back()->with('success', 'Contacto eliminado.');
    }
}

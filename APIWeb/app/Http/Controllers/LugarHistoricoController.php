<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LugarHistorico;

class LugarHistoricoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lugares_historico = LugarHistorico::all();

        return response()->json(['lugares_historico' => $lugares_historico]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'fecha' => 'required',
            'temperatura' => 'required',
            'humedad' => 'required',
            'id_lugar' => 'required'
        ]);

        LugarHistorico::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
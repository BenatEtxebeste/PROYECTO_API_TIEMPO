<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lugar;

class LugarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lugares = Lugar::all();

        return response()->json(['lugares' => $lugares]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'latitud' => 'required',
            'longitud' => 'required',
            'temperatura' => 'required',
            'humedad' => 'required',
            'precipitacion' => 'required',
            'viento' => 'required',
            'nubes' => 'required'
        ]);

        Lugar::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $nombre)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $nombre)
    {
        $lugar = Lugar::find($request->input('nombre'));

        if (!$lugar) {
            return response()->json(['mensaje' => 'Lugar no encontrado'], 404);
        }

        $lugar->latitud = $request->input('latitud');
        $lugar->longitud = $request->input('longitud');
        $lugar->temperatura = $request->input('temperatura');
        $lugar->humedad = $request->input('humedad');
        $lugar->precipitacion = $request->input('precipitacion');
        $lugar->viento = $request->input('viento');
        $lugar->nubes = $request->input('nubes');

        $lugar->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

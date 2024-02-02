<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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

    public function datosAPI() {
        $provincias = [
            'Gipuzkoa' => [
                'id' => 20,
                'municipios' => [
                    'Donosti' => 20069,
                    'Errenteria' => 20067,
                    'Irun' => 20045
                ]
            ],
            'Bizkaia' => [
                'id' => 48,
                'municipios' => [
                    'Bilbo' => 48020
                ]
            ]
        ];
    
        foreach ($provincias as $provincia => $datosProvincia) {
            foreach ($datosProvincia['municipios'] as $municipio => $codigoMunicipio) {
                $url = "https://www.el-tiempo.net/api/json/v2/provincias/{$datosProvincia['id']}/municipios/$codigoMunicipio";
    
                $response = Http::get($url);
    
                if ($response === false) {
                    throw new Exception("La solicitud no se pudo completar correctamente.");
                }
    
                $data = json_decode($response, true);
    
                $nombre = $data['municipio']['NOMBRE'];
                $fecha = date('Y-m-d H:i:s');
                $temperatura = empty($data['temperatura_actual']) ? 0 : $data['temperatura_actual'];
                $humedad = empty($data['humedad']) ? 0 : $data['humedad'];
    
                if ($codigoMunicipio == 20069) {
                    $nombre = "Donosti";
                }

                LugarHistorico::create([
                    'nombre' => $nombre,
                    'fecha' => $fecha,
                    'temperatura' => $temperatura,
                    'humedad' => $humedad
                ]);
            }
        }
    }
}

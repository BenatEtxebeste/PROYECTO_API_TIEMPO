<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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
    public function update(Request $request)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    
    /**
     * Recoge datos de la api de eltiempo.net y crea o actualiza los datos de la BBDD dependiendo de si existen o no.
     */
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
                $latitud = $data['municipio']['LATITUD_ETRS89_REGCAN95'];
                $longitud = $data['municipio']['LONGITUD_ETRS89_REGCAN95'];
                $temperatura = empty($data['temperatura_actual']) ? 0 : $data['temperatura_actual'];
                $humedad = empty($data['humedad']) ? 0 : $data['humedad'];
                $precipitacion = empty($data['precipitacion']) ? 0 : $data['precipitacion'];
                $viento = empty($data['viento']) ? 0 : $data['viento'];
    
                if ($codigoMunicipio == 20069) {
                    $nombre = "Donosti";
                }

                $lugar = Lugar::where('nombre', $nombre)->first();
    
                if($lugar){
                    $lugar -> temperatura = $temperatura;
                    $lugar -> humedad = $humedad;
                    $lugar -> precipitacion = $precipitacion;
                    $lugar -> viento = $viento;

                    $lugar -> save();
                } else {
                    Lugar::create([
                        'nombre' => $nombre,
                        'latitud' => $latitud,
                        'longitud' => $longitud,
                        'temperatura' => $temperatura,
                        'humedad' => $humedad,
                        'precipitacion' => $precipitacion,
                        'viento' => $viento
                    ]);
                }
            }
        }
    }

    public function datosInvent() {
        $lugares = Lugar::all();

        foreach ($lugares as $lugar) {
            $lugar -> temperatura = + $lugar -> temperatura + mt_rand(-1, 1);
            $lugar -> humedad = $lugar -> humedad + mt_rand(-1, 1);
            $lugar -> precipitacion = $lugar -> precipitacion + mt_rand(-1, 1);
            $lugar -> viento = $lugar -> viento + mt_rand(-1, 1);
            $lugar -> save();
        }
    }
}
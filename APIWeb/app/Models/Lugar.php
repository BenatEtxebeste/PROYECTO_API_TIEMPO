<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lugar extends Model
{
    use HasFactory;

    protected $table = 'lugares';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'latitud',
        'longitud',
        'temperatura',
        'humedad',
        'precipitacion',
        'viento',
        'nubes'
    ];
}

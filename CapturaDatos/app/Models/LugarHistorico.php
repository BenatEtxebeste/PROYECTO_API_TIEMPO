<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LugarHistorico extends Model
{
    use HasFactory;

    protected $table = 'lugares_historico';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'fecha',
        'temperatura',
        'humedad',
        'id_lugar'
    ];
}
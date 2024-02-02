<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\LugarController;
use App\Http\Controllers\LugarHistoricoController;

class ComandoAPI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:comando-a-p-i';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $lugar = new LugarController();
        $lugar -> datosAPI();
        $historico = new LugarHistoricoController();
        $historico -> datosAPI();
    }
}

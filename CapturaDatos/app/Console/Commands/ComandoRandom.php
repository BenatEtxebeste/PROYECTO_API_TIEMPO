<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\LugarController;

class ComandoRandom extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:comando-random';

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
        $controlador = new LugarController;
        $controlador -> datosInvent();
    }
}

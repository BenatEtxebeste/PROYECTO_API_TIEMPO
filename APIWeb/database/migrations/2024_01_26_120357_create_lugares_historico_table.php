<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lugares_historico', function (Blueprint $table) {
            $table->string('nombre');
            $table->date('fecha');
            $table->float('temperatura');
            $table->integer('humedad');
            $table->bigInteger('id_lugar')->unsigned();

            $table->primary(['nombre', 'fecha']);

            $table->foreign('id_lugar')->references('id')->on('lugares');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lugares_historico');
    }
};

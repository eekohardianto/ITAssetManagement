<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('item_id', 5);
            $table->string('brand_id', 5);
            $table->string('type', 180);
            $table->string('serial_number')->nullable();
            $table->date('purchase_date');
            $table->string('owner',5);
            $table->string('tag')->nullable();
            $table->string('status');
            $table->text('remarks')->nullable();
            $table->integer('created_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assets');
    }
};

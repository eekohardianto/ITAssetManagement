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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('username', 25)->unique()->nullable();
            $table->string('address')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        DB::getPdo()->exec("  

        CREATE TRIGGER TR_Users_Employees ON dbo.users
            AFTER INSERT
        AS
            SET IDENTITY_INSERT employees ON
            DECLARE @login_name VARCHAR(128)

            SELECT  @login_name = login_name
            FROM    sys.dm_exec_sessions
            WHERE   session_id = @@SPID
        
                BEGIN
                    INSERT  INTO dbo.employees
                            ( id ,
                            name ,
                            job_title
                            )
                            SELECT  I.id ,
                                    'no name' ,
                                    'no title job'
                            FROM    Inserted I
                END       
                SET IDENTITY_INSERT employees OFF
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};

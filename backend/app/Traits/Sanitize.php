<?php

namespace App\Traits;

use Carbon\Carbon;

trait Sanitize
{
    private function removerCaracteresEspeciais(string $data): string
    {
        return preg_replace('/[^A-Za-z0-9]/', '', $data);
    }

    private function transformaDate(string $date): string
    {
        
        return Carbon::createFromFormat('d/m/Y', $date)->format('Y-m-d');
    }

}

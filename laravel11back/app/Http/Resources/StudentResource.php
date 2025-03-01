<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'ime'=>$this->ime,
            'prezime'=>$this->prezime,
            'fakultet' => $this->fakultet,
            'godina_studija' => $this->godina_studija,
        ];
    }
}

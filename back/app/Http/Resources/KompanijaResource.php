<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KompanijaResource extends JsonResource
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
        'naziv' => $this->naziv,
        'opis' => $this->opis,
        'logo'=> asset($this->logo),
        'kategorija' => new KategorijaKompanijeResource($this->kategorija),
        'oglasi'=>OglasResource::collection($this->user->nasiOglasi),
        ];
    }
}

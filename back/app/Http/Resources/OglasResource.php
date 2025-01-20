<?php

namespace App\Http\Resources;

use App\Models\Kompanija;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OglasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $kompanija = Kompanija::findOrFail($this->user_id);
        return [
            'id' => $this->id,
            'naslov' => $this->naslov,
            'opis' => $this->opis,
            'potrebna_znanja' => $this->potrebna_znanja,
            'firma'=>$kompanija->naziv,
            'lokacija' => $this->lokacija,
            'banner' => asset($this->banner),
            'tip' => $this->tip,
            'kategorija' => new KategorijaOglasaResource($this->kategorija), 
            'prijave' => PrijavaResource::collection($this->prijave), 
        ];
    }
}

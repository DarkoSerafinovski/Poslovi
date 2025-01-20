<?php

namespace App\Http\Resources;

use App\Models\Student;
use App\Models\Kompanija;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrijavaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       
            $student = Student::findOrFail($this->user->id);
            $kompanija = Kompanija::findOrFail($this->oglas->user->id);
            return [
                'id' => $this->id,
                'ime' => $student->ime ,
                'prezime'=>$student->prezime,
                'email'=>$this->user->email,
                'datum_i_vreme' => $this->datum_i_vreme->toDateTimeString(),
                'fajl' => asset($this->fajl),
                'status' => $this->status,
                'firma'=>$kompanija->naziv,
                'pozicija'=>new KategorijaOglasaResource($this->oglas->kategorija),
            ];
        
        
       
    }
}

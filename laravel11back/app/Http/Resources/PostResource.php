<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
        'naslov'=>$this->naslov,
        'sadrzaj'=>$this->sadrzaj,
        'datum_i_vreme'=>$this->datum_i_vreme->format('d-m-Y'),
        'autor'=> $this->user->username

       ];
    }
}

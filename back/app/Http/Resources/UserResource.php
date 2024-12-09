<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'role' => $this->type,
            'details' => $this->getDetails(),
        ];
    }

    protected function getDetails()
    {
        switch ($this->type) {
            case 'student':
                return new StudentResource($this->student);
            case 'company':
                return new KompanijaResource($this->kompanija);
            default:
                return null; 
        }
    }
}

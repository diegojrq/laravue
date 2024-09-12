<?php

namespace App\Repositories;

use App\Models\User;
use App\Traits\Paginate;

class UserRepository extends BaseRepository
{
    /**
     * @inheritDoc
     */
    public function getFieldsSearchable()
    {
        return User::searchable();
    }

    /**
     * @inheritDoc
     */
    public function model()
    {
        return User::class;
    }

}

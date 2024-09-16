<?php

namespace App\Repositories;

use App\Models\User;
use App\Traits\Paginate;

class UserRepository extends BaseRepository
{
    use Paginate;

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

    public function searchPaginate(array $filters = null, $limit = null, array $sort = null)
    {
        $query = $this->model->newQuery();
        
        if ($filters) 
            $this->wherePaginate($query, $this->getSearchByfilters($filters, User::likeSearchAttributes()));

        if ($sort) {
            $this->orderPaginate($query, $sort);
        } else {
            $query->orderBy(User::deafultSortAttribute(), 'asc');
        }

        return $query->paginate(
            $limit,
            [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ]
        );
    }

}

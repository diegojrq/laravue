<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Paginate
{
    private function wherePaginate(Builder $query, array $search = [])
    {
        if (key_exists('where_raw', $search)) {
            foreach ($search['where_raw'] as $values) {
                $query->whereRaw(...$values);
            }
        }
        if (key_exists('where', $search)) {
            $query->where($search['where']);
        }
    }

    private function getSearchByFilters(array $filters, $likeSearch): array
    {
        $result = [];

        foreach ($filters as $attribute => $value) {
            if ($value === false || !empty($value)) {
                if (in_array($attribute, $likeSearch)) {
                    $result['where_raw'][] = ["unaccent({$attribute}) ilike unaccent(?)", ["%{$value}%"]];
                } else {
                    $result['where'][] = [$attribute, $value];
                }
            }
        }
        return $result;
    }

    private function orderPaginate(Builder $query, array $sort = [])
    {
        foreach ($sort as $value) {
            $query->orderBy($value["key"], $value["order"]);
        }        
    }
}

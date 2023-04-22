<?php

namespace Staudenmeir\LaravelAdjacencyList\Eloquent\Relations\Graph\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Expression;

trait IsRecursiveRelation
{
    /**
     * Whether to include the parent model.
     *
     * @var bool
     */
    protected bool $andSelf;

    /**
     * Create a new recursive pivot relationship instance.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param \Illuminate\Database\Eloquent\Model $parent
     * @param string $table
     * @param string $foreignPivotKey
     * @param string $relatedPivotKey
     * @param string $parentKey
     * @param string $relatedKey
     * @param bool $andSelf
     * @return void
     */
    public function __construct(
        Builder $query,
        Model $parent,
        string $table,
        string $foreignPivotKey,
        string $relatedPivotKey,
        string $parentKey,
        string $relatedKey,
        bool $andSelf
    ) {
        $this->andSelf = $andSelf;

        parent::__construct($query, $parent, $table, $foreignPivotKey, $relatedPivotKey, $parentKey, $relatedKey);
    }

    /**
     * Build model dictionary.
     *
     * @param \Illuminate\Database\Eloquent\Collection $results
     * @return array
     */
    protected function buildDictionary(Collection $results)
    {
        return $results->mapToDictionary(function (Model $result) {
            return [$result->getFirstPathSegment() => $result];
        })->all();
    }

    /**
     * Handle dynamic method calls to the relationship.
     *
     * @param string $method
     * @param array $parameters
     * @return mixed
     */
    public function __call($method, $parameters)
    {
        $methods = ['update', 'increment', 'decrement', 'delete', 'forceDelete'];

        if (in_array($method, $methods)) {
            $expression = $this->query->getQuery()->from;

            $table = $this->parent->getTable();

            $this->query->getQuery()->from = $table;

            $this->query->getModel()->setTable($table);

            $keys = $this->query->getQuery()->newQuery()->from($expression)->select($this->parentKey);

            return $this->query->whereIn($this->parentKey, $keys)->$method(...$parameters);
        }

        return parent::__call($method, $parameters);
    }

    /**
     * Replace table hash with expression name in self-relation aggregate queries.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param \Illuminate\Database\Query\Expression $expression
     * @return \Illuminate\Database\Query\Expression
     */
    protected function replaceTableHash(Builder $query, Expression $expression): Expression
    {
        return new Expression(
            str_replace(
                $query->getGrammar()->wrap(
                    $this->getRelationCountHash(false)
                ),
                $query->getGrammar()->wrap(
                    $query->getModel()->getExpressionName()
                ),
                $expression->getValue(),
            )
        );
    }

    /**
     * Get the select columns for the relation query.
     *
     * @param array $columns
     * @return array
     */
    protected function shouldSelect(array $columns = ['*'])
    {
        return $columns;
    }
}

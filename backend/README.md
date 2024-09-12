## Deploy

php artisan migrate --seed

### Passport

php artisan passport:keys
php artisan passport:client --password

> Colocar no .env o id e o secret q foram gerados na public.oauth_clients

    PASSPORT_PASSWORD_CLIENT_ID=9c1a21e3-307b-473e-a325-bd14example
    PASSPORT_PASSWORD_SECRET=VuFvz2GNiwJrRQMyF9FZLg9r4vb0zYXwexample

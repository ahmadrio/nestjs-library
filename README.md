# Basic Aplikasi Perpustakaan

Ini adalah basic aplikasi perpustakaan dengan engine NestJS. Diperuntukan untuk tugas Nest Akademi.

## Engine:

- NestJS >= 8.2.2
- Node >= 16.14.0
- Npm >= 8.3.1
- SQLite | MySQL | SQL Server | PgSQL
- Database Engine: Sequelize CLI [CLI: 6.2.0, ORM: 6.6.2]

## Install:

- Clone this repo: `git clone [link repo]`
- Copy `.env.example` to `.env` and change the config database
- Jika anda menggunakan database `sqlite` maka buat file baru di `database/[DB_NAME].sqlite`
- Command: `$ npm run build`
- Command: `$ npm run db:migrate`
- Command: `$ npm run db:seed`
- Done!

## Opsi:

| **Command** | **Description** |
|:--|:--|
| `make:migration CreateUsersTable` | Create new migration |
| `make:seeder UserSeeder` | Create new seeder |
| `db:migrate` | Run migration |
| `db:seed` | Run seeder |
| `db:seed:undo:all` | Delete all table rows |

## Referensi:

- https://github.com/onwuvic/nest-blog-api

create table products(
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price integer,
	publisher text,
	image text
);

create table stocks (
	product_id uuid,
	count integer,
	foreign key ("product_id") references "products" ("id")
)

INSERT INTO products (title, description, price, publisher, image) VALUES
('Grand Theft Auto V','Grand Theft Auto V', 10, 'Rockstar Games', 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'),
('The Witcher 3: Wild Hunt','The Witcher 3: Wild Hunt', 20, 'CD Project', 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg'),
('Counter-Strike: Global Offensive','Counter-Strike: Global Offensive', 30, 'Valve', 'https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg'),
('Left 4 Dead 2','Left 4 Dead 2', 40, 'Valve', 'https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg'),
('DOOM (2016)','DOOM (2016)', 50, 'Bethesda', 'https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg');

insert into stocks (product_id, count) values
('6cc0a13f-c44c-4b54-b472-81451a5a1f1f', 10),
('16b9f053-e63c-4d8b-b3f0-b93e9eef122a', 20),
('14f7c1f2-a14d-45e5-89e8-32a83f66d285', 30),
('26338a4a-f04e-4a91-91dc-897f9427009a', 40),
('09647a5e-8477-4f34-87ba-048e050cf847', 50);

create extension if not exists "uuid-ossp";
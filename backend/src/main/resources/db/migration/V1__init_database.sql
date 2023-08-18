create table airbnb."user"
(
    is_enable  boolean,
    is_expired boolean,
    is_locked  boolean,
    created_at timestamp(6),
    id         bigserial
        primary key,
    updated_at timestamp(6),
    email      varchar(255)
        unique,
    image      varchar(255),
    name       varchar(255),
    password   varchar(255),
    user_role  varchar(255)
        constraint user_user_role_check
            check ((user_role)::text = ANY ((ARRAY ['USER'::character varying, 'ADMIN'::character varying])::text[]))
);

alter table airbnb."user"
    owner to postgres;

create table airbnb.location
(
    id     bigserial
        primary key,
    flag   varchar(255),
    label  varchar(255),
    latlng varchar(255),
    region varchar(255),
    value  varchar(255)
);


alter table airbnb.location
    owner to postgres;

create table airbnb.listing
(
    bathroom_count integer          not null,
    guest_count    integer          not null,
    price          double precision not null,
    room_count     integer          not null,
    created_at     timestamp(6),
    id             bigserial
        primary key,
    location_id    bigint
        unique
        constraint fkarw3crk7p30s454wp2d6m7rbj
            references airbnb.location,
    user_id        bigint
        constraint fknxx604a5cjyhuue5uxchoti9s
            references airbnb."user",
    category       varchar(255),
    description    varchar(255),
    image          varchar(255),
    title          varchar(255)
);

alter table airbnb.listing
    owner to postgres;

create table airbnb.token
(
    expired    boolean not null,
    revoked    boolean not null,
    id         bigserial primary key,
    user_id    bigint
        constraint fke32ek7ixanakfqsdaokm4q9y2 references airbnb."user",
    token      varchar(255),
    token_type varchar(255)
        constraint token_token_type_check
            check ((token_type)::text = 'BEARER'::text)
);

alter table airbnb.token
    owner to postgres;

create table airbnb.reservation
(
    total_price double precision not null,
    created_at  timestamp(6),
    end_date    timestamp(6),
    id          bigserial
        primary key,
    listing_id  bigint
        constraint fk3whvfblykevm93aeu1mnmt6rx
            references airbnb.listing,
    start_date  timestamp(6),
    user_id     bigint
        constraint fkm4oimk0l1757o9pwavorj6ljg
            references airbnb."user"
);

alter table airbnb.reservation
    owner to postgres;

create table airbnb.user_liked_listing
(
    listing_id bigint not null
        constraint fki9xhfxu7qbww4w1ap6qj9lvej
            references airbnb.listing,
    user_id    bigint not null
        constraint fk6331soiliuilva7s4l1nl71ir
            references airbnb."user",
    primary key (listing_id, user_id)
);

alter table airbnb.user_liked_listing
    owner to postgres;
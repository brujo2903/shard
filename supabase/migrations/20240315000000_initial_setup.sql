-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create enum types
create type agent_status as enum ('active', 'inactive', 'deleted');
create type trading_style as enum ('conservative', 'moderate', 'aggressive');
create type communication_style as enum ('formal', 'casual', 'technical', 'mystical');
create type message_role as enum ('user', 'agent', 'system');

-- Create users table
create table public.users (
    id uuid primary key default uuid_generate_v4(),
    email text unique,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    last_seen_at timestamptz,
    metadata jsonb default '{}'::jsonb,
    settings jsonb default '{}'::jsonb
);

-- Create agents table
create table public.agents (
    id uuid primary key default uuid_generate_v4(),
    creator_id uuid references public.users(id) on delete cascade,
    name text not null,
    description text,
    image_url text,
    twitter_url text,
    telegram_url text,
    status agent_status default 'active',
    trading_style trading_style default 'moderate',
    communication_style communication_style default 'formal',
    risk_tolerance decimal default 0.5,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    personality jsonb default '{}'::jsonb,
    metadata jsonb default '{}'::jsonb
);

-- Create personality_traits table
create table public.personality_traits (
    id uuid primary key default uuid_generate_v4(),
    agent_id uuid references public.agents(id) on delete cascade,
    trait text not null,
    weight decimal not null check (weight >= 0 and weight <= 1),
    created_at timestamptz default now() not null
);

-- Create chat_sessions table
create table public.chat_sessions (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade,
    agent_id uuid references public.agents(id) on delete cascade,
    started_at timestamptz default now() not null,
    ended_at timestamptz,
    metadata jsonb default '{}'::jsonb
);

-- Create messages table
create table public.messages (
    id uuid primary key default uuid_generate_v4(),
    session_id uuid references public.chat_sessions(id) on delete cascade,
    role message_role not null,
    content text not null,
    created_at timestamptz default now() not null,
    metadata jsonb default '{}'::jsonb
);

-- Create token_analysis table
create table public.token_analysis (
    id uuid primary key default uuid_generate_v4(),
    token_address text not null,
    analysis_data jsonb not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    expires_at timestamptz not null
);

-- Create indexes
create index idx_agents_creator on public.agents(creator_id);
create index idx_agents_status on public.agents(status);
create index idx_personality_traits_agent on public.personality_traits(agent_id);
create index idx_chat_sessions_user on public.chat_sessions(user_id);
create index idx_chat_sessions_agent on public.chat_sessions(agent_id);
create index idx_messages_session on public.messages(session_id);
create index idx_token_analysis_address on public.token_analysis(token_address);
create index idx_token_analysis_expiry on public.token_analysis(expires_at);

-- Add row level security (RLS)
alter table public.users enable row level security;
alter table public.agents enable row level security;
alter table public.personality_traits enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.messages enable row level security;
alter table public.token_analysis enable row level security;
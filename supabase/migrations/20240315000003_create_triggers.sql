-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Add updated_at triggers
create trigger set_updated_at
    before update on public.users
    for each row
    execute function public.handle_updated_at();

create trigger set_updated_at
    before update on public.agents
    for each row
    execute function public.handle_updated_at();

-- Create cleanup function for expired token analysis
create or replace function public.cleanup_expired_token_analysis()
returns trigger as $$
begin
    delete from public.token_analysis
    where expires_at < now();
    return null;
end;
$$ language plpgsql;

-- Add cleanup trigger
create trigger cleanup_expired_analysis
    after insert or update on public.token_analysis
    execute function public.cleanup_expired_token_analysis();
-- Create or update agent function
create or replace function public.upsert_agent(
    p_creator_id uuid,
    p_name text,
    p_description text,
    p_image_url text,
    p_twitter_url text,
    p_telegram_url text,
    p_trading_style trading_style default 'moderate',
    p_communication_style communication_style default 'formal',
    p_risk_tolerance decimal default 0.5,
    p_personality jsonb default '{}'::jsonb
) returns uuid as $$
declare
    v_agent_id uuid;
begin
    insert into public.agents (
        creator_id,
        name,
        description,
        image_url,
        twitter_url,
        telegram_url,
        trading_style,
        communication_style,
        risk_tolerance,
        personality
    ) values (
        p_creator_id,
        p_name,
        p_description,
        p_image_url,
        p_twitter_url,
        p_telegram_url,
        p_trading_style,
        p_communication_style,
        p_risk_tolerance,
        p_personality
    )
    returning id into v_agent_id;
    
    return v_agent_id;
end;
$$ language plpgsql security definer;

-- Create chat session function
create or replace function public.create_chat_session(
    p_user_id uuid,
    p_agent_id uuid
) returns uuid as $$
declare
    v_session_id uuid;
begin
    insert into public.chat_sessions (user_id, agent_id)
    values (p_user_id, p_agent_id)
    returning id into v_session_id;
    
    return v_session_id;
end;
$$ language plpgsql security definer;

-- Add message to chat function
create or replace function public.add_chat_message(
    p_session_id uuid,
    p_role message_role,
    p_content text,
    p_metadata jsonb default '{}'::jsonb
) returns uuid as $$
declare
    v_message_id uuid;
begin
    insert into public.messages (session_id, role, content, metadata)
    values (p_session_id, p_role, p_content, p_metadata)
    returning id into v_message_id;
    
    return v_message_id;
end;
$$ language plpgsql security definer;

-- Cache token analysis function
create or replace function public.cache_token_analysis(
    p_token_address text,
    p_analysis_data jsonb,
    p_expires_in interval default interval '15 minutes'
) returns void as $$
begin
    insert into public.token_analysis (
        token_address,
        analysis_data,
        expires_at
    ) values (
        p_token_address,
        p_analysis_data,
        now() + p_expires_in
    )
    on conflict (token_address) do update
    set
        analysis_data = excluded.analysis_data,
        updated_at = now(),
        expires_at = now() + p_expires_in;
end;
$$ language plpgsql security definer;
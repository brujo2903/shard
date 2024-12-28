-- Users policies
create policy "Users can view their own data"
    on public.users for select
    using (auth.uid() = id);

create policy "Users can update their own data"
    on public.users for update
    using (auth.uid() = id);

-- Agents policies
create policy "Anyone can view active agents"
    on public.agents for select
    using (status = 'active');

create policy "Creators can manage their agents"
    on public.agents for all
    using (auth.uid() = creator_id);

-- Personality traits policies
create policy "Anyone can view personality traits"
    on public.personality_traits for select
    using (true);

create policy "Only agent creators can modify traits"
    on public.personality_traits for all
    using (
        exists (
            select 1 from public.agents
            where agents.id = personality_traits.agent_id
            and agents.creator_id = auth.uid()
        )
    );

-- Chat sessions policies
create policy "Users can view their chat sessions"
    on public.chat_sessions for select
    using (auth.uid() = user_id);

create policy "Users can create chat sessions"
    on public.chat_sessions for insert
    with check (auth.uid() = user_id);

-- Messages policies
create policy "Users can view messages from their sessions"
    on public.messages for select
    using (
        exists (
            select 1 from public.chat_sessions
            where chat_sessions.id = messages.session_id
            and chat_sessions.user_id = auth.uid()
        )
    );

create policy "Users can add messages to their sessions"
    on public.messages for insert
    with check (
        exists (
            select 1 from public.chat_sessions
            where chat_sessions.id = messages.session_id
            and chat_sessions.user_id = auth.uid()
        )
    );

-- Token analysis policies
create policy "Anyone can view token analysis"
    on public.token_analysis for select
    using (true);
# AutoGenesis: IDE Transformation Plan

This document outlines the systematic transformation of AutoGenesis from an animated marketing mockup into a **real, functional AI coding platform** (similar to Cursor, Lovable, and VSCode).

## Phase 1: Authentication & Routing Security
**Goal:** Restrict access to the IDE and implement a premium auth flow.
- [ ] Install `@supabase/supabase-js` and `@supabase/ssr`.
- [ ] Set up Supabase client utility files.
- [ ] Redesign `/login` and `/signup` to feature a premium, modal-like dark glassmorphism card.
- [ ] Implement Google, GitHub, Phone OTP, and Email auth options inside the login card.
- [ ] Add Next.js middleware to protect the `/dashboard` and `/workspace` routes.
- [ ] Update all homepage CTA buttons ("Start Building", "Login") to redirect to `/login`.

## Phase 2: Project Dashboard (/dashboard)
**Goal:** Create the post-login landing experience for project management.
- [ ] Build the Dashboard layout (top nav, sidebar, main content area).
- [ ] Implement "New Project" modal (Name, Prompt, Framework selection, AI Mode).
- [ ] Implement "Recent Projects" grid pulling from Supabase database.
- [ ] Create the "Import Project" flow UI.

## Phase 3: Real IDE Workspace (/workspace/[projectId])
**Goal:** Completely replace the fake UI with a functional, multi-pane editor.
- [ ] Install `@monaco-editor/react` and `zustand` (for global IDE state).
- [ ] **Layout Architecture:** Implement resizable panes (Sidebar, Editor, Terminal, Live Preview, AI Assistant).
- [ ] **Left Activity Bar:** Add icons for Explorer, Search, Git, and Settings.
- [ ] **File Explorer:** Build a recursive file tree component that reads/writes project files.
- [ ] **Code Editor:** Integrate Monaco Editor with tabs for multiple open files.
- [ ] **Terminal Panel:** Build a bottom dock for build/dev logs.

## Phase 4: AI Assistant & Orchestration
**Goal:** Connect the AI brain to the real file system.
- [ ] Build the Right Panel AI Chat interface.
- [ ] Upgrade WebSocket backend to handle file creation/modification events.
- [ ] Wire the prompt engine so AI generations directly inject code into Monaco Editor and update the file tree.

## Phase 5: Live Preview Sandboxing
**Goal:** Render the user's generated code live.
- [ ] Set up an iframe container that communicates with a local/remote bundler or dev server.
- [ ] Sync file changes from the IDE state to the live preview hot-reload mechanism.

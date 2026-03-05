# MoonlightAI Legal Team - Implementation Plan

## Overview
Build an AI-powered legal team capability for MoonlightAI Solutions using custom Claude Code skills + OpenClaw agent, covering full-service boutique practice areas.

---

## Phase 1: Foundation & Architecture

### 1.1 Legal Team Structure
- [x] Create `legal-team` plugin directory in MoonlightAI workspace
- [x] Define `plugin.json` with legal team metadata
- [x] Set up skills directory structure
- [ ] Configure agent with legal capabilities

### 1.2 Core Skills to Build
1. **contract-review-skill** - Multi-perspective contract analysis
2. **legal-research-skill** - Case law & statutory research with verification
3. **document-drafting-skill** - Contract/agreement drafting
4. **redline-skill** - Word document tracked changes at XML level
5. **client-communication-skill** - Emails, memos in firm's voice
6. **due-diligence-skill** - Transaction due diligence checklist & analysis
7. **regulatory-analysis-skill** - Compliance & regulatory research

---

## Phase 2: Skill Development

### 2.1 Contract Review Skill
- [x] Create skill for analyzing contracts from multiple perspectives
- [x] Implement severity-rating system (high/medium/low)
- [x] Add cross-reference checking between provisions
- [x] Include missing provision detection
- [x] Generate counter-language recommendations

### 2.2 Legal Research Skill
- [x] Build parallel research framework
- [x] Implement primary authority prioritization (statutes → regulations → case law)
- [x] Add self-review/verification layer
- [x] Include citation hallucination prevention
- [x] Create structured memo format

### 2.3 Document Drafting Skill
- [x] Create templates for common agreements (NDA, MSA, SOW, Employment)
- [x] Build clause library with alternatives
- [x] Implement Bluebook citation formatting
- [x] Add clause customization parameters

### 2.4 Redline Skill
- [x] Implement Word .docx XML manipulation
- [x] Preserve formatting during edits
- [x] Apply tracked changes with attribution
- [x] Support comparison between two versions

### 2.5 Client Communication Skill
- [x] Define firm's voice/tone (professional, clear, actionable)
- [x] Create templates for common communications
- [x] Include escalation/urgency detection
- [x] Generate cover emails for document packages

---

## Phase 3: Agent Configuration

### 3.1 Legal Team Agent
- [ ] Create OpenClaw agent with legal skills
- [ ] Configure skill access permissions
- [ ] Set up conversation workflow
- [ ] Add privilege/confidentiality handling

### 3.2 Agent Tools
- [ ] Document upload capability
- [ ] Web research integration
- [ ] Word document manipulation
- [ ] Calendar/deadline tracking

---

## Phase 4: Quality & Compliance

### 4.1 Verification Layers
- [ ] Citation verification before delivery
- [ ] Cross-reference consistency checks
- [ ] Internal contradiction detection
- [ ] Confidence flagging for uncertain issues

### 4.2 Ethics & Privilege
- [ ] Document AI assistance disclosure handling
- [ ] Set up client consent workflow
- [ ] Create privilege log for AI-assisted work
- [ ] Define supervision/attorney review requirements

---

## Phase 5: Testing & Refinement

### 5.1 Test Cases
- [ ] Test contract review on sample agreements
- [ ] Verify research citations against actual authorities
- [ ] Test redline production with complex formatting
- [ ] Validate client communications tone

### 5.2 Iteration
- [ ] Gather feedback on output quality
- [ ] Refine prompts based on results
- [ ] Add practice-specific nuances
- [ ] Build specialized sub-skills as needed

---

## Deliverables

1. **Legal Team Plugin** - `moonlightai/legal-team/`
2. **7 Core Skills** - Claude Code skills with detailed instructions
3. **Legal Agent** - OpenClaw agent configuration
4. **Documentation** - Usage guides for each skill
5. **Test Suite** - Sample documents for validation

---

## Key Questions to Resolve

1. **Jurisdiction focus** - US state-specific or multi-jurisdiction?
2. **Initial practice areas** - Which of full-service to prioritize first?
3. **Existing templates** - Does MoonlightAI have existing templates to incorporate?
4. **Integration needs** - Connect with existing tools (Clio, etc.)?

---

## Decisions (2026-03-05)

- [x] **Jurisdiction**: Jurisdiction-agnostic (design skills to work across jurisdictions)
- [x] **Build scope**: All 7 skills in initial build
- [x] **Templates**: Hybrid approach - best practices + existing documents
- [x] **Skill created**: moonlightai-legal skill installed at ~/.claude/skills/moonlightai-legal/SKILL.md

## Status (2026-03-05)
- Phase 1: COMPLETE (plugin + skills)
- Phase 2: COMPLETE (all 7 skills built)
- Installable skill: READY at ~/.claude/skills/moonlightai-legal/

---

## Implementation Notes

- Skills should avoid jurisdiction-specific legal advice
- Include jurisdiction identification prompts where relevant
- Build modular clause libraries that can be adapted
- Design verification layers that flag jurisdiction-specific issues
